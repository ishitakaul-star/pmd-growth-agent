import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  submitGoalsReport,
  pollReport,
  fetchGoalsFromReport,
  extractMyGoals,
  extractTeamGoals,
  type BwGoal,
} from "@/lib/betterworks";
import prisma from "@/lib/prisma";

// POST — manual trigger from the UI
export async function POST() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return syncBetterworks();
}

// GET — Vercel Cron (Monday + Friday at 9 AM UTC)
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return syncBetterworks();
}

async function syncBetterworks() {
  const apiKey = process.env.BETTERWORKS_API_KEY;
  const myEmail = process.env.BETTERWORKS_EMAIL || "ishita_kaul@intuit.com";
  const myEmployeeId = process.env.BETTERWORKS_EMPLOYEE_ID || "505786";

  if (!apiKey) {
    return NextResponse.json(
      { error: "BETTERWORKS_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    // Use the current Intuit fiscal year: Aug 1 → Jul 31
    // (Intuit FY starts August 1, so if current month < Aug we're in the prior FY start year)
    const now = new Date();
    const fyStartYear = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
    const fyStart = `${fyStartYear}-08-01`;
    const fyEnd = `${fyStartYear + 1}-07-31`;

    const fmt = (d: Date) => d.toISOString().split("T")[0];

    // 1. Fetch all goals via Betterworks async report pipeline
    //    Poll up to 24 × 3s = 72 seconds to accommodate large orgs
    const reportId = await submitGoalsReport(apiKey, fyStart, fyEnd);
    const xlsxUrl = await pollReport(apiKey, reportId, 24, 3000);
    const allGoals = await fetchGoalsFromReport(xlsxUrl);

    // ── My Goals ─────────────────────────────────────────────────────────────

    // 2. Filter to Ishita's own goals — try employee ID first, fall back to email
    let myGoals = extractMyGoals(allGoals, myEmployeeId);
    if (myGoals.length === 0) {
      // employee ID may differ from what's in the XLSX; match by email instead
      myGoals = allGoals.filter((g) => g.ownerEmail === myEmail.toLowerCase());
    }

    // 3. Find Ishita's UserProfile in DB
    const user = await prisma.user.findFirst({
      where: { email: myEmail },
      include: { profile: true },
    });

    let myGoalsSynced = 0;
    if (user?.profile) {
      const profileId = user.profile.id;

      for (const g of myGoals) {
        const status = mapBwStatus(g);
        const dueDate = parseBwDate(g.endDate);

        const existing = await prisma.goal.findFirst({
          where: { profileId, bwId: g.goalId },
        });

        if (existing) {
          await prisma.goal.update({
            where: { id: existing.id },
            data: {
              title: g.goalName,
              status,
              progress: Math.round(g.percentComplete),
              bwDetail: g.detail || null,
              ...(dueDate && { dueDate }),
            },
          });
        } else {
          await prisma.goal.create({
            data: {
              profileId,
              title: g.goalName,
              status,
              progress: Math.round(g.percentComplete),
              bwId: g.goalId,
              bwDetail: g.detail || null,
              ...(dueDate && { dueDate }),
            },
          });
        }
        myGoalsSynced++;
      }
    }

    // ── Team Goals ────────────────────────────────────────────────────────────

    // 4. Extract goals where Ishita is the direct manager
    const teamGoalMap = extractTeamGoals(allGoals, myEmail);

    // 5. Load all TeamMember records; also get Ishita's profile to create new members
    const allTeamMembers = await prisma.teamMember.findMany({
      select: { id: true, name: true, note: true },
    });

    // Re-use the user/profile fetched above (may already be loaded)
    const managerProfile = user?.profile ?? null;

    let teamMembersUpdated = 0;
    let teamGoalsSynced = 0;
    const today = fmt(now);

    for (const [ownerEmail, goals] of Array.from(teamGoalMap.entries())) {
      const ownerName = goals[0]?.ownerName || "";

      // Try to find existing TeamMember by name
      let member = findMemberByName(allTeamMembers, ownerName);

      // If not found AND we have a manager profile, auto-create the TeamMember
      if (!member && managerProfile) {
        const created = await prisma.teamMember.create({
          data: {
            managerId: managerProfile.id,
            name: ownerName,
            role: "IC",
            area: "Engineering",
          },
        });
        // Add to in-memory list so subsequent iterations can match
        const newMember = { id: created.id, name: created.name, note: null };
        allTeamMembers.push(newMember);
        member = newMember;
      }

      if (!member) continue;

      // Build goal summary for the note field
      const goalLines = goals
        .map((g: BwGoal) => {
          const pct = Math.round(g.percentComplete);
          const status = mapBwStatus(g);
          const assessment = g.assessmentScore
            ? ` Assessment: ${g.assessmentScore}.`
            : "";
          return `• "${g.goalName}" — ${pct}% (${status})${assessment}`;
        })
        .join("\n");

      const noteEntry = `[${today} Betterworks] Goals for ${ownerName}:\n${goalLines}`;

      // Merge into existing note (keep up to 5 entries, replace stale BW block)
      const existingNote = member.note || "";
      const notes = existingNote.split("\n---\n").filter((n) => n.trim());
      const bwIdx = notes.findIndex((n) => n.includes("Betterworks]"));
      if (bwIdx >= 0) {
        notes[bwIdx] = noteEntry;
      } else {
        notes.unshift(noteEntry);
      }

      await prisma.teamMember.update({
        where: { id: member.id },
        data: { note: notes.slice(0, 5).join("\n---\n") },
      });

      // Keep in-memory note in sync for any future references
      member.note = notes.slice(0, 5).join("\n---\n");

      teamMembersUpdated++;
      teamGoalsSynced += goals.length;
    }

    return NextResponse.json({
      success: true,
      fyPeriod: `${fyStart} → ${fyEnd}`,
      myGoals: myGoalsSynced,
      teamMembersUpdated,
      teamGoals: teamGoalsSynced,
      totalGoalsInReport: allGoals.length,
    });
  } catch (error: any) {
    console.error("Betterworks sync error:", error);
    return NextResponse.json(
      { error: error.message || "Betterworks sync failed" },
      { status: 500 }
    );
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Map Betterworks goal data to our internal status string */
function mapBwStatus(g: BwGoal): string {
  if (g.percentComplete >= 100) return "completed";
  const score = (g.assessmentScore || "").toLowerCase().replace(/[\s_-]/g, "");
  if (score.includes("offtrack") || score.includes("behind")) return "off_track";
  if (score.includes("atrisk") || score.includes("risk")) return "at_risk";
  return "on_track";
}

/** Parse Betterworks date string to Date | null */
function parseBwDate(dateStr: string): Date | null {
  if (!dateStr || dateStr === "null" || dateStr === "") return null;
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

/** Fuzzy-match a Betterworks owner name to a TeamMember record */
function findMemberByName(
  members: { id: string; name: string; note: string | null }[],
  ownerName: string
): { id: string; name: string; note: string | null } | undefined {
  const lower = ownerName.toLowerCase().trim();
  if (!lower) return undefined;

  // 1. Exact (case-insensitive)
  const exact = members.find((m) => m.name.toLowerCase() === lower);
  if (exact) return exact;

  // 2. Unique first-name match
  const firstName = lower.split(/\s+/)[0];
  const firstMatches = members.filter((m) =>
    m.name.toLowerCase().startsWith(firstName)
  );
  if (firstMatches.length === 1) return firstMatches[0];

  // 3. Substring match either direction
  return members.find(
    (m) =>
      lower.includes(m.name.toLowerCase().split(/\s+/)[0]) ||
      m.name.toLowerCase().includes(firstName)
  );
}

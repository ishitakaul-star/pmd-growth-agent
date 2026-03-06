import prisma from "./prisma";
import type { ParsedUpdate } from "./slackParser";
import type { ProjectData } from "@/data/seedData";

/**
 * Apply parsed Slack updates to TeamMember records in the database.
 * Returns the number of team members updated.
 */
export async function applyUpdatesToTeam(
  updates: ParsedUpdate[]
): Promise<{ updated: number; details: string[] }> {
  // Get all team members from DB
  const allMembers = await prisma.teamMember.findMany({
    select: { id: true, name: true, projects: true, risks: true, note: true },
  });

  const memberMap = new Map(allMembers.map((m) => [m.name.toLowerCase(), m]));
  let updated = 0;
  const details: string[] = [];

  for (const update of updates) {
    if (!update.mentionedName) continue;

    const member = memberMap.get(update.mentionedName.toLowerCase());
    if (!member) continue;

    const changes: { projects?: string; risks?: string; note?: string } = {};

    // Merge project updates
    if (update.projects.length > 0) {
      const existing: ProjectData[] = safeParseJson(member.projects, []);
      const merged = mergeProjects(existing, update.projects);
      changes.projects = JSON.stringify(merged);
    }

    // Append new risks (deduplicate)
    if (update.risks.length > 0) {
      const existing: string[] = safeParseJson(member.risks, []);
      const merged = deduplicateRisks(existing, update.risks);
      changes.risks = JSON.stringify(merged);
    }

    // Update note with latest Slack context (timestamped)
    const date = tsToDate(update.ts);
    const noteEntry = `[${date}] ${update.postedBy}: ${update.rawText.slice(0, 500)}`;
    const existingNote = member.note || "";
    // Keep last 5 notes max
    const notes = existingNote
      .split("\n---\n")
      .filter((n) => n.trim());
    notes.unshift(noteEntry);
    changes.note = notes.slice(0, 5).join("\n---\n");

    if (Object.keys(changes).length > 0) {
      await prisma.teamMember.update({
        where: { id: member.id },
        data: changes,
      });
      updated++;
      details.push(
        `${member.name}: ${update.projects.length} project(s), ${update.risks.length} risk(s)`
      );
    }
  }

  return { updated, details };
}

/** Merge new project updates into existing projects.
 *  If a project name matches (fuzzy), update its status. Otherwise append. */
function mergeProjects(
  existing: ProjectData[],
  incoming: ProjectData[]
): ProjectData[] {
  const result = [...existing];
  for (const proj of incoming) {
    const matchIdx = result.findIndex(
      (e) =>
        e.n.toLowerCase() === proj.n.toLowerCase() ||
        e.n.toLowerCase().includes(proj.n.toLowerCase().slice(0, 20)) ||
        proj.n.toLowerCase().includes(e.n.toLowerCase().slice(0, 20))
    );
    if (matchIdx >= 0) {
      // Update existing project status and description
      result[matchIdx] = { ...result[matchIdx], s: proj.s, d: proj.d };
    } else {
      result.push(proj);
    }
  }
  return result;
}

/** Append new risks, deduplicating by fuzzy match */
function deduplicateRisks(existing: string[], incoming: string[]): string[] {
  const result = [...existing];
  for (const risk of incoming) {
    const riskLower = risk.toLowerCase().slice(0, 40);
    const isDuplicate = result.some((e) =>
      e.toLowerCase().includes(riskLower) || riskLower.includes(e.toLowerCase().slice(0, 40))
    );
    if (!isDuplicate) {
      result.push(risk);
    }
  }
  return result;
}

/** Convert Slack timestamp to readable date */
function tsToDate(ts: string): string {
  try {
    const epoch = parseFloat(ts) * 1000;
    return new Date(epoch).toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

function safeParseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

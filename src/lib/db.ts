/**
 * Database access layer — reads from SQLite and deserializes JSON-serialized fields.
 * When switching to PostgreSQL, most of this serialization logic goes away since
 * PostgreSQL natively supports String[] and Json.
 */
import prisma from "./prisma";
import type { UserProfileData, TeamMemberData, RiskItem } from "@/data/seedData";

// Helper to safely parse JSON strings from SQLite
function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

/**
 * Get the full user profile (with goals, wins, feedback, team) from the database.
 * Falls back to seed data if DATABASE_URL is not set.
 */
export async function getUserProfileFromDB(userId: string): Promise<{
  profile: any;
  goals: any[];
  wins: any[];
  feedback: any[];
  me: UserProfileData;
} | null> {
  if (!process.env.DATABASE_URL) return null;

  try {
    const dbProfile = await prisma.userProfile.findFirst({
      where: { userId },
      include: {
        user: true,
        goals: { orderBy: { createdAt: "desc" } },
        wins: { orderBy: { createdAt: "desc" } },
        feedback: { orderBy: { date: "desc" } },
      },
    });

    if (!dbProfile) return null;

    // Convert DB profile to the UserProfileData format used by respond()
    const me: UserProfileData = {
      name: (dbProfile as any).user?.name || "User",
      role: dbProfile.jobTitle || "",
      org: dbProfile.org || "",
      target: dbProfile.targetLevel || "",
      goals: dbProfile.goals.map((g) => {
        // Enrich Betterworks-sourced goals with progress info
        if (g.bwId && g.progress > 0) {
          return `${g.title} (${g.progress}% complete)`;
        }
        return g.title;
      }),
      wins: dbProfile.wins.map((w) => w.description),
      strengths: parseJson<string[]>(dbProfile.strengths, []),
      areasToGrow: parseJson<string[]>(dbProfile.areasToGrow, []),
      craftPillars: parseJson<string[]>(dbProfile.craftPillars, [
        "Product Strategy",
        "Product Execution",
        "Technology Fluency",
        "Org Effectiveness",
      ]),
    };

    return {
      profile: dbProfile,
      goals: dbProfile.goals,
      wins: dbProfile.wins,
      feedback: dbProfile.feedback,
      me,
    };
  } catch (e) {
    console.error("DB read error:", e);
    return null;
  }
}

/**
 * Get team members for a manager from the database.
 * Returns deserialized TeamMemberData[] and computed RiskItem[].
 */
export async function getTeamFromDB(userId: string): Promise<{
  team: TeamMemberData[];
  risks: RiskItem[];
} | null> {
  if (!process.env.DATABASE_URL) return null;

  try {
    const profile = await prisma.userProfile.findFirst({
      where: { userId, role: "manager" },
    });

    if (!profile) return null;

    const dbMembers = await prisma.teamMember.findMany({
      where: { managerId: profile.id },
    });

    const team: TeamMemberData[] = dbMembers.map((m) => ({
      name: m.name,
      role: m.role,
      area: m.area,
      targetLevel: m.targetLevel || undefined,
      reportsTo: m.reportsTo || undefined,
      recentlyPromoted: m.recentlyPromoted,
      projects: parseJson(m.projects, []),
      risks: parseJson(m.risks, []),
      note: m.note || undefined,
      dev: parseJson(m.devRecommendations, undefined),
    }));

    // Compute risks from team data (same logic as seedData RISKS)
    const risks = computeRisksFromTeam(team);

    return { team, risks };
  } catch (e) {
    console.error("DB team read error:", e);
    return null;
  }
}

/**
 * Compute risks from team member data at runtime.
 */
function computeRisksFromTeam(team: TeamMemberData[]): RiskItem[] {
  const risks: RiskItem[] = [];
  for (const member of team) {
    for (const project of member.projects || []) {
      if (project.s === "at-risk" || project.s === "off-track") {
        const sev =
          project.s === "off-track"
            ? "high"
            : member.risks.length > 2
            ? "high"
            : "med";
        risks.push({
          sev: sev as "high" | "med" | "low",
          area: project.n,
          who: member.name,
          d: project.d,
        });
      }
    }
  }
  // Sort: high first, then med, then low
  const sevOrder = { high: 0, med: 1, low: 2 };
  risks.sort((a, b) => sevOrder[a.sev] - sevOrder[b.sev]);
  return risks;
}

/**
 * Get user's role from the database.
 */
export async function getUserRoleFromDB(
  userId: string
): Promise<string | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const profile = await prisma.userProfile.findFirst({
      where: { userId },
      select: { role: true, id: true },
    });
    return profile?.role || null;
  } catch {
    return null;
  }
}

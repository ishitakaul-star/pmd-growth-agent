import { PrismaClient } from "@prisma/client";
import { DEFAULT_ME, DEFAULT_TEAM, RISKS } from "../src/data/seedData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create Ishita's user (will be linked to Google auth on first sign-in)
  const ishita = await prisma.user.upsert({
    where: { email: "ishita_kaul@intuit.com" },
    update: {},
    create: {
      email: "ishita_kaul@intuit.com",
      name: DEFAULT_ME.name,
      image: null,
    },
  });

  // Create her profile (JSON.stringify arrays for SQLite — remove for PostgreSQL)
  const profile = await prisma.userProfile.upsert({
    where: { userId: ishita.id },
    update: {
      role: "manager",
      jobTitle: DEFAULT_ME.role,
      org: DEFAULT_ME.org,
      targetLevel: DEFAULT_ME.target,
      strengths: JSON.stringify(DEFAULT_ME.strengths),
      areasToGrow: JSON.stringify(DEFAULT_ME.areasToGrow),
      craftPillars: JSON.stringify(DEFAULT_ME.craftPillars),
    },
    create: {
      userId: ishita.id,
      role: "manager",
      jobTitle: DEFAULT_ME.role,
      org: DEFAULT_ME.org,
      targetLevel: DEFAULT_ME.target,
      strengths: JSON.stringify(DEFAULT_ME.strengths),
      areasToGrow: JSON.stringify(DEFAULT_ME.areasToGrow),
      craftPillars: JSON.stringify(DEFAULT_ME.craftPillars),
    },
  });

  // Create goals (linked to profile, not user)
  for (const goalText of DEFAULT_ME.goals) {
    await prisma.goal.create({
      data: {
        profileId: profile.id,
        title: goalText,
        status: "on_track",
        progress: 60,
      },
    });
  }

  // Create wins (linked to profile, not user)
  for (const winText of DEFAULT_ME.wins) {
    await prisma.win.create({
      data: {
        profileId: profile.id,
        description: winText,
      },
    });
  }

  // Create team members (linked to profile as manager)
  for (const member of DEFAULT_TEAM) {
    await prisma.teamMember.create({
      data: {
        managerId: profile.id,
        name: member.name,
        role: member.role,
        area: member.area,
        projects: JSON.stringify(member.projects),
        risks: JSON.stringify(member.risks),
        targetLevel: member.targetLevel || null,
        reportsTo: member.reportsTo || null,
        recentlyPromoted: member.recentlyPromoted || false,
        note: member.note || null,
        devRecommendations: member.dev ? JSON.stringify(member.dev) : null,
      },
    });
  }

  // Create feedback entries
  const feedbackEntries = [
    { fromName: "VP of Technology (Skip-level)", type: "leadership", craftPillar: "Product Strategy", summary: "Ishita's Enterprise Vision V2.0 demonstrates exceptional portfolio-level thinking. Strong FY26-28 roadmap.", sentiment: "positive" },
    { fromName: "Tammy Mao-McDonald (Direct)", type: "peer", craftPillar: "Org Effectiveness", summary: "Great support on TA platform decisions. Ishita helps navigate cross-org dependencies effectively.", sentiment: "positive" },
    { fromName: "Engineering Lead (XFN)", type: "peer", craftPillar: "Technology Fluency", summary: "Strong technical product decisions on the Promo Tool GenAI integration. Navigated RAI approvals smoothly.", sentiment: "positive" },
    { fromName: "Peer GPM (XFN)", type: "peer", craftPillar: "Org Effectiveness", summary: "Would benefit from more visibility into cross-BU roadmap decisions. Some alignment gaps on shared platform priorities.", sentiment: "constructive" },
  ];
  for (const fb of feedbackEntries) {
    await prisma.feedback.create({
      data: { profileId: profile.id, ...fb },
    });
  }

  // Create a second user for employee dev login
  const employee = await prisma.user.upsert({
    where: { email: "dev_employee@intuit.com" },
    update: {},
    create: {
      id: "dev-user-employee",
      email: "dev_employee@intuit.com",
      name: "Dev Employee",
      image: null,
    },
  });
  await prisma.userProfile.upsert({
    where: { userId: employee.id },
    update: { role: "employee" },
    create: {
      userId: employee.id,
      role: "employee",
      jobTitle: "Product Manager",
      org: "People & Places Technology (T4i)",
      targetLevel: "Staff PM",
      strengths: JSON.stringify(["Cross-functional execution", "Technical product decisions"]),
      areasToGrow: JSON.stringify(["Strategic vision authorship", "Cross-BU influence"]),
      craftPillars: JSON.stringify(["Product Strategy", "Product Execution", "Technology Fluency", "Org Effectiveness"]),
    },
  });

  console.log(
    `✅ Seeded: 2 users, ${DEFAULT_ME.goals.length} goals, ${DEFAULT_ME.wins.length} wins, ${DEFAULT_TEAM.length} team members, ${feedbackEntries.length} feedback entries`
  );
  console.log(
    `   Roles: Ishita (manager), Dev Employee (employee) — RBAC enforced.`
  );
  console.log(
    `   Risks are computed from team data at runtime (${RISKS.length} total).`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

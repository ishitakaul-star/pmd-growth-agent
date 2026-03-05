import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { respond } from "@/lib/respond";
import { getUserProfileFromDB, getTeamFromDB } from "@/lib/db";
import { DEFAULT_ME, DEFAULT_TEAM, RISKS } from "@/data/seedData";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message, mode, contextDocs } = await req.json();
  if (!message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const userId = (session.user as any)?.id;
  const role = (session.user as any)?.role || "employee";

  // Load data from database if available, otherwise fall back to seed data
  const dbProfile = userId ? await getUserProfileFromDB(userId) : null;
  const dbTeam = role === "manager" && userId ? await getTeamFromDB(userId) : null;

  const me = dbProfile?.me || DEFAULT_ME;
  const team = dbTeam?.team || DEFAULT_TEAM;
  const risks = dbTeam?.risks || RISKS;

  const response = respond(
    message,
    mode || role,
    me,
    team,
    risks,
    contextDocs || ""
  );

  return NextResponse.json({ response, source: dbProfile ? "database" : "seed" });
}

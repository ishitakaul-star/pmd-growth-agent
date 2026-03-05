import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getTeamFromDB } from "@/lib/db";
import { DEFAULT_TEAM, RISKS } from "@/data/seedData";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any)?.role || "employee";
  if (role !== "manager") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Try database first, fall back to seed data
  const userId = (session.user as any)?.id;
  const dbData = userId ? await getTeamFromDB(userId) : null;

  return NextResponse.json({
    team: dbData?.team || DEFAULT_TEAM,
    risks: dbData?.risks || RISKS,
    source: dbData ? "database" : "seed",
  });
}

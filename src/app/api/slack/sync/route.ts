import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fetchChannelMessages, resolveUserName, getLastSyncTimestamp } from "@/lib/slack";
import { parseMessages } from "@/lib/slackParser";
import { applyUpdatesToTeam } from "@/lib/slackSync";
import prisma from "@/lib/prisma";

// POST — called from the UI "Sync from Slack" button
export async function POST() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return syncSlack();
}

// GET — called by Vercel Cron (Monday + Friday at 9 AM UTC)
export async function GET(req: NextRequest) {
  // Verify cron secret in production
  const authHeader = req.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return syncSlack();
}

async function syncSlack() {
  const channelId = process.env.SLACK_CHANNEL_ID;
  if (!channelId) {
    return NextResponse.json(
      { error: "SLACK_CHANNEL_ID not configured" },
      { status: 500 }
    );
  }

  if (!process.env.SLACK_BOT_TOKEN) {
    return NextResponse.json(
      { error: "SLACK_BOT_TOKEN not configured" },
      { status: 500 }
    );
  }

  try {
    // 1. Get the last synced timestamp so we only fetch new messages
    const lastTs = await getLastSyncTimestamp(channelId);

    // 2. Fetch messages from Slack
    const messages = await fetchChannelMessages(channelId, lastTs);
    if (messages.length === 0) {
      return NextResponse.json({ success: true, newMessages: 0, updated: 0 });
    }

    // 3. Resolve user names for each message
    const resolved = await Promise.all(
      messages.map(async (m) => ({
        ...m,
        userName: await resolveUserName(m.user),
      }))
    );

    // 4. Save raw messages to SlackMessage table (upsert to avoid duplicates)
    let saved = 0;
    for (const msg of resolved) {
      await prisma.slackMessage.upsert({
        where: {
          channelId_ts: { channelId, ts: msg.ts },
        },
        create: {
          channelId,
          userId: msg.user,
          userName: msg.userName,
          text: msg.text,
          ts: msg.ts,
        },
        update: {
          text: msg.text,
          userName: msg.userName,
        },
      });
      saved++;
    }

    // 5. Get team member names from DB for matching
    const teamMembers = await prisma.teamMember.findMany({
      select: { name: true },
    });
    const teamNames = teamMembers.map((m) => m.name);

    // 6. Parse messages into structured updates
    const parsed = parseMessages(
      resolved.map((m) => ({
        text: m.text,
        userName: m.userName || m.user,
        ts: m.ts,
      })),
      teamNames
    );

    // 7. Apply updates to TeamMember records
    const { updated, details } = await applyUpdatesToTeam(parsed);

    return NextResponse.json({
      success: true,
      newMessages: saved,
      parsed: parsed.length,
      updated,
      details,
    });
  } catch (error: any) {
    console.error("Slack sync error:", error);
    return NextResponse.json(
      { error: error.message || "Slack sync failed" },
      { status: 500 }
    );
  }
}

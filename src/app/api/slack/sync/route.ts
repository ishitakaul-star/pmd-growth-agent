import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fetchChannelMessages } from "@/lib/slack";

// POST — called from the UI "Sync from Slack" button
export async function POST() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return syncSlack();
}

// GET — called by Vercel Cron (weekly auto-sync)
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

  try {
    const messages = await fetchChannelMessages(channelId);
    // In production: save to SlackMessage table via Prisma
    return NextResponse.json({
      success: true,
      count: messages.length,
      messages: messages.slice(0, 20), // return latest 20
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Slack sync failed" },
      { status: 500 }
    );
  }
}

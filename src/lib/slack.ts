import { WebClient } from "@slack/web-api";

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

export interface SlackMsg {
  user: string;
  userName?: string;
  text: string;
  ts: string;
}

export async function fetchChannelMessages(
  channelId: string,
  oldest?: string
): Promise<SlackMsg[]> {
  try {
    const result = await slack.conversations.history({
      channel: channelId,
      oldest,
      limit: 100,
    });
    return (result.messages || []).map((m) => ({
      user: m.user || "unknown",
      text: m.text || "",
      ts: m.ts || "",
    }));
  } catch (error) {
    console.error("Slack fetch error:", error);
    return [];
  }
}

export async function resolveUserName(userId: string): Promise<string> {
  try {
    const result = await slack.users.info({ user: userId });
    return result.user?.real_name || result.user?.name || userId;
  } catch {
    return userId;
  }
}

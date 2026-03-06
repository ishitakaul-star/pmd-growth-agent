import type { ProjectData } from "@/data/seedData";

export interface ParsedUpdate {
  /** Team member name matched from the message (null if no match) */
  mentionedName: string | null;
  /** Extracted project updates */
  projects: ProjectData[];
  /** Extracted risks / blockers */
  risks: string[];
  /** Raw message text for context */
  rawText: string;
  /** Slack user who posted */
  postedBy: string;
  /** Slack timestamp */
  ts: string;
}

const STATUS_PATTERNS: { pattern: RegExp; status: ProjectData["s"] }[] = [
  { pattern: /\boff[\s-]?track/i, status: "off-track" },
  { pattern: /\bat[\s-]?risk/i, status: "at-risk" },
  { pattern: /\bon[\s-]?track/i, status: "on-track" },
  { pattern: /\bcompleted?\b/i, status: "completed" },
  { pattern: /\bshipped\b/i, status: "completed" },
  { pattern: /\blaunched\b/i, status: "completed" },
  { pattern: /\bon[\s-]?hold\b/i, status: "on-hold" },
  { pattern: /\bdelayed\b/i, status: "at-risk" },
  { pattern: /\bblocked\b/i, status: "off-track" },
];

const RISK_KEYWORDS = /\b(risk|blocker|blocked|dependency|escalat|concern|issue|slip|delay)\b/i;

/**
 * Match a team member name from message text.
 * Checks first name, last name, and full name (case-insensitive).
 */
export function matchTeamMember(
  text: string,
  teamNames: string[]
): string | null {
  const lower = text.toLowerCase();
  for (const fullName of teamNames) {
    if (lower.includes(fullName.toLowerCase())) return fullName;
  }
  // Try first-name match (only if unique)
  const firstNameMatches = teamNames.filter((name) =>
    lower.includes(name.split(" ")[0].toLowerCase())
  );
  if (firstNameMatches.length === 1) return firstNameMatches[0];
  return null;
}

/**
 * Detect project status from a line of text.
 */
function detectStatus(line: string): ProjectData["s"] | null {
  for (const { pattern, status } of STATUS_PATTERNS) {
    if (pattern.test(line)) return status;
  }
  return null;
}

/**
 * Parse a single Slack message into a structured update.
 */
export function parseMessage(
  text: string,
  userName: string,
  ts: string,
  teamNames: string[]
): ParsedUpdate {
  const lines = text.split("\n").filter((l) => l.trim());
  // Match by message text first, then fall back to the poster's name
  const mentionedName =
    matchTeamMember(text, teamNames) ||
    matchTeamMember(userName, teamNames);
  const projects: ProjectData[] = [];
  const risks: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Extract risks
    if (RISK_KEYWORDS.test(trimmed)) {
      risks.push(trimmed.replace(/^[-•*]\s*/, ""));
    }

    // Extract project updates (lines with a status keyword)
    const status = detectStatus(trimmed);
    if (status) {
      // Try to extract a project name — text before the status keyword, or the whole line
      const cleaned = trimmed.replace(/^[-•*]\s*/, "");
      projects.push({
        n: extractProjectName(cleaned),
        s: status,
        d: cleaned,
      });
    }
  }

  return {
    mentionedName,
    projects,
    risks,
    rawText: text,
    postedBy: userName,
    ts,
  };
}

/**
 * Try to extract a project name from a line.
 * Heuristic: take text before the first status keyword, or first ~60 chars.
 */
function extractProjectName(line: string): string {
  // Split on common status phrases
  const splitPatterns =
    /\s*[-–—:]\s*(on[\s-]?track|at[\s-]?risk|off[\s-]?track|completed|shipped|launched|on[\s-]?hold|delayed|blocked)/i;
  const parts = line.split(splitPatterns);
  const name = (parts[0] || line).trim().replace(/^[-•*]\s*/, "");
  // Cap length
  return name.length > 80 ? name.slice(0, 77) + "..." : name || "Update";
}

/**
 * Parse multiple Slack messages into structured updates.
 */
export function parseMessages(
  messages: { text: string; userName: string; ts: string }[],
  teamNames: string[]
): ParsedUpdate[] {
  return messages.map((m) =>
    parseMessage(m.text, m.userName, m.ts, teamNames)
  );
}

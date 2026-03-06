/**
 * Betterworks API client
 * Uses the async report_runs endpoint to fetch goals as XLSX, then parses them.
 *
 * API flow:
 *  1. POST /api/v1/report_runs/ → { id, status: "pending" }
 *  2. Poll GET /api/v1/report_runs/{id}/ until status = "succeeded"
 *  3. Download result.url (signed XLSX)
 *  4. Parse XLSX rows into BwGoal[]
 */

const BW_BASE = "https://app.betterworks.com/api/v1";

export interface BwGoal {
  employeeId: string;
  ownerName: string;
  ownerEmail: string;
  managerEmail: string;
  goalId: string;
  goalName: string;
  detail: string;
  percentComplete: number;
  startDate: string;
  endDate: string;
  assessmentScore: string | null;
  assessmentComment: string | null;
}

function bwHeaders(apiKey: string) {
  return {
    Authorization: `APIToken ${apiKey}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

/** Step 1: Submit the all_goals report and get a job ID */
export async function submitGoalsReport(
  apiKey: string,
  start: string,
  end: string
): Promise<number> {
  const res = await fetch(`${BW_BASE}/report_runs/`, {
    method: "POST",
    headers: bwHeaders(apiKey),
    body: JSON.stringify({
      report: "all_goals",
      parameters: {
        date_range: { start, end },
      },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Betterworks submit failed ${res.status}: ${text}`);
  }
  const data = await res.json();
  return data.id as number;
}

/** Step 2: Poll until the report is ready, return the XLSX download URL */
export async function pollReport(
  apiKey: string,
  reportId: number,
  maxRetries = 12,
  intervalMs = 2500
): Promise<string> {
  for (let i = 0; i < maxRetries; i++) {
    const res = await fetch(`${BW_BASE}/report_runs/${reportId}/`, {
      headers: bwHeaders(apiKey),
    });
    if (!res.ok) throw new Error(`Betterworks poll failed: ${res.status}`);
    const data = await res.json();

    if (data.status === "succeeded" && data.result?.url) {
      return data.result.url as string;
    }
    if (data.status === "failed") {
      throw new Error(`Betterworks report failed: ${data.error}`);
    }
    // Still pending — wait before next poll
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error("Betterworks report timed out");
}

/** Step 3+4: Download the XLSX and parse into BwGoal[] */
export async function fetchGoalsFromReport(xlsxUrl: string): Promise<BwGoal[]> {
  const res = await fetch(xlsxUrl);
  if (!res.ok) throw new Error(`XLSX download failed: ${res.status}`);
  const buffer = await res.arrayBuffer();

  // Dynamic import of xlsx to avoid issues with Next.js edge runtime
  const XLSX = await import("xlsx");
  const wb = XLSX.read(Buffer.from(buffer), { type: "buffer" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows: any[][] = XLSX.utils.sheet_to_json(ws, {
    header: 1,
    defval: null,
  });

  // Row 6 (index) = headers, rows 7+ = data
  const dataRows = rows.slice(7);
  const goals: BwGoal[] = [];

  for (const row of dataRows) {
    if (!row || !row[11]) continue; // skip rows without a Goal ID
    goals.push({
      employeeId: String(row[0] ?? ""),
      ownerName: String(row[1] ?? ""),
      ownerEmail: String(row[2] ?? "").toLowerCase(),
      managerEmail: String(row[10] ?? "").toLowerCase(),
      goalId: String(row[11]),
      goalName: String(row[12] ?? ""),
      detail: String(row[17] ?? ""),
      percentComplete: Number(row[21] ?? 0),
      startDate: String(row[22] ?? ""),
      endDate: String(row[23] ?? ""),
      assessmentScore: row[26] ? String(row[26]) : null,
      assessmentComment: row[27] ? String(row[27]) : null,
    });
  }

  return goals;
}

/** Filter goals belonging to the specified employee */
export function extractMyGoals(goals: BwGoal[], employeeId: string): BwGoal[] {
  return goals.filter((g) => g.employeeId === employeeId);
}

/** Filter goals where the specified email is the direct manager */
export function extractTeamGoals(
  goals: BwGoal[],
  managerEmail: string
): Map<string, BwGoal[]> {
  const lowerManager = managerEmail.toLowerCase();
  const byOwner = new Map<string, BwGoal[]>();

  for (const goal of goals) {
    if (goal.managerEmail !== lowerManager) continue;
    const existing = byOwner.get(goal.ownerEmail) || [];
    existing.push(goal);
    byOwner.set(goal.ownerEmail, existing);
  }

  return byOwner;
}

/** Full pipeline: submit → poll → download → parse */
export async function fetchAllGoals(
  apiKey: string,
  start: string,
  end: string
): Promise<BwGoal[]> {
  const reportId = await submitGoalsReport(apiKey, start, end);
  const xlsxUrl = await pollReport(apiKey, reportId);
  return fetchGoalsFromReport(xlsxUrl);
}

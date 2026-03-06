/* ═══ RESPONSE ENGINE — extracted from index.html ═══ */
import {
  DEFAULT_ME,
  type UserProfileData,
  type TeamMemberData,
  type RiskItem,
} from "@/data/seedData";

export function respond(
  q: string,
  mode: string,
  me: UserProfileData,
  team: TeamMemberData[],
  risks: RiskItem[],
  contextDocs?: string
): string {
  const lq = q.toLowerCase();
  const ctx = contextDocs || "";

  if (mode === "employee") {
    if (
      lq.includes("goal") ||
      lq.includes("objective") ||
      lq.includes("okr") ||
      lq.includes("deliver")
    ) {
      return `## Goals & Objectives — ${me.role}
${me.target ? `**Path to ${me.target}**\n` : ""}
### Active Goals (${(me.goals || []).length})
${(me.goals || []).map((g, i) => `${i + 1}. ${g}`).join("\n")}

${
  me.wins?.length
    ? `### Key Outcomes Delivered (${me.wins.length})\n${me.wins.map((w) => `- ${w}`).join("\n")}\n\n### Evidence Strength\nYou have **${me.wins.length} documented outcomes** supporting your goals. ${me.wins.length >= 5 ? "Strong evidence base — focus on quantifying $ impact." : "Consider documenting more outcomes to build a stronger narrative."}`
    : "### Evidence\nNo outcomes documented yet. Add your wins to build a stronger narrative."
}`;
    }

    if (
      lq.includes("craft") ||
      lq.includes("skill") ||
      lq.includes("rubric") ||
      lq.includes("pillar")
    ) {
      const isIshita = me.name === DEFAULT_ME.name;
      const pillarDetail = isIshita
        ? `### Product Strategy
Your authored work (Enterprise Vision V2.0, Workforce Transformation) demonstrates portfolio-level strategic thinking. You define multi-year roadmaps across 5 pillars.
*Evidence*: FY26-28 roadmap, Islands of Excellence architecture, federated build model.

### Product Execution
7+ concurrent programs driven simultaneously — ServiceNow HRSD, CK Integration, Avature, Workday, Learning, Expert Hiring. Promo Tool shipped Mar 2, DNME Portal live.
*Evidence*: Mar 30 CK cutover, Jun 8 HRSD go-live, >50% DNME adoption week one.

### Technology Fluency
Deep across Workday Extend, ServiceNow Now Assist, Avature, Docebo, GenAI integrations. Original AI frameworks (CVI, ACE, Flash Talent Assembly).
*Evidence*: GenAI promo tool with RAI approval, Dynamic Sensitivity Routing, Superagency paper.

### Org Effectiveness
7 PMs + 2 supporting across 5 domains. Expanded to own ALL HR Product Tech for T4i. Cross-functional dependencies across ServiceNow, Workday, Avature, Learning, Expert Hiring.
*Evidence*: Org expansion, multi-platform coordination, strategic paper co-authorship.`
        : (
            me.craftPillars || [
              "Product Strategy",
              "Product Execution",
              "Technology Fluency",
              "Org Effectiveness",
            ]
          )
            .map(
              (p) =>
                `### ${p}\nAssess your evidence for this pillar based on your goals and outcomes.`
            )
            .join("\n\n");

      return `## PM Craft Skills — ${me.target || "Next Level"} Bar
**PM&D Craft Skills Rubric FY26**

${pillarDetail}

### Your Strengths (outcome-backed)
${(me.strengths || []).map((s) => `- ${s}`).join("\n")}

### Where to Invest
${(me.areasToGrow || []).map((g) => `- ${g}`).join("\n")}`;
    }

    if (
      lq.includes("win") ||
      lq.includes("outcome") ||
      lq.includes("accomplish") ||
      lq.includes("deliver") ||
      lq.includes("impact")
    ) {
      const strat = (me.wins || []).filter(
        (w) =>
          w.toLowerCase().includes("author") ||
          w.toLowerCase().includes("vision") ||
          w.toLowerCase().includes("strategy")
      );
      const exec = (me.wins || []).filter((w) => !strat.includes(w));
      return `## Outcomes & Impact — ${(me.wins || []).length} Documented
${me.target ? `**Building case for ${me.target}**\n` : ""}
${strat.length ? `### Strategic Outcomes\n${strat.map((w) => `- ${w}`).join("\n")}\n` : ""}
### Execution Outcomes
${exec.map((w) => `- ${w}`).join("\n")}

### Narrative Strength
${strat.length >= 2 ? "Strong strategic evidence — you have authored work that demonstrates portfolio-level thinking." : "Consider authoring a strategy doc to strengthen your strategic narrative."}
${exec.length >= 4 ? "Solid execution track record across multiple platforms and launches." : "Document more delivery outcomes with quantified impact."}`;
    }

    if (
      lq.includes("strength") ||
      lq.includes("strong") ||
      lq.includes("good at")
    ) {
      return `## Your Strengths
${(me.strengths || []).map((s) => `- ${s}`).join("\n")}`;
    }

    if (
      lq.includes("grow") ||
      lq.includes("gap") ||
      lq.includes("develop") ||
      lq.includes("improve") ||
      lq.includes("invest") ||
      lq.includes("weak")
    ) {
      return `## Development — Craft Skills View

### Product Strategy
*Where you are*: Authored Enterprise Vision (V2.0) and Workforce Transformation papers — strong evidence of portfolio-level strategic thinking.
*Next*: Get these strategies adopted beyond T4i. Present to cross-BU audiences. Track which recommendations are being implemented.

### Product Execution
*Where you are*: Driving 7+ concurrent programs (ServiceNow, CK, Avature, Workday, Learning, Expert Hiring) with complex dependencies.
*Next*: Build quantified impact narratives — efficiency gains, cost savings, adoption metrics. Execution at this level needs measurable outcomes, not just on-time delivery.

### Technology Fluency
*Where you are*: Deep across Workday, ServiceNow, Avature, Docebo, AI/ML integrations.
*Next*: Evangelize beyond T4i. Present your Superagency frameworks and AI integration patterns at company-wide tech forums. Publish an AI POV.

### Org Effectiveness
*Where you are*: 7+ PMs across 5 domains with cross-functional dependencies.
*Next*: Seek visible opportunities to influence roadmaps or strategy outside your org. Broaden organizational influence beyond T4i.

### Growth Areas
${(me.areasToGrow || []).map((g) => `- ${g}`).join("\n")}`;
    }

    if (
      lq.includes("promo") ||
      lq.includes("readiness") ||
      lq.includes("ready")
    ) {
      const isIshita = me.name === DEFAULT_ME.name;
      if (isIshita) {
        return `## Promotion Readiness — 95%
**${me.role} → ${me.target}**

### Product Strategy — 97%
- Enterprise Vision V2.0 authored & presented
- Workforce Transformation / Superagency paper authored
- 5 strategic pillars defined, FY26-28 roadmap
- *Remaining*: Cross-BU strategy adoption — present beyond T4i

### Product Execution — 96%
- 7+ concurrent programs driven simultaneously
- Promo Tool launched Mar 2 with GenAI
- DNME Portal: >50% task completion week one
- CK Avature Mar 30 cutover confirmed
- *Remaining*: Quantified $ impact narratives across all pillars

### Technology Fluency — 92%
- GenAI integration — Promo Tool + RAI/security approval
- ServiceNow Now Assist Dynamic Sensitivity Routing
- AI-Enabled Superagency frameworks (CVI, ACE, Flash Talent)
- *Remaining*: Present AI patterns at company-wide forum; publish AI POV

### Org Effectiveness — 93%
- 7 PMs + 2 supporting across 5 domains
- Expanded to own ALL HR Product Tech for T4i
- Cross-functional execution across 5 platforms
- *Remaining*: Visible cross-BU influence outside T4i

> Switch to the **Promo** tab for the full visual tracker`;
      }
      return `## Promotion Readiness
**${me.role} → ${me.target || "Next Level"}**

Based on your profile, assess yourself across the 4 craft skill pillars:
${(
  me.craftPillars || [
    "Product Strategy",
    "Product Execution",
    "Technology Fluency",
    "Org Effectiveness",
  ]
)
  .map((p) => `- **${p}**: What evidence do you have?`)
  .join("\n")}

Add more context (goals, wins, strategy docs) to get a richer assessment.`;
    }

    if (
      lq.includes("vision") ||
      lq.includes("strategy") ||
      lq.includes("paper") ||
      lq.includes("author") ||
      lq.includes("wrote")
    ) {
      const papers = me.wins?.filter(
        (w) =>
          w.toLowerCase().includes("author") ||
          w.toLowerCase().includes("vision") ||
          w.toLowerCase().includes("strategy paper")
      );
      return papers?.length
        ? `## Your Authored Work\n${papers.map((p) => `- ${p}`).join("\n")}`
        : `## Authored Work\nNo strategy papers found in your profile. Tell me about work you've authored and I'll add it.`;
    }

    // Context-aware: search uploaded docs for relevant info
    if (ctx) {
      const words = lq.split(/\s+/).filter((w) => w.length > 3);
      const ctxLines = ctx.split("\n").filter((l) => l.trim());
      const matches = ctxLines
        .filter((l) => {
          const ll = l.toLowerCase();
          return words.some((w) => ll.includes(w));
        })
        .slice(0, 8);
      if (matches.length >= 2) {
        return `## From Your Context\nBased on your uploaded documents:\n${matches.map((m) => `- ${m.trim().slice(0, 200)}`).join("\n")}\n\n*Ask me about goals, craft skills, outcomes, or development for deeper analysis.*`;
      }
    }

    // Rich employee fallback — auto-generated profile summary
    const goalCount = (me.goals || []).length;
    const winCount = (me.wins || []).length;
    return `## ${me.name} — ${me.role}
**${me.org || ""}**${me.target ? ` | Target: **${me.target}**` : ""}

### At a Glance
- **${goalCount} active goals** — ${(me.goals || []).slice(0, 2).join("; ")}${goalCount > 2 ? `; +${goalCount - 2} more` : ""}
- **${winCount} key outcomes** — ${(me.wins || [])
      .slice(0, 2)
      .map((w) => w.split("—")[0].trim())
      .join("; ")}${winCount > 2 ? `; +${winCount - 2} more` : ""}

### Strengths
${(me.strengths || []).map((s) => `- ${s}`).join("\n")}

### Where to Invest
${(me.areasToGrow || []).map((g) => `- ${g}`).join("\n")}

---
Ask *"My goals"*, *"Outcomes"*, *"Craft skills"*, *"Development"*, or *"Strategy work"* for deeper views.`;
  }

  /* ═══ MANAGER ═══ */
  if (
    lq.includes("team") &&
    (lq.includes("overview") ||
      lq.includes("status") ||
      lq.includes("summary"))
  ) {
    const atRiskTotal = team.reduce(
      (a, t) =>
        a +
        (t.projects || []).filter(
          (p) => p.s === "at-risk" || p.s === "off-track"
        ).length,
      0
    );
    const totalP = team.reduce((a, t) => a + (t.projects || []).length, 0);
    return `## Team Status — ${team.length} PMs, ${totalP} Projects
**${atRiskTotal} at-risk/off-track items need attention**

${team
  .map((t) => {
    const ar = (t.projects || []).filter(
      (p) => p.s === "at-risk" || p.s === "off-track"
    );
    const ot = (t.projects || []).filter((p) => p.s === "on-track").length;
    const comp = (t.projects || []).filter((p) => p.s === "completed").length;
    const ic = ar.length > 2 ? "🔴" : ar.length > 0 ? "🟡" : "🟢";
    const sub = t.reportsTo ? ` *(${t.reportsTo})*` : "";
    const tgt = t.recentlyPromoted
      ? "Recently promoted"
      : t.targetLevel
        ? `→ ${t.targetLevel}`
        : "";
    return `${ic} **${t.name}** — ${t.role} ${tgt}${sub}
   ${t.area}
   ${ot} on-track, ${ar.length} at-risk, ${comp} completed
${ar.length ? `   *Attention*: ${ar.map((p) => p.n).join(", ")}` : "   All clear"}`;
  })
  .join("\n\n")}

---
Ask about any person by name for a full deep-dive.`;
  }

  if (
    lq.includes("risk") ||
    lq.includes("blocker") ||
    lq.includes("escalat")
  ) {
    const h = risks.filter((r) => r.sev === "high");
    const m = risks.filter((r) => r.sev === "med");
    const l = risks.filter((r) => r.sev === "low");
    return `## Risk Review — March 2026
**${h.length} high** | **${m.length} medium** | **${l.length} lower** — ${risks.length} total

### 🔴 High Severity — Needs Immediate Action
${h.map((r) => `**${r.area}** *(${r.who})*\n${r.d}`).join("\n\n")}

### 🟡 Medium — Monitor Closely
${m.map((r) => `**${r.area}** *(${r.who})* — ${r.d}`).join("\n")}

### 🟢 Lower — Watch
${l.map((r) => `**${r.area}** *(${r.who})* — ${r.d}`).join("\n")}

---
### Recommended Actions This Week
1. **TPEP exec decision** — blocking Pavel + Umang on CK integration. Schedule a 30-min decision meeting with Lara and leadership. Bring Umang's exec summary.
2. **Change Enablement resource gap** — Mar 6 deadline. Sylesh needs your air cover to secure headcount or reallocation. Escalate to your VP if needed.
3. **Docebo renewal pricing** — due 3/16. Navneet + Kevin need budget clarity. Align with finance this week.
4. **iCIMS archival** — Tammy blocked. No metadata, no path forward without Himanshu's team. Send direct escalation.
5. **Separation App scope** — Pavel is absorbing scope creep. Help draw the line on non-critical features. Document what's in vs. out.

> Ask about any specific risk owner (e.g., *"How is Sylesh doing?"*) for project-level detail.`;
  }

  const pm = team.find((t) =>
    lq.includes(t.name.toLowerCase().split(" ")[0])
  );

  if (
    pm &&
    (lq.includes("feedback") || lq.includes("sbi") || lq.includes("draft"))
  ) {
    const top = pm.projects?.[0];
    const risk = pm.projects?.find(
      (p) => p.s === "at-risk" || p.s === "off-track"
    );
    const onTrack = (pm.projects || []).filter(
      (p) => p.s === "on-track" || p.s === "completed"
    );
    const topDev = pm.dev ? Object.entries(pm.dev)[0] : null;
    return `## SBI Feedback — ${pm.name}
**${pm.role}** | ${pm.area}${pm.recentlyPromoted ? ` | *Recently promoted*` : ""}

### Positive (Situation → Behavior → Impact)
**S**: ${top?.n || "This quarter"} — ${top?.d?.slice(0, 80) || "current sprint"}
**B**: Drove the work forward with ownership — ${onTrack.length} project(s) on-track or shipped.
**I**: Kept critical path on track for the org. Builds confidence in ${pm.name.split(" ")[0]}'s ability to deliver under complexity.

${
  risk
    ? `### Developmental (Situation → Behavior → Impact)\n**S**: ${risk.n} — ${risk.d?.slice(0, 80)}\n**B**: Risk surfaced but escalation or mitigation came late.\n**I**: Creates delivery risk for downstream dependencies. Coach on earlier risk signaling and proactive stakeholder communication.\n\n**Coaching prompt**: *"When you see a risk forming, what's your escalation threshold? Let's define it together so we catch these earlier."*`
    : "### Developmental\nNo at-risk items right now — look for stretch opportunities to give constructive feedback on."
}

${pm.recentlyPromoted ? `\n> *Frame all feedback around excelling at ${pm.role}, not next promo. Celebrate the promotion, reinforce expectations at current level.*` : ""}
${topDev ? `\n### Growth Investment\nPriority craft skill: **${topDev[0] === "strategy" ? "Product Strategy" : topDev[0] === "execution" ? "Product Execution" : topDev[0] === "techFluency" ? "Technology Fluency" : "Org Effectiveness"}**\n${topDev[1].slice(0, 200)}` : ""}`;
  }

  if (
    pm &&
    (lq.includes("develop") ||
      lq.includes("coach") ||
      lq.includes("growth"))
  ) {
    const sub = pm.reportsTo ? ` *(${pm.reportsTo})*` : "";
    const tgt = pm.recentlyPromoted
      ? `Excelling at ${pm.role}`
      : pm.targetLevel
        ? `${pm.role} → ${pm.targetLevel}`
        : "Growth";
    return `## Development — ${pm.name}
**${tgt}**${sub}

${
  pm.dev
    ? `### Product Strategy\n${pm.dev.strategy}\n\n### Product Execution\n${pm.dev.execution}\n\n### Technology Fluency\n${pm.dev.techFluency}\n\n### Org Effectiveness\n${pm.dev.orgEffectiveness}`
    : `Based on ${pm.name.split(" ")[0]}'s current portfolio, focus on the craft pillar most relevant to their next level.`
}`;
  }

  if (pm) {
    const sub = pm.reportsTo ? `\n*${pm.reportsTo}*` : "";
    const ar = (pm.projects || []).filter(
      (p) => p.s === "at-risk" || p.s === "off-track"
    );
    const ot = (pm.projects || []).filter((p) => p.s === "on-track");
    const comp = (pm.projects || []).filter((p) => p.s === "completed");
    const tgt = pm.recentlyPromoted
      ? "Recently promoted — excelling at current level"
      : pm.targetLevel
        ? `Target: **${pm.targetLevel}**`
        : "";
    return `## ${pm.name} — ${pm.role}${sub}
**${pm.area}**
${tgt}

### Health: ${ar.length > 2 ? "🔴 Needs attention" : ar.length > 0 ? "🟡 Some risks" : "🟢 On track"}
${ot.length} on-track | ${ar.length} at-risk | ${comp.length} completed

### Projects (${(pm.projects || []).length})
${(pm.projects || [])
  .map((p) => {
    const ic =
      p.s === "completed"
        ? "✅"
        : p.s === "on-track"
          ? "🟢"
          : p.s === "at-risk"
            ? "🟡"
            : p.s === "off-track"
              ? "🔴"
              : "⏸️";
    return `${ic} **${p.n}** — ${p.d}`;
  })
  .join("\n")}

### Risks (${(pm.risks || []).length})
${(pm.risks || []).map((r) => `- ${r}`).join("\n")}
${pm.dev ? `\n### Development Focus\n- **Strategy**: ${pm.dev.strategy.slice(0, 120)}...\n- **Execution**: ${pm.dev.execution.slice(0, 120)}...` : ""}
${pm.note ? `\n### Latest Context\n${pm.note.split("\n---\n")[0].trim()}` : ""}

---
Try *"Feedback for ${pm.name.split(" ")[0]}"* or *"Development for ${pm.name.split(" ")[0]}"*`;
  }

  if (lq.includes("promo") || lq.includes("readiness")) {
    const promo = team.filter((t) => !t.recentlyPromoted && t.targetLevel);
    const recent = team.filter((t) => t.recentlyPromoted);
    return `## Team Promo Pipeline — ${promo.length} on track, ${recent.length} recently promoted

### Active Promo Targets
${promo
  .map((t) => {
    const sub = t.reportsTo ? ` *(${t.reportsTo})*` : "";
    const topStrength = t.dev
      ? Object.entries(t.dev).sort((a, b) => b[1].length - a[1].length)[0]
      : "";
    const topGap = t.risks?.[0] || "";
    return `**${t.name}**${sub} — ${t.role} → **${t.targetLevel}**
   ${t.area}
   *Strongest signal*: ${topStrength ? topStrength[1].slice(0, 120) + "..." : "Building evidence"}
   *Key gap*: ${topGap || "None identified"}`;
  })
  .join("\n\n")}

${
  recent.length
    ? `### Recently Promoted\n${recent
        .map(
          (t) =>
            `**${t.name}** — ${t.role} *(focus: excel at current level, not next promo)*\n   ${t.area} | ${(t.projects || []).length} active projects`
        )
        .join("\n\n")}`
    : ""
}

---
Ask *"Development for [name]"* for craft-skills coaching recommendations.`;
  }

  if (lq.includes("develop") || lq.includes("coach")) {
    return `## Development Priorities — All ${team.length} PMs

${team
  .map((t) => {
    const sub = t.reportsTo ? ` *(${t.reportsTo})*` : "";
    const tgt = t.recentlyPromoted
      ? "Excel at current level"
      : t.targetLevel
        ? `→ ${t.targetLevel}`
        : "";
    const ar = (t.projects || []).filter(
      (p) => p.s === "at-risk" || p.s === "off-track"
    ).length;
    return `### ${t.name} — ${t.role} ${tgt}${sub}
${t.area} | ${(t.projects || []).length} projects, ${ar} at-risk
${
  t.dev
    ? `- **Strategy**: ${t.dev.strategy.slice(0, 100)}...
- **Execution**: ${t.dev.execution.slice(0, 100)}...
- **Tech Fluency**: ${t.dev.techFluency.slice(0, 100)}...
- **Org Effectiveness**: ${t.dev.orgEffectiveness.slice(0, 100)}...`
    : "Focus on craft pillar most relevant to their level."
}`;
  })
  .join("\n\n")}

---
Ask *"Development for [name]"* for the full craft-skills breakdown with specific recommendations.`;
  }

  // Rich manager fallback — auto-generated dashboard summary
  const atRiskCount = team.reduce(
    (a, t) =>
      a +
      (t.projects || []).filter(
        (p) => p.s === "at-risk" || p.s === "off-track"
      ).length,
    0
  );
  const onTrackCount = team.reduce(
    (a, t) =>
      a + (t.projects || []).filter((p) => p.s === "on-track").length,
    0
  );
  const completedCount = team.reduce(
    (a, t) =>
      a + (t.projects || []).filter((p) => p.s === "completed").length,
    0
  );
  const totalProjects = team.reduce(
    (a, t) => a + (t.projects || []).length,
    0
  );
  const highRisks = risks.filter((r) => r.sev === "high");
  const promoTrack = team.filter((t) => !t.recentlyPromoted && t.targetLevel);
  const recentPromo = team.filter((t) => t.recentlyPromoted);

  return `## Team Dashboard — ${team.length} PMs, ${totalProjects} Active Projects

### Health Snapshot
- 🟢 **${onTrackCount} on-track** | 🟡🔴 **${atRiskCount} at-risk/off-track** | ✅ **${completedCount} completed**

### Team
${team
  .map((t) => {
    const ar = (t.projects || []).filter(
      (p) => p.s === "at-risk" || p.s === "off-track"
    ).length;
    const ot = (t.projects || []).filter((p) => p.s === "on-track").length;
    const ic = ar > 2 ? "🔴" : ar > 0 ? "🟡" : "🟢";
    const sub = t.reportsTo ? ` *(${t.reportsTo})*` : "";
    return `${ic} **${t.name}** — ${t.role}${sub} | ${t.area}\n   ${ot} on-track, ${ar} at-risk across ${(t.projects || []).length} projects`;
  })
  .join("\n")}

### Top Risks (${highRisks.length} high-severity)
${highRisks.map((r) => `- 🔴 **${r.area}** *(${r.who})* — ${r.d}`).join("\n")}

### Promo Pipeline
${promoTrack.map((t) => `- **${t.name}** — ${t.role} → ${t.targetLevel}`).join("\n")}
${recentPromo.length ? `\n*Recently promoted*: ${recentPromo.map((t) => t.name).join(", ")}` : ""}

---
Ask about any PM by name, or try *"Risks"*, *"Feedback for Kevin"*, *"Development for Navneet"*`;
}

/* ═══ ISHITA'S DEFAULT DATA — extracted from index.html ═══ */

export interface ProjectData {
  n: string;
  s: "on-track" | "at-risk" | "off-track" | "completed" | "on-hold";
  d: string;
}

export interface DevRecommendations {
  strategy: string;
  execution: string;
  techFluency: string;
  orgEffectiveness: string;
}

export interface TeamMemberData {
  name: string;
  role: string;
  area: string;
  projects: ProjectData[];
  risks: string[];
  targetLevel?: string;
  reportsTo?: string;
  recentlyPromoted?: boolean;
  note?: string;
  dev?: DevRecommendations;
}

export interface RiskItem {
  sev: "high" | "med" | "low";
  area: string;
  who: string;
  d: string;
}

export interface UserProfileData {
  name: string;
  role: string;
  org: string;
  target: string;
  goals: string[];
  wins: string[];
  strengths: string[];
  areasToGrow: string[];
  craftPillars: string[];
}

export const DEFAULT_ME: UserProfileData = {
  name: "Ishita Kaul",
  role: "Group Product Manager",
  org: "People & Places Technology (T4i) — All HR Product Tech",
  target: "Director, Product Management",
  goals: [
    "Deliver Enterprise HR Tech Vision & Strategy across all T4i pillars",
    "Drive CK Integration to Aug 2026 completion",
    "Scale ServiceNow HRSD platform (R1 go-live Jun 8)",
    "Consolidate TA platform on Avature",
    "Build high-performing PM team (7 direct + 2 supporting)",
  ],
  wins: [
    "Authored Enterprise Vision Strategy (V2.0) — Unified Intelligent Workforce Platform. 5 strategic pillars, federated build model, Islands of Excellence architecture, FY26-28 roadmap. Presented for EVP/SVP buy-in.",
    "Authored Workforce Transformation through AI-Enabled Superagency — original frameworks: CVI (real-time performance intelligence), Flash Talent Assembly (AI team building), ACE (autonomous strategic decisions), Cognitive Readiness Orchestration. Privacy-first governance. Competitive research with PwC, US Air Force.",
    "Expanded role to own ALL of HR Product Tech for T4i.",
    "Promo Tool (Workday Extend) launched Mar 2 with GenAI work highlights — navigated RAI + security approval.",
    "DNME/Performance Portal launched to ~650 managers — >50% task completion in first week.",
    "ServiceNow HRSD: 177 articles migrated, Dynamic Sensitivity Routing for Now Assist AI.",
    "CK Avature integration: Mar 30 cutover confirmed, workback plan approved.",
    "Expert Hiring: AIO to PROD (02/17), Req Approval to PROD (02/20).",
  ],
  strengths: [
    "Enterprise strategy authorship — two major papers spanning entire HR tech portfolio",
    "Large org management — 7+ PMs across 5 domains, complex dependencies",
    "Cross-functional execution — ServiceNow, Workday, Avature, Learning, Expert Hiring simultaneously",
    "AI product integration — promo tool GenAI, HRSD Now Assist, learning platform agentic features",
  ],
  areasToGrow: [
    "Cross-BU influence — seek visible opportunities to shape roadmaps or strategy outside T4i. Broaden organizational influence beyond your own org.",
    "Enterprise AI advocacy — present at company-wide tech forums, publish AI POVs beyond T4i. Broaden distribution of your authored frameworks.",
    "Quantified business impact — build $ and efficiency metrics across all pillars to strengthen your narrative.",
  ],
  craftPillars: [
    "Product Strategy",
    "Product Execution",
    "Technology Fluency",
    "Org Effectiveness",
  ],
};

export const DEFAULT_TEAM: TeamMemberData[] = [
  {
    name: "Navneet Ramachandran",
    role: "Staff PM",
    area: "Employee, Compliance & Sales Learning",
    projects: [
      { n: "CAMP Compliance Monitor", s: "on-track", d: "Phase-3 SAT courses go-live 3/6. All Workplace Harassment launched 1/30." },
      { n: "Escalation Email Reminders", s: "on-track", d: "Slack reminders first week of March. Manager escalations April. Dir/VP late Q4." },
      { n: "Social Engineering Training", s: "at-risk", d: "SSO multi-course prompt needs API update. Upstream data dependency on Cybercraft. Assignments May." },
      { n: "One Intuit Learning Platform", s: "on-track", d: "MVP end of FY26. Agentic learning in scope. CyberCraft + Sales + Marketing unified." },
      { n: "CK Docebo Migration", s: "at-risk", d: "Third-party worker Workday treatment has no owner. Mapping file expected 3/6." },
      { n: "Docebo Renewal", s: "at-risk", d: "Due 3/16. Pricing negotiation ongoing. $1.45M budget PR initiated." },
      { n: "Codility Tech Assessment", s: "on-track", d: "Expanding to academies + TA. Discovery call scheduled." },
    ],
    risks: [
      "Social Eng: upstream data dependency, no owner",
      "CK Docebo: third-party worker treatment unresolved",
      "Docebo Renewal 3/16: pricing + budget unresolved",
    ],
    targetLevel: "Principal PM",
    dev: {
      strategy:
        "One Intuit Learning Platform is Navneet's strongest vehicle — define the multi-year product vision and present it to cross-functional leadership. Translate the platform consolidation (CyberCraft + Sales + Marketing) into a published strategy doc.",
      execution:
        "Docebo Renewal and CK Migration have complex vendor + stakeholder dependencies. Use these to build the muscle of driving ambiguous cross-team programs to closure — a Principal PM expectation.",
      techFluency:
        "Codility evaluation + agentic learning features are opportunities to deepen AI/ML product fluency. Drive the technical architecture decisions, not just the PRD.",
      orgEffectiveness:
        "Social Engineering Training and CAMP span multiple orgs (Cybercraft, SSO, compliance). Proactively own the cross-org dependency resolution rather than waiting for upstream teams.",
    },
  },
  {
    name: "Kevin Tran",
    role: "Staff PM",
    area: "ProAdvisor Academy & Intuit Academy",
    projects: [
      { n: "Glider Migration", s: "completed", d: "VEP stopped SmartEval. Glider extended. Target: $800K unlimited vs $4M risk." },
      { n: "ProAdvisor TM v2", s: "on-track", d: "Launched 2/05. Fast follows completing. Qliksense Dashboard 3/2." },
      { n: "ProAdvisor Recert", s: "on-track", d: "Solutioning. TM + CareTool designs complete." },
      { n: "ProAdvisor Globalization", s: "on-track", d: "Tech req doc under review. Credly playbook done. Docebo in progress." },
      { n: "Docebo Budget", s: "at-risk", d: "Internal allocation needed for IA + PAA external usage before 3/16 renewal." },
    ],
    risks: [
      "Glider: $800K→$4M if unlimited not secured",
      "Docebo budget needs resolution before 3/16",
    ],
    targetLevel: "Principal PM",
    dev: {
      strategy:
        "Glider negotiation ($800K vs $4M) is a high-stakes vendor strategy play — document the decision framework and present the long-term assessment strategy to leadership. This is Principal-level strategic ownership.",
      execution:
        "ProAdvisor Globalization requires coordinating across UK, CAN, LATAM, AUS, EMEA, APAC — build and publish a global playbook with regional adaptation frameworks. Scale execution beyond single-market launches.",
      techFluency:
        "ProAdvisor TM v2 + Recert are opportunities to drive data-informed product decisions. Own the Qliksense metrics dashboard to tell the product story with data, not just feature delivery.",
      orgEffectiveness:
        "Docebo budget allocation requires cross-portfolio negotiation (IA vs PAA funding). Lead this conversation proactively — demonstrates influence across product lines.",
    },
  },
  {
    name: "Tammy Mao-McDonald",
    role: "Principal PM",
    area: "TA, Experts & 3rd Party Experts",
    recentlyPromoted: true,
    projects: [
      { n: "Avature Post-Impl", s: "on-track", d: "Business portal follow-up Mar 2. Data Manager launch first week of March." },
      { n: "iCIMS Data Archival", s: "off-track", d: "No metadata from iCIMS. Raw S3 data incomprehensible. Need Himanshu team." },
      { n: "CK Avature Integration", s: "on-track", d: "Mar 30 cutover confirmed. PART driving workback plan." },
      { n: "Indeed ATS Feed", s: "at-risk", d: "Indeed lacks TAMK tracking. Mid-March follow-up if Radancy API unavailable." },
      { n: "Intelligent Routing", s: "on-track", d: "PRD signed off. Eng committed to Concierge lead form." },
      { n: "Job Architecture", s: "at-risk", d: "6 months work, Mar 6 deadline, no eng assigned." },
      { n: "Calendly Replacement", s: "at-risk", d: "Security blocking FY27. Pushing delay to Feb 2027." },
      { n: "Juicebox AI", s: "on-hold", d: "Waiting PART + Scott alignment on AI vendor vetting." },
    ],
    risks: [
      "iCIMS archival: no metadata, need Himanshu",
      "Job Arch: 6mo work, Mar 6 deadline, no eng",
      "Calendly: forced replacement could disrupt EH",
      "Indeed: Radancy API only path before Sep",
    ],
    note: "Recently promoted — focus on excelling at current level",
    dev: {
      strategy:
        "iCIMS archival and CK Avature integration are large-scale platform migration plays. Document the end-to-end migration strategy with decision frameworks — this demonstrates senior-level strategic ownership of complex transitions.",
      execution:
        "8 active projects is a massive portfolio. Build a stakeholder-visible program dashboard and operating cadence that others can follow — shows scaled execution maturity.",
      techFluency:
        "Juicebox AI and Intelligent Routing are AI-forward product opportunities. Stay close to the technical design decisions — understand the architecture, not just requirements.",
      orgEffectiveness:
        "TA domain spans PART, engineering, Scott (AI vetting), security (Calendly), Lara (CK decisions). Map and actively manage this stakeholder web — biggest leverage for growing at current level.",
    },
  },
  {
    name: "Umang Mathur",
    role: "Senior PM",
    area: "Experts — TPEP, Shipping & Internal Tools",
    reportsTo: "Supports Tammy on Experts",
    projects: [
      { n: "TPEP RTB", s: "on-track", d: "New managers + product experts for partner firms. Workgroup config ongoing." },
      { n: "TPEP CK Integration", s: "at-risk", d: "Exec Summary created. Rec: do not migrate CK Offshore Workers to TPEP by Aug 1." },
      { n: "Shipping", s: "on-track", d: "UI/UX in dev. Solutioning for 300 non-ODE employees + expedited shipping." },
      { n: "Twilio Phase 2", s: "on-track", d: "Dev in progress." },
      { n: "Internal Apply Phase 2", s: "on-track", d: "Dev in progress." },
      { n: "Admin Console", s: "on-track", d: "PART aligned. Phone Screen Refresh PRD in progress." },
    ],
    risks: [
      "TPEP CK: leadership decision needed on Aug 1 — lack of alignment cascading delays",
    ],
    targetLevel: "Staff PM",
    dev: {
      strategy:
        "TPEP CK Executive Summary is strong strategic work. Next step: own the recommendation through to executive decision — present it, defend trade-offs, drive alignment. This is how Senior PMs demonstrate Staff-level strategic influence.",
      execution:
        "6 projects across TPEP, Shipping, Twilio, Internal Apply, Admin Console — build a unified portfolio view with dependencies mapped. Demonstrate you can manage breadth without dropping threads.",
      techFluency:
        "Twilio Phase 2 and Admin Console have meaningful technical underpinnings. Participate in architecture reviews and technical trade-off discussions — Staff PMs are expected to hold their own in eng conversations.",
      orgEffectiveness:
        "Shipping touches 300+ employees across agent types and states. Own the cross-org coordination (PART, eng, operations) end-to-end rather than routing through Tammy.",
    },
  },
  {
    name: "Amith Hebbar",
    role: "Senior PM",
    area: "Expert Hiring — RTB & Season Readiness",
    reportsTo: "Supports Tammy on Experts",
    projects: [
      { n: "Season Readiness TY26", s: "on-track", d: "OINP wave 1 e2e/UAT. Wave 2 in dev. Pay rate + Wave 3 (11 stories) in dev." },
      { n: "Req Approval", s: "completed", d: "PROD 02/20. Smoke testing complete." },
      { n: "AIO Hiring", s: "completed", d: "PROD 02/17." },
      { n: "RTB Maintenance", s: "on-track", d: "HireRight integration in e2e. Non-P0 RTB on hold for CTB." },
      { n: "EOS Workday Extend", s: "on-track", d: "Rehire EOS groomed with EH + VEP. Scope aligned." },
    ],
    risks: [
      "Phone screen reqs delayed 2 weeks",
      "Non-P0 RTB on hold — tech debt accumulating",
    ],
    targetLevel: "Staff PM",
    dev: {
      strategy:
        "Season Readiness is a recurring, high-stakes program. Author a Season Readiness playbook that codifies the approach — wave planning, requirement sequencing, stakeholder cadence. Turns execution into reusable strategy.",
      execution:
        "Req Approval and AIO shipped to PROD — strong delivery. Next step: own the post-launch outcomes. Track adoption, measure impact, build the narrative beyond \"shipped.\"",
      techFluency:
        "EOS Workday Extend and HireRight integration are integration-heavy. Deepen understanding of Extend architecture and API patterns — Staff PMs need to challenge eng, not just relay requirements.",
      orgEffectiveness:
        "RTB deprioritization decision (non-P0 on hold) affects multiple stakeholders. Proactively communicate trade-offs and manage expectations with PART and business partners — don't wait for them to ask.",
    },
  },
  {
    name: "Sylesh Ballolla",
    role: "Principal PM",
    area: "HRSD — ServiceNow, Onboarding & Offboarding",
    projects: [
      { n: "ServiceNow HRSD R1", s: "at-risk", d: "YELLOW. Build 60%. 39 services Mar 4. Agent-facing Apr 1. GO-LIVE Jun 8." },
      { n: "Change Enablement", s: "at-risk", d: "Critical resource gap. SRT drafted. Leadership decision by Mar 6." },
      { n: "Content Migration", s: "on-track", d: "177 articles migrated. Stabilized." },
      { n: "AI & Technical", s: "on-track", d: "Now Assist Dynamic Sensitivity Routing. SIT for AI Safety + core integrations." },
      { n: "Testing", s: "at-risk", d: "Functional 33%. SIT 27%. E2E recovery needed." },
      { n: "Onboarding/Offboarding", s: "on-track", d: "Workflows managed within HRSD platform." },
    ],
    risks: [
      "YELLOW: Change Enablement resource gap — Mar 6 deadline",
      "1 integration delayed (Data Lake), 3 at-risk",
      "R2 paused for R1 — timeline impact",
      "Build 60% with Jun 8 go-live",
    ],
    targetLevel: "Senior Principal PM",
    dev: {
      strategy:
        "ServiceNow HRSD is the highest-visibility platform program in T4i. Author a post-R1 strategy that defines R2+ roadmap and long-term HRSD vision. Senior Principal PMs set multi-year platform direction.",
      execution:
        "R1 program is YELLOW with Jun 8 go-live — this is the crucible moment. How you navigate the war room, resource gaps, and integration risks will define your execution reputation. Document the recovery playbook.",
      techFluency:
        "Now Assist AI, Dynamic Sensitivity Routing, SIT for AI Safety — you're at the cutting edge of AI in enterprise service delivery. Present the AI integration patterns and lessons learned to the broader org.",
      orgEffectiveness:
        "Change Enablement resource gap requires escalating to and influencing leadership beyond your direct chain. This is the Senior Principal skill — moving organizational blockers through influence, not authority.",
    },
  },
  {
    name: "Pavel Hardak",
    role: "Principal PM",
    area: "Workday Platform, Core HR & CK Integration",
    projects: [
      { n: "CK Integration", s: "at-risk", d: "Benevity ($30K) + Prism ($12K) PRs delayed by 3PRM. Plan 80%. Wave 2 → Apr 10." },
      { n: "TPEP Migration", s: "at-risk", d: "No alignment. Exec Summary w/ Umang. Rec: no CK offshore TPEP by Aug 1." },
      { n: "Separation App", s: "at-risk", d: "Scope expansion. Pushing back non-critical. E2E Mar 10. Target early April." },
      { n: "Workday Platform", s: "on-track", d: "PTO automation to PROD. Docebo enhancement. 26R1 regression." },
      { n: "Promo App", s: "on-track", d: "Launched Mar 2. GenAI resolved. SOX reassigned." },
      { n: "EOS App", s: "on-track", d: "Report discrepancy resolved via native Workday workaround." },
      { n: "WD AI & Governance", s: "on-track", d: "Advanced Comp with WD PMs. 3PRM in progress. uMSA targeting Legal." },
    ],
    risks: [
      "TPEP: exec decision needed — cascading CK delays",
      "Separation: scope expansion threatens Apr 4",
      "3PRM blocking Benevity/Prism PRs",
      "Extend security model gap",
    ],
    targetLevel: "Senior Principal PM",
    dev: {
      strategy:
        "CK Integration spans Workday, TPEP, Benevity, Prism, and org design. Author a unified CK tech integration strategy document — Senior Principal PMs define cross-platform strategy, not just execute workstreams.",
      execution:
        "Separation App scope management under stakeholder pressure is a senior leadership test. Document the governance framework you built to contain scope — this becomes a reusable organizational asset.",
      techFluency:
        "Workday Extend, 26R1, Prism, GenAI in Promo App, security model gaps — you cover the full Workday technical stack. Present an architectural review of Extend patterns and security implications to the broader platform team.",
      orgEffectiveness:
        "TPEP requires driving executive alignment across multiple leaders who disagree. The executive summary with Umang is a start — now drive it to a decision. This is the Senior Principal bar: resolving cross-org ambiguity.",
    },
  },
];

export const RISKS: RiskItem[] = [
  { sev: "high", area: "HRSD R1", who: "Sylesh", d: "YELLOW. Change Enablement resource gap. Build 60%, Jun 8 go-live. War room Mar 2-6." },
  { sev: "high", area: "TPEP Alignment", who: "Pavel/Umang", d: "No exec decision. Cascading CK delays. Decision needed now." },
  { sev: "high", area: "Separation Scope", who: "Pavel", d: "Continuous expansion threatening Apr 4. Governance needed." },
  { sev: "high", area: "iCIMS Archival", who: "Tammy", d: "No metadata. S3 data incomprehensible. Need Himanshu team." },
  { sev: "med", area: "Docebo Renewal", who: "Navneet/Kevin", d: "Due 3/16. Pricing + budget unresolved." },
  { sev: "med", area: "Job Architecture", who: "Tammy", d: "6mo work, Mar 6 deadline, no eng." },
  { sev: "med", area: "Calendly", who: "Tammy", d: "Security blocking FY27. Requesting delay to Feb 2027." },
  { sev: "med", area: "CK Docebo", who: "Navneet", d: "Third-party worker Workday treatment — no owner." },
  { sev: "low", area: "Phone Screen", who: "Amith", d: "Delayed 2 weeks. Impact analysis needed." },
  { sev: "low", area: "Indeed ATS", who: "Tammy", d: "Radancy API only path. Fallback needed before Sep." },
];

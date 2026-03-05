export const CURRENT_USER = {
  name: 'Alex Chen',
  role: 'Staff PM (T4)',
  level: 'staff',
  team: 'AI Platform',
  manager: 'Sarah Kim',
  startDate: '2022-03-15',
  yearsAtIntuit: 3.9,
};

export const MOCK_GOALS = [
  {
    id: 1,
    title: 'Launch AI-powered onboarding flow for SMB segment',
    status: 'on_track',
    progress: 72,
    craftPillar: 'product_execution',
    dueDate: '2026-06-30',
    keyResults: [
      { label: 'Reduce time-to-value by 40%', progress: 65 },
      { label: 'Achieve 4.5+ CSAT in onboarding', progress: 80 },
      { label: 'Ship to 100% of new SMB users', progress: 70 },
    ],
  },
  {
    id: 2,
    title: 'Define 3-year platform capability strategy for AI agents',
    status: 'on_track',
    progress: 55,
    craftPillar: 'product_strategy',
    dueDate: '2026-04-15',
    keyResults: [
      { label: 'Complete competitive analysis', progress: 90 },
      { label: 'Get VP alignment on strategy doc', progress: 40 },
      { label: 'Define year 1 execution milestones', progress: 35 },
    ],
  },
  {
    id: 3,
    title: 'Improve cross-team data pipeline reliability to 99.9%',
    status: 'at_risk',
    progress: 38,
    craftPillar: 'technology_fluency',
    dueDate: '2026-05-30',
    keyResults: [
      { label: 'Identify all failure points', progress: 80 },
      { label: 'Implement monitoring dashboards', progress: 30 },
      { label: 'Achieve 99.9% uptime', progress: 5 },
    ],
  },
  {
    id: 4,
    title: 'Mentor 2 junior PMs through first major launch',
    status: 'on_track',
    progress: 60,
    craftPillar: 'org_effectiveness',
    dueDate: '2026-07-31',
    keyResults: [
      { label: 'Establish weekly coaching sessions', progress: 100 },
      { label: 'Support PM1 through beta launch', progress: 45 },
      { label: 'Support PM2 through GA readiness review', progress: 35 },
    ],
  },
];

export const MOCK_FEEDBACK = [
  {
    id: 1,
    from: 'Sarah Kim (Manager)',
    date: '2026-02-15',
    type: 'manager',
    craftPillar: 'product_execution',
    summary: 'Exceptional execution on the SMB onboarding project. Demonstrated strong bias to action and moved from ideation to delivery with minimal friction.',
    sentiment: 'positive',
  },
  {
    id: 2,
    from: 'James Liu (XFN - Engineering)',
    date: '2026-02-01',
    type: 'peer',
    craftPillar: 'technology_fluency',
    summary: 'Great collaboration on defining tech requirements for the AI agent framework. Your understanding of platform constraints was impressive.',
    sentiment: 'positive',
  },
  {
    id: 3,
    from: 'Priya Patel (XFN - Design)',
    date: '2026-01-20',
    type: 'peer',
    craftPillar: 'org_effectiveness',
    summary: 'Your stakeholder communication could improve. Some design decisions were shared late, which impacted our sprint planning.',
    sentiment: 'constructive',
  },
  {
    id: 4,
    from: 'Mark Johnson (Skip-level)',
    date: '2026-01-10',
    type: 'leadership',
    craftPillar: 'product_strategy',
    summary: 'Strong strategic thinking on the 3-year platform vision. Continue to push for more data-backed storytelling when presenting to senior leadership.',
    sentiment: 'positive',
  },
];

export const MOCK_CHECKIN_TOPICS = [
  { priority: 'high', topic: 'SMB onboarding: Discuss beta feedback and plan for GA', source: 'Goal Progress' },
  { priority: 'high', topic: 'Data pipeline reliability at-risk - need resource discussion', source: 'Risk Signal' },
  { priority: 'medium', topic: 'Follow up on Priya\'s feedback about stakeholder communication timing', source: 'Feedback Theme' },
  { priority: 'medium', topic: 'Platform strategy doc: VP alignment meeting prep', source: 'Goal Progress' },
  { priority: 'low', topic: 'Junior PM mentoring progress check', source: 'Development Goal' },
];

export const MOCK_SKILL_ASSESSMENT = {
  product_strategy: { self: 3.5, manager: 3.8, target: 4.0 },
  product_execution: { self: 4.0, manager: 4.2, target: 4.0 },
  technology_fluency: { self: 3.2, manager: 3.0, target: 3.5 },
  org_effectiveness: { self: 3.5, manager: 3.3, target: 4.0 },
};

export const MOCK_PROMO_EVIDENCE = {
  targetLevel: 'senior_staff',
  readinessScore: 68,
  strengths: [
    { pillar: 'Product Execution', evidence: 'Led 3 major launches in FY26 with measurable business impact', score: 85 },
    { pillar: 'Product Strategy', evidence: 'Defined 3-year platform strategy, influenced cross-BU roadmap', score: 72 },
  ],
  gaps: [
    { pillar: 'Organizational Effectiveness', evidence: 'Need more examples of influencing multiple product teams and driving complex strategic decisions', score: 55 },
    { pillar: 'Technology Fluency', evidence: 'Need deeper cross-capability strategy and AI evangelism across portfolio', score: 48 },
  ],
};

export const MOCK_DEV_RECOMMENDATIONS = [
  { type: 'course', title: 'AI Product Strategy Masterclass', provider: 'Degreed', relevance: 'technology_fluency', priority: 'high' },
  { type: 'stretch', title: 'Lead cross-BU architecture review for Q3 planning', relevance: 'org_effectiveness', priority: 'high' },
  { type: 'mentor', title: 'Connect with VP of Platform for strategic storytelling coaching', relevance: 'product_strategy', priority: 'medium' },
  { type: 'course', title: 'Influencing Without Authority', provider: 'Degreed', relevance: 'org_effectiveness', priority: 'medium' },
  { type: 'project', title: 'Volunteer for AI Hackathon judging committee', relevance: 'technology_fluency', priority: 'low' },
];

export const PERFORMANCE_TIMELINE = [
  { month: 'Sep', goals: 3.2, feedback: 3.0, execution: 3.5 },
  { month: 'Oct', goals: 3.4, feedback: 3.2, execution: 3.6 },
  { month: 'Nov', goals: 3.5, feedback: 3.5, execution: 3.7 },
  { month: 'Dec', goals: 3.6, feedback: 3.4, execution: 3.8 },
  { month: 'Jan', goals: 3.7, feedback: 3.6, execution: 4.0 },
  { month: 'Feb', goals: 3.8, feedback: 3.7, execution: 4.1 },
];

import { useState } from 'react'
import { Award, Sparkles, CheckCircle2, AlertCircle, TrendingUp, FileText, ChevronRight, BarChart3, Target, Layers } from 'lucide-react'
import { MOCK_PROMO_EVIDENCE } from '../data/mockData'
import { LEVELS, CRAFT_PILLARS } from '../data/craftSkills'

const EVIDENCE_ITEMS = [
  { type: 'launch', title: 'SMB AI Onboarding Flow - GA Launch', date: 'Jan 2026', impact: 'Reduced time-to-value by 35% for 50K users', pillar: 'Product Execution', strength: 90 },
  { type: 'launch', title: 'Platform Capability Framework v2', date: 'Nov 2025', impact: 'Enabled 3 teams to build on shared AI infrastructure', pillar: 'Technology Fluency', strength: 75 },
  { type: 'strategy', title: '3-Year AI Platform Strategy Document', date: 'Feb 2026', impact: 'VP-approved strategy guiding $10M+ investment', pillar: 'Product Strategy', strength: 82 },
  { type: 'feedback', title: 'Cross-team collaboration recognition', date: 'Ongoing', impact: '5 peer feedback mentions on execution excellence', pillar: 'Product Execution', strength: 88 },
  { type: 'mentoring', title: 'Mentored 2 junior PMs through first launches', date: 'FY26', impact: 'Both mentees promoted to Senior PM', pillar: 'Org Effectiveness', strength: 70 },
]

const RUBRIC_MATCH = [
  { skill: 'Defines roadmaps with cross-team dependencies', demonstrated: true, evidence: 'Platform Strategy Doc, SMB Launch' },
  { skill: 'Drives improvements across processes, tools, AI capabilities', demonstrated: true, evidence: 'Capability Framework v2' },
  { skill: 'Plans overall input goals and delivers business results', demonstrated: true, evidence: 'Q1-Q2 goal attainment at 85%' },
  { skill: 'Evangelizes customer personas to influence alignment', demonstrated: false, evidence: 'Need more cross-BU examples' },
  { skill: 'Sets business outcome objectives tied to product roadmap', demonstrated: false, evidence: 'Need P&L-linked goal examples' },
  { skill: 'Simplifies and accelerates decision-making with AI', demonstrated: 'partial', evidence: 'Some examples, needs more visibility' },
]

export default function PromotionReadiness() {
  const [showNarrative, setShowNarrative] = useState(false)

  const targetLabel = LEVELS.find(l => l.id === MOCK_PROMO_EVIDENCE.targetLevel)?.label || ''
  const demonstrated = RUBRIC_MATCH.filter(r => r.demonstrated === true).length
  const total = RUBRIC_MATCH.length

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Award size={24} className="text-pink-600" /> Promotion Readiness
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          AI-assembled evidence package mapped to craft skills rubric for your next-level promotion case.
        </p>
      </div>

      {/* Readiness Score */}
      <div className="stat-card bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-pink-600 font-semibold uppercase">Readiness for {targetLabel}</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-4xl font-bold text-gray-900">{MOCK_PROMO_EVIDENCE.readinessScore}%</span>
              <span className="text-sm text-gray-500 mb-1">overall readiness</span>
            </div>
            <div className="flex gap-4 mt-2">
              <span className="text-xs text-gray-600">{demonstrated}/{total} rubric skills demonstrated</span>
              <span className="text-xs text-gray-600">{EVIDENCE_ITEMS.length} evidence items collected</span>
            </div>
          </div>
          <div className="w-24 h-24 relative">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#e5e7eb" strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#EC4899" strokeWidth="3"
                strokeDasharray={`${MOCK_PROMO_EVIDENCE.readinessScore}, 100`}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
              {MOCK_PROMO_EVIDENCE.readinessScore}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="stat-card">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" /> Strengths
          </h3>
          <div className="space-y-3">
            {MOCK_PROMO_EVIDENCE.strengths.map((s, i) => (
              <div key={i} className="p-3 rounded-lg bg-emerald-50">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-emerald-900">{s.pillar}</p>
                  <span className="text-xs font-bold text-emerald-700">{s.score}%</span>
                </div>
                <p className="text-xs text-emerald-700">{s.evidence}</p>
                <div className="w-full bg-emerald-100 rounded-full h-1.5 mt-2">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${s.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gaps */}
        <div className="stat-card">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-500" /> Areas to Develop
          </h3>
          <div className="space-y-3">
            {MOCK_PROMO_EVIDENCE.gaps.map((g, i) => (
              <div key={i} className="p-3 rounded-lg bg-amber-50">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-amber-900">{g.pillar}</p>
                  <span className="text-xs font-bold text-amber-700">{g.score}%</span>
                </div>
                <p className="text-xs text-amber-700">{g.evidence}</p>
                <div className="w-full bg-amber-100 rounded-full h-1.5 mt-2">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${g.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Evidence Items */}
      <div className="stat-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">Evidence Portfolio (Auto-Collected)</h3>
          <span className="pill pill-blue"><Sparkles size={11} /> AI Assembled</span>
        </div>
        <div className="space-y-2">
          {EVIDENCE_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                item.type === 'launch' ? 'bg-blue-100' : item.type === 'strategy' ? 'bg-purple-100' : item.type === 'feedback' ? 'bg-emerald-100' : 'bg-amber-100'
              }`}>
                {item.type === 'launch' ? <Target size={16} className="text-intuit-blue" /> :
                 item.type === 'strategy' ? <FileText size={16} className="text-purple-600" /> :
                 item.type === 'feedback' ? <BarChart3 size={16} className="text-emerald-600" /> :
                 <Layers size={16} className="text-amber-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">{item.date} | {item.impact}</p>
              </div>
              <span className="pill pill-blue text-[10px]">{item.pillar}</span>
              <div className="w-12 bg-gray-200 rounded-full h-1.5">
                <div className="bg-pink-500 h-1.5 rounded-full" style={{ width: `${item.strength}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rubric Mapping */}
      <div className="stat-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">Rubric Mapping: {targetLabel}</h3>
          <button
            className="btn-secondary text-xs flex items-center gap-1.5"
            onClick={() => setShowNarrative(!showNarrative)}
          >
            <FileText size={12} /> {showNarrative ? 'Hide' : 'Generate'} Narrative
          </button>
        </div>
        <div className="space-y-2">
          {RUBRIC_MATCH.map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50">
              {r.demonstrated === true ? (
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              ) : r.demonstrated === 'partial' ? (
                <AlertCircle size={16} className="text-amber-500 shrink-0" />
              ) : (
                <AlertCircle size={16} className="text-red-400 shrink-0" />
              )}
              <div className="flex-1">
                <p className="text-sm">{r.skill}</p>
                <p className="text-[11px] text-gray-500">Evidence: {r.evidence}</p>
              </div>
            </div>
          ))}
        </div>

        {showNarrative && (
          <div className="mt-4 p-4 rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-pink-600" />
              <p className="text-xs font-semibold text-pink-700">AI-Generated Promotion Narrative</p>
            </div>
            <div className="text-sm text-gray-800 space-y-2 leading-relaxed">
              <p>
                Alex has demonstrated consistent Senior Staff PM capabilities across Product Execution and Strategy.
                Key highlights include leading the SMB AI Onboarding launch that reduced time-to-value by 35% for 50K users,
                and authoring the VP-approved 3-Year AI Platform Strategy guiding $10M+ in investment decisions.
              </p>
              <p>
                Areas for continued development include expanding cross-BU influence in Organizational Effectiveness
                and deepening AI evangelism across the portfolio for Technology Fluency. Recommended next steps:
                lead a cross-BU architecture review and present at the next PM All-Hands on AI strategy.
              </p>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="btn-primary text-xs">Export Package</button>
              <button className="btn-secondary text-xs">Refine Narrative</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { TrendingUp, Sparkles, BookOpen, Briefcase, Users, Lightbulb, ChevronRight, CheckCircle2, Circle, ArrowRight } from 'lucide-react'
import { MOCK_DEV_RECOMMENDATIONS } from '../data/mockData'

const CAREER_PATHS = [
  { title: 'Senior Staff PM (T5)', timeline: '12-18 months', readiness: 68, focus: ['Org Effectiveness', 'Tech Fluency'] },
  { title: 'Principal PM (T6)', timeline: '24-36 months', readiness: 35, focus: ['Strategic Leadership', 'Cross-BU Influence'] },
  { title: 'Manager 3 (M3)', timeline: '18-24 months', readiness: 42, focus: ['People Management', 'Team Building'] },
]

const MILESTONES = [
  { label: 'Complete AI Strategy Masterclass', due: 'Mar 2026', done: true },
  { label: 'Lead cross-BU architecture review', due: 'Apr 2026', done: false },
  { label: 'Present at PM All-Hands on AI', due: 'May 2026', done: false },
  { label: 'Mentor relationship established with VP', due: 'Mar 2026', done: true },
  { label: 'Ship 2nd major product launch with P&L metrics', due: 'Jun 2026', done: false },
  { label: 'Receive 3+ peer feedback on cross-team influence', due: 'Jul 2026', done: false },
]

const TYPE_ICONS = {
  course: BookOpen,
  stretch: Briefcase,
  mentor: Users,
  project: Lightbulb,
}

const TYPE_COLORS = {
  course: 'bg-blue-100 text-intuit-blue',
  stretch: 'bg-purple-100 text-purple-600',
  mentor: 'bg-emerald-100 text-emerald-600',
  project: 'bg-amber-100 text-amber-600',
}

export default function DevelopmentPlanner() {
  const [selectedPath, setSelectedPath] = useState(0)

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp size={24} className="text-teal-600" /> Development Planner
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          AI-personalized learning paths, stretch opportunities, and career simulations based on your performance data and craft skills gaps.
        </p>
      </div>

      {/* Career Path Simulation */}
      <div className="stat-card">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-teal-600" />
          <h2 className="font-semibold text-sm">Career Path Simulation</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {CAREER_PATHS.map((path, i) => (
            <div
              key={i}
              onClick={() => setSelectedPath(i)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedPath === i ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="font-semibold text-sm">{path.title}</h3>
              <p className="text-xs text-gray-500 mt-1">Est. timeline: {path.timeline}</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${path.readiness}%` }} />
                </div>
                <span className="text-xs font-bold">{path.readiness}%</span>
              </div>
              <div className="mt-2">
                <p className="text-[10px] text-gray-500">Focus areas:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {path.focus.map((f, fi) => (
                    <span key={fi} className="pill pill-blue text-[10px]">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recommendations */}
        <div className="stat-card">
          <h2 className="font-semibold text-sm mb-4">AI Recommendations for {CAREER_PATHS[selectedPath].title}</h2>
          <div className="space-y-3">
            {MOCK_DEV_RECOMMENDATIONS.map((rec, i) => {
              const Icon = TYPE_ICONS[rec.type] || Lightbulb
              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${TYPE_COLORS[rec.type]}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{rec.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-gray-500 capitalize">{rec.type}</span>
                      {rec.provider && <span className="text-[11px] text-gray-400">| {rec.provider}</span>}
                    </div>
                  </div>
                  <span className={`pill ${rec.priority === 'high' ? 'pill-red' : rec.priority === 'medium' ? 'pill-yellow' : 'pill-blue'} text-[10px]`}>
                    {rec.priority}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Milestones */}
        <div className="stat-card">
          <h2 className="font-semibold text-sm mb-4">Development Milestones</h2>
          <div className="space-y-2">
            {MILESTONES.map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50">
                {m.done ? (
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                ) : (
                  <Circle size={16} className="text-gray-300 shrink-0" />
                )}
                <div className="flex-1">
                  <p className={`text-sm ${m.done ? 'text-gray-500 line-through' : ''}`}>{m.label}</p>
                  <p className="text-[11px] text-gray-400">Target: {m.due}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-teal-50 border border-teal-100">
            <div className="flex items-start gap-2">
              <Sparkles size={14} className="text-teal-600 mt-0.5" />
              <p className="text-xs text-teal-800">
                <strong>AI Insight:</strong> You're 2 milestones ahead of the typical trajectory for Senior Staff PM.
                Focus on cross-team influence examples in the next quarter to accelerate your readiness from 68% to ~80%.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Gap Bridge */}
      <div className="stat-card">
        <h2 className="font-semibold text-sm mb-4">Skill Gap Bridge: Current → {CAREER_PATHS[selectedPath].title}</h2>
        <div className="space-y-3">
          {[
            { skill: 'Org Effectiveness', current: 3.5, target: 4.2, gap: 'Cross-team strategic influence' },
            { skill: 'Technology Fluency', current: 3.2, target: 4.0, gap: 'AI evangelism and portfolio-level tech decisions' },
            { skill: 'Product Strategy', current: 3.5, target: 4.0, gap: 'Business outcome objectives tied to P&L' },
            { skill: 'Product Execution', current: 4.0, target: 4.2, gap: 'Minor - continue current trajectory' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-36 text-sm font-medium">{s.skill}</div>
              <div className="flex-1 relative">
                <div className="bg-gray-100 rounded-full h-3">
                  <div className="bg-teal-400 h-3 rounded-full relative" style={{ width: `${(s.current / 5) * 100}%` }}>
                    <span className="absolute right-1 top-0 text-[9px] font-bold text-white leading-3">{s.current}</span>
                  </div>
                </div>
                <div
                  className="absolute top-0 h-3 border-r-2 border-dashed border-pink-400"
                  style={{ left: `${(s.target / 5) * 100}%` }}
                />
              </div>
              <div className="w-10 text-xs text-gray-500 text-right">{s.target}</div>
              <ArrowRight size={12} className="text-gray-400" />
              <div className="w-56 text-xs text-gray-500">{s.gap}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

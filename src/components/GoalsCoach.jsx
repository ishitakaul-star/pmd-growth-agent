import { useState } from 'react'
import { Target, Sparkles, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, Plus, Lightbulb, Link2 } from 'lucide-react'
import { MOCK_GOALS } from '../data/mockData'
import { CRAFT_PILLARS } from '../data/craftSkills'

const PILLAR_LABELS = Object.fromEntries(CRAFT_PILLARS.map(p => [p.id, p.name]))

function GoalCard({ goal, expanded, onToggle }) {
  return (
    <div className="stat-card">
      <div className="flex items-start gap-3 cursor-pointer" onClick={onToggle}>
        {goal.status === 'on_track' ? (
          <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
        ) : (
          <AlertTriangle size={18} className="text-amber-500 mt-0.5 shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">{goal.title}</h3>
            {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="pill pill-blue"><Link2 size={10} /> {PILLAR_LABELS[goal.craftPillar]}</span>
            <span className="text-xs text-gray-500">Due {goal.dueDate}</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex-1 bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${goal.status === 'at_risk' ? 'bg-amber-500' : 'bg-intuit-blue'}`}
                style={{ width: `${goal.progress}%` }}
              />
            </div>
            <span className="text-xs font-medium tabular-nums">{goal.progress}%</span>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Key Results</h4>
          <div className="space-y-2.5">
            {goal.keyResults.map((kr, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-xs text-gray-700">{kr.label}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div className="bg-intuit-blue/70 h-1.5 rounded-full" style={{ width: `${kr.progress}%` }} />
                    </div>
                    <span className="text-[11px] text-gray-500 tabular-nums">{kr.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-100">
            <div className="flex items-start gap-2">
              <Sparkles size={14} className="text-intuit-blue mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-intuit-blue">AI Coach Insight</p>
                <p className="text-xs text-blue-800 mt-1">
                  {goal.status === 'at_risk'
                    ? 'This goal is at risk. Consider breaking it into smaller milestones and requesting additional engineering support. Your manager check-in agenda has been updated to include this topic.'
                    : 'Good progress! Consider adding quantitative impact metrics to strengthen alignment with your craft skills at the Staff PM level.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function GoalsCoach() {
  const [expanded, setExpanded] = useState(null)
  const [showDraft, setShowDraft] = useState(false)
  const [draftGoal, setDraftGoal] = useState('')
  const [aiSuggestion, setAiSuggestion] = useState('')

  const handleDraft = () => {
    if (!draftGoal.trim()) return
    setAiSuggestion('')
    const suggestion = `Based on your role as Staff PM (T4) and current craft skills gaps in Technology Fluency, here's a refined goal:

**"Establish AI agent capability framework and lead cross-team adoption, achieving 3+ production deployments by Q4 FY26"**

Aligned Craft Skills:
• Technology Fluency: "Partners with engineering to define technology approaches with AI-first mindset"
• Product Strategy: "Defines product strategy for offering/capability to drive business growth"

Suggested Key Results:
1. Complete capability framework documentation by April 15
2. Successfully deploy 3 AI agents to production by July 31
3. Achieve 90%+ stakeholder satisfaction score on framework usability

This goal directly addresses your promotion gap in Technology Fluency while leveraging your strength in Product Execution.`

    let i = 0
    const interval = setInterval(() => {
      setAiSuggestion(suggestion.slice(0, i))
      i += 3
      if (i > suggestion.length) {
        setAiSuggestion(suggestion)
        clearInterval(interval)
      }
    }, 10)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Target size={24} className="text-intuit-blue" /> Goals Coach
        </h1>
        <p className="text-gray-500 text-sm mt-1">AI-powered goal creation, alignment, and progress tracking tied to your craft skills and business outcomes.</p>
      </div>

      {/* AI Goal Drafting */}
      <div className="stat-card">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-intuit-blue" />
          <h2 className="font-semibold text-sm">Draft a New Goal with AI</h2>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Describe what you want to accomplish (e.g., 'improve platform reliability' or 'lead AI strategy for my domain')..."
            className="input-field flex-1"
            value={draftGoal}
            onChange={e => setDraftGoal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleDraft()}
          />
          <button className="btn-primary flex items-center gap-1.5" onClick={handleDraft}>
            <Sparkles size={14} /> Generate
          </button>
        </div>

        {aiSuggestion && (
          <div className="mt-4 p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb size={14} className="text-intuit-blue" />
              <p className="text-xs font-semibold text-intuit-blue">AI-Generated Goal Recommendation</p>
            </div>
            <div className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">{aiSuggestion}</div>
            <div className="flex gap-2 mt-4">
              <button className="btn-primary text-xs">Accept & Add Goal</button>
              <button className="btn-secondary text-xs">Refine Further</button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-500">Quick suggestions:</span>
        {[
          'Improve cross-team collaboration on AI initiatives',
          'Drive adoption of platform capabilities',
          'Strengthen data-driven decision making',
        ].map((s, i) => (
          <button
            key={i}
            onClick={() => { setDraftGoal(s); }}
            className="pill pill-blue cursor-pointer hover:bg-blue-100 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Active Goals */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm">Active Goals ({MOCK_GOALS.length})</h2>
          <button className="btn-secondary flex items-center gap-1.5 text-xs">
            <Plus size={14} /> Add Goal
          </button>
        </div>
        <div className="space-y-3">
          {MOCK_GOALS.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              expanded={expanded === goal.id}
              onToggle={() => setExpanded(expanded === goal.id ? null : goal.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

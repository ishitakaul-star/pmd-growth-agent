import { useState } from 'react'
import { MessageSquare, Sparkles, Send, AlertCircle, ThumbsUp, TrendingUp, User, Users, Shield } from 'lucide-react'
import { MOCK_FEEDBACK } from '../data/mockData'

const FEEDBACK_THEMES = [
  { theme: 'Execution Excellence', count: 5, trend: 'up', pillar: 'Product Execution' },
  { theme: 'Technical Collaboration', count: 3, trend: 'up', pillar: 'Technology Fluency' },
  { theme: 'Stakeholder Communication', count: 2, trend: 'flat', pillar: 'Org Effectiveness' },
  { theme: 'Strategic Thinking', count: 2, trend: 'up', pillar: 'Product Strategy' },
]

export default function FeedbackCoach() {
  const [feedbackInput, setFeedbackInput] = useState('')
  const [aiDraft, setAiDraft] = useState('')
  const [tab, setTab] = useState('received')
  const [biasCheck, setBiasCheck] = useState(null)

  const handleDraft = () => {
    if (!feedbackInput.trim()) return
    const draft = `**Using SBI Model (Situation-Behavior-Impact):**

**Situation:** During the Q3 sprint planning session last Tuesday...

**Behavior:** You proactively identified the dependency between the AI agent framework and the onboarding flow, created a detailed technical spec, and facilitated an alignment meeting with both engineering teams within 24 hours.

**Impact:** This prevented a potential 2-week delay in the sprint timeline and ensured both teams could work in parallel. The cross-team collaboration you drove directly contributed to hitting our milestone on time.

**Craft Skill Alignment:** This demonstrates strong *Product Execution* at the Staff PM level - specifically "Facilitates cross functional team using AI as an accelerant to deliver innovative solutions."

**Suggested action:** Continue identifying cross-team dependencies early; consider documenting your dependency-mapping approach as a playbook for the broader PM team.`

    let i = 0
    const interval = setInterval(() => {
      setAiDraft(draft.slice(0, i))
      i += 4
      if (i > draft.length) {
        setAiDraft(draft)
        clearInterval(interval)
      }
    }, 10)
  }

  const checkBias = () => {
    setBiasCheck({
      status: 'clean',
      checks: [
        { label: 'Gender-neutral language', pass: true },
        { label: 'Specific evidence cited', pass: true },
        { label: 'Actionable improvement suggested', pass: true },
        { label: 'Avoids subjective descriptors', pass: true },
      ]
    })
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare size={24} className="text-emerald-600" /> Feedback Coach
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          AI-powered feedback drafting using SBI model, bias detection, and thematic analysis tied to craft skills.
        </p>
      </div>

      {/* Compose Feedback */}
      <div className="stat-card">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-emerald-600" />
          <h2 className="font-semibold text-sm">Draft Feedback with AI</h2>
        </div>
        <textarea
          className="input-field h-24 resize-none"
          placeholder="Describe what happened and who it's for (e.g., 'James helped unblock the API dependency issue during sprint planning')..."
          value={feedbackInput}
          onChange={e => setFeedbackInput(e.target.value)}
        />
        <div className="flex gap-2 mt-3">
          <button className="btn-primary flex items-center gap-1.5" onClick={handleDraft}>
            <Sparkles size={14} /> Draft with SBI Model
          </button>
          <button className="btn-secondary flex items-center gap-1.5" onClick={checkBias}>
            <Shield size={14} /> Check for Bias
          </button>
        </div>

        {biasCheck && (
          <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
            <p className="text-xs font-semibold text-emerald-700 mb-2">Language Audit Complete</p>
            <div className="grid grid-cols-2 gap-2">
              {biasCheck.checks.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-emerald-700">
                  <ThumbsUp size={12} /> {c.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {aiDraft && (
          <div className="mt-4 p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-100">
            <p className="text-xs font-semibold text-emerald-700 mb-2">AI-Generated Feedback Draft</p>
            <div className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">{aiDraft}</div>
            <div className="flex gap-2 mt-4">
              <button className="btn-primary text-xs flex items-center gap-1.5">
                <Send size={12} /> Send Feedback
              </button>
              <button className="btn-secondary text-xs">Refine</button>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5 w-fit">
        {['received', 'themes'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
              tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t === 'received' ? 'Received Feedback' : 'Thematic Analysis'}
          </button>
        ))}
      </div>

      {tab === 'received' && (
        <div className="space-y-3">
          {MOCK_FEEDBACK.map(fb => (
            <div key={fb.id} className="stat-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${
                    fb.type === 'manager' ? 'bg-intuit-blue' : fb.type === 'peer' ? 'bg-emerald-500' : 'bg-purple-500'
                  }`}>
                    {fb.type === 'manager' ? <User size={14} /> : <Users size={14} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{fb.from}</p>
                    <p className="text-[11px] text-gray-500">{fb.date}</p>
                  </div>
                </div>
                <span className={`pill ${fb.sentiment === 'positive' ? 'pill-green' : 'pill-purple'}`}>
                  {fb.sentiment}
                </span>
              </div>
              <p className="text-sm text-gray-700">{fb.summary}</p>
              <div className="mt-2">
                <span className="pill pill-blue text-[10px]">{fb.craftPillar.replace('_', ' ')}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'themes' && (
        <div className="stat-card">
          <h3 className="font-semibold text-sm mb-4">Feedback Themes (AI Analysis)</h3>
          <div className="space-y-3">
            {FEEDBACK_THEMES.map((t, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                <div className="flex-1">
                  <p className="text-sm font-medium">{t.theme}</p>
                  <p className="text-xs text-gray-500">{t.pillar} | {t.count} mentions</p>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={14} className={t.trend === 'up' ? 'text-emerald-500' : 'text-gray-400'} />
                  <span className="text-xs text-gray-500">{t.trend === 'up' ? 'Improving' : 'Stable'}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-100">
            <div className="flex items-start gap-2">
              <Sparkles size={14} className="text-intuit-blue mt-0.5" />
              <p className="text-xs text-blue-800">
                <strong>AI Summary:</strong> Your strongest feedback theme is execution excellence - peers consistently highlight your ability to unblock teams.
                The area for growth is stakeholder communication timing - 2 data points suggest sharing design decisions earlier in the process.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

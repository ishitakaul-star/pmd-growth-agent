import { Target, MessageSquare, Calendar, TrendingUp, AlertTriangle, CheckCircle2, Clock, Zap, Users, BarChart3, Award, Star } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { MOCK_GOALS, MOCK_FEEDBACK, MOCK_SKILL_ASSESSMENT, PERFORMANCE_TIMELINE, CURRENT_USER } from '../data/mockData'
import { AGENTS } from '../data/craftSkills'
import { Link } from 'react-router-dom'

const ICON_MAP = { Target, MessageSquare, Calendar, BarChart3, Award, TrendingUp, Star }

const radarData = [
  { skill: 'Product Strategy', self: 3.5, manager: 3.8, target: 4.0 },
  { skill: 'Product Execution', self: 4.0, manager: 4.2, target: 4.0 },
  { skill: 'Tech Fluency', self: 3.2, manager: 3.0, target: 3.5 },
  { skill: 'Org Effectiveness', self: 3.5, manager: 3.3, target: 4.0 },
]

function StatusIcon({ status }) {
  if (status === 'on_track') return <CheckCircle2 size={16} className="text-emerald-500" />
  if (status === 'at_risk') return <AlertTriangle size={16} className="text-amber-500" />
  return <Clock size={16} className="text-gray-400" />
}

export default function Dashboard({ persona }) {
  const onTrack = MOCK_GOALS.filter(g => g.status === 'on_track').length
  const atRisk = MOCK_GOALS.filter(g => g.status === 'at_risk').length

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {persona === 'employee' ? 'My Performance Dashboard' : 'Team Performance Dashboard'}
          </h1>
          <p className="text-gray-500 mt-1">
            {persona === 'employee'
              ? `Welcome back, ${CURRENT_USER.name}. Here's your performance snapshot.`
              : 'AI-powered insights across your team\'s performance and growth.'}
          </p>
        </div>
        <div className="pill pill-blue">
          <Zap size={12} /> AI Agent Active
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Target size={20} className="text-intuit-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold">{MOCK_GOALS.length}</p>
              <p className="text-xs text-gray-500">Active Goals</p>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="pill pill-green"><CheckCircle2 size={11} /> {onTrack} on track</span>
            <span className="pill pill-yellow"><AlertTriangle size={11} /> {atRisk} at risk</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <MessageSquare size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{MOCK_FEEDBACK.length}</p>
              <p className="text-xs text-gray-500">Feedback Received</p>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="pill pill-green">{MOCK_FEEDBACK.filter(f => f.sentiment === 'positive').length} positive</span>
            <span className="pill pill-purple">{MOCK_FEEDBACK.filter(f => f.sentiment === 'constructive').length} constructive</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Award size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">68%</p>
              <p className="text-xs text-gray-500">Promo Readiness</p>
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '68%' }} />
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Calendar size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-gray-500">Days to Next 1:1</p>
            </div>
          </div>
          <Link to="/checkin" className="text-xs text-intuit-blue font-medium hover:underline mt-2 block">
            View prep agenda →
          </Link>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        <div className="stat-card">
          <h3 className="font-semibold text-sm mb-4">Craft Skills Radar</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid strokeDasharray="3 3" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 10 }} />
              <Radar name="Self" dataKey="self" stroke="#0077C5" fill="#0077C5" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Manager" dataKey="manager" stroke="#2CA01C" fill="#2CA01C" fillOpacity={0.1} strokeWidth={2} />
              <Radar name="Target" dataKey="target" stroke="#FF6B35" fill="none" strokeWidth={2} strokeDasharray="5 5" />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-0.5 bg-intuit-blue inline-block" /> Self</span>
            <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-0.5 bg-intuit-green inline-block" /> Manager</span>
            <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-0.5 bg-intuit-warm inline-block border-dashed" /> Target</span>
          </div>
        </div>

        <div className="stat-card">
          <h3 className="font-semibold text-sm mb-4">Performance Trend (6 months)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={PERFORMANCE_TIMELINE}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[2.5, 4.5]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="goals" stroke="#0077C5" strokeWidth={2} name="Goals" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="feedback" stroke="#2CA01C" strokeWidth={2} name="Feedback" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="execution" stroke="#6C5CE7" strokeWidth={2} name="Execution" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-0.5 bg-intuit-blue inline-block" /> Goals</span>
            <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-0.5 bg-emerald-500 inline-block" /> Feedback</span>
            <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-0.5 bg-purple-500 inline-block" /> Execution</span>
          </div>
        </div>
      </div>

      {/* Goals + Feedback */}
      <div className="grid grid-cols-2 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Active Goals</h3>
            <Link to="/goals" className="text-xs text-intuit-blue font-medium hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {MOCK_GOALS.map(goal => (
              <div key={goal.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <StatusIcon status={goal.status} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{goal.title}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${goal.status === 'at_risk' ? 'bg-amber-500' : 'bg-intuit-blue'}`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 tabular-nums">{goal.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Recent Feedback</h3>
            <Link to="/feedback" className="text-xs text-intuit-blue font-medium hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {MOCK_FEEDBACK.map(fb => (
              <div key={fb.id} className="p-3 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-gray-900">{fb.from}</p>
                  <span className={`pill ${fb.sentiment === 'positive' ? 'pill-green' : 'pill-purple'}`}>
                    {fb.sentiment}
                  </span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{fb.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Agents */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Your AI Agents</h3>
        <div className="grid grid-cols-4 gap-3">
          {AGENTS.slice(0, 4).map(agent => {
            const Icon = ICON_MAP[agent.icon] || Target
            return (
              <div key={agent.id} className="agent-card flex items-start gap-3 cursor-pointer">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${agent.color}15` }}>
                  <Icon size={18} style={{ color: agent.color }} />
                </div>
                <div>
                  <p className="text-sm font-medium">{agent.name}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{agent.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

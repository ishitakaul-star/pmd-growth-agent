import { useState } from 'react'
import { Calendar, Sparkles, AlertTriangle, CheckCircle2, Clock, MessageSquare, Target, TrendingUp, Lightbulb, ChevronRight } from 'lucide-react'
import { MOCK_CHECKIN_TOPICS, CURRENT_USER } from '../data/mockData'

const COACHING_PROMPTS = [
  'What support do you need to get the data pipeline goal back on track?',
  'How can we better align your platform strategy work with the VP\'s priorities?',
  'What feedback from Priya resonated with you, and what would you do differently?',
  'Are you getting enough time for deep work vs. meetings?',
]

const FOLLOW_UPS = [
  { action: 'Share revised timeline for data pipeline reliability', owner: 'Alex', due: 'Mar 10', done: false },
  { action: 'Set up 30min with Priya to discuss communication cadence', owner: 'Alex', due: 'Mar 7', done: false },
  { action: 'Review and comment on platform strategy draft', owner: 'Sarah (Manager)', due: 'Mar 12', done: false },
]

export default function CheckInPrep() {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const priorityColor = {
    high: 'border-l-red-400 bg-red-50/50',
    medium: 'border-l-amber-400 bg-amber-50/30',
    low: 'border-l-blue-400 bg-blue-50/30',
  }
  const priorityLabel = {
    high: 'pill-red',
    medium: 'pill-yellow',
    low: 'pill-blue',
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Calendar size={24} className="text-purple-600" /> 1:1 Prep Assistant
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          AI-generated agenda and coaching prompts for your next check-in, powered by goal progress, feedback themes, and risk signals.
        </p>
      </div>

      {/* Next Meeting Card */}
      <div className="stat-card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-purple-600 font-semibold uppercase">Next 1:1 with {CURRENT_USER.manager}</p>
            <p className="text-lg font-bold mt-1">Thursday, March 7 at 2:00 PM</p>
            <p className="text-xs text-gray-500 mt-1">30 minutes | Recurring weekly</p>
          </div>
          <div className="text-right">
            <div className="pill pill-purple"><Clock size={11} /> In 3 days</div>
            <p className="text-xs text-gray-500 mt-2">Agenda auto-generated</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Agenda Topics */}
        <div className="col-span-2 space-y-4">
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-purple-600" />
              <h2 className="font-semibold text-sm">AI-Generated Agenda</h2>
            </div>
            <div className="space-y-2">
              {MOCK_CHECKIN_TOPICS.map((topic, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-sm ${priorityColor[topic.priority]} ${
                    selectedTopic === i ? 'ring-2 ring-purple-300' : ''
                  }`}
                  onClick={() => setSelectedTopic(selectedTopic === i ? null : i)}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{topic.topic}</p>
                    <ChevronRight size={14} className={`text-gray-400 transition-transform ${selectedTopic === i ? 'rotate-90' : ''}`} />
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`pill ${priorityLabel[topic.priority]}`}>{topic.priority}</span>
                    <span className="text-[11px] text-gray-500">Source: {topic.source}</span>
                  </div>
                  {selectedTopic === i && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600">
                        <strong>Context:</strong> {topic.priority === 'high'
                          ? 'This topic was flagged based on real-time goal tracking and risk signals. The agent detected a pattern that requires manager attention.'
                          : 'This topic was identified from recent feedback patterns and goal progress data.'}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        <strong>Data Sources:</strong> Goal tracker, Feedback log, Sprint velocity (simulated)
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Follow-ups */}
          <div className="stat-card">
            <h2 className="font-semibold text-sm mb-3">Outstanding Action Items</h2>
            <div className="space-y-2">
              {FOLLOW_UPS.map((fu, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50">
                  <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  <div className="flex-1">
                    <p className="text-sm">{fu.action}</p>
                    <p className="text-[11px] text-gray-500">Owner: {fu.owner} | Due: {fu.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coaching Sidebar */}
        <div className="space-y-4">
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={16} className="text-amber-500" />
              <h3 className="font-semibold text-sm">Coaching Prompts</h3>
            </div>
            <p className="text-[11px] text-gray-500 mb-3">AI-suggested questions to guide a productive conversation:</p>
            <div className="space-y-2.5">
              {COACHING_PROMPTS.map((prompt, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-amber-50 border border-amber-100">
                  <p className="text-xs text-amber-900">"{prompt}"</p>
                </div>
              ))}
            </div>
          </div>

          <div className="stat-card">
            <h3 className="font-semibold text-sm mb-3">Performance Signals</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>3 goals on track</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <AlertTriangle size={14} className="text-amber-500" />
                <span>1 goal at risk (data pipeline)</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <TrendingUp size={14} className="text-intuit-blue" />
                <span>Feedback sentiment improving</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <MessageSquare size={14} className="text-purple-500" />
                <span>1 constructive feedback to discuss</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-purple-50 border border-purple-100">
            <p className="text-xs text-purple-800">
              <strong>Explainability:</strong> This agenda was generated from 4 goal updates, 4 feedback items, and simulated sprint/calendar data.
              All recommendations are advisory - final discussion topics are up to you and your manager.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

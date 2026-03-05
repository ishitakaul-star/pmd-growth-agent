import { useState } from 'react'
import { Layers, ChevronDown, ChevronUp, CheckCircle2, Circle, Sparkles } from 'lucide-react'
import { CRAFT_PILLARS, LEVELS } from '../data/craftSkills'
import { MOCK_SKILL_ASSESSMENT } from '../data/mockData'

const RATING_LABELS = ['Not Demonstrated', 'Developing', 'Competent', 'Proficient', 'Expert']

export default function CraftSkillsAssessment() {
  const [selectedLevel, setSelectedLevel] = useState('staff')
  const [expandedPillar, setExpandedPillar] = useState('product_strategy')
  const [ratings, setRatings] = useState({})

  const handleRate = (pillarId, skillIndex, rating) => {
    setRatings(prev => ({ ...prev, [`${pillarId}_${skillIndex}`]: rating }))
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Layers size={24} className="text-intuit-warm" /> Craft Skills Assessment
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Self-assess against the PM Craft Skills Rubric. Your ratings inform goal recommendations, promotion readiness, and development plans.
        </p>
      </div>

      {/* Level Selector */}
      <div className="stat-card">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Assessing for level:</label>
          <select
            className="input-field w-auto"
            value={selectedLevel}
            onChange={e => setSelectedLevel(e.target.value)}
          >
            {LEVELS.map(l => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-3">
        {CRAFT_PILLARS.map(pillar => {
          const assessment = MOCK_SKILL_ASSESSMENT[pillar.id]
          const gap = assessment.target - assessment.self
          return (
            <div key={pillar.id} className="stat-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pillar.color }} />
                <p className="text-xs font-semibold">{pillar.name}</p>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold">{assessment.self}</span>
                <span className="text-xs text-gray-500 mb-1">/ 5.0</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">Target: {assessment.target}</span>
                {gap > 0 ? (
                  <span className="pill pill-yellow text-[10px]">Gap: {gap.toFixed(1)}</span>
                ) : (
                  <span className="pill pill-green text-[10px]">At target</span>
                )}
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{ width: `${(assessment.self / 5) * 100}%`, backgroundColor: pillar.color }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Detailed Rubric */}
      <div className="space-y-3">
        {CRAFT_PILLARS.map(pillar => {
          const isExpanded = expandedPillar === pillar.id
          const skills = pillar.levels[selectedLevel] || []
          return (
            <div key={pillar.id} className="stat-card">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedPillar(isExpanded ? null : pillar.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${pillar.color}15` }}>
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: pillar.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{pillar.name}</h3>
                    <p className="text-xs text-gray-500">{pillar.description.slice(0, 80)}...</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{skills.length} skills</span>
                  {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  {skills.map((skill, idx) => {
                    const currentRating = ratings[`${pillar.id}_${idx}`]
                    return (
                      <div key={idx} className="p-3 rounded-lg bg-gray-50">
                        <div className="flex items-start gap-3">
                          {currentRating ? (
                            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                          ) : (
                            <Circle size={16} className="text-gray-300 mt-0.5 shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm text-gray-800">{skill}</p>
                            <div className="flex items-center gap-1 mt-2">
                              {RATING_LABELS.map((label, ri) => (
                                <button
                                  key={ri}
                                  onClick={() => handleRate(pillar.id, idx, ri + 1)}
                                  className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                                    currentRating === ri + 1
                                      ? 'text-white shadow-sm'
                                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                  }`}
                                  style={currentRating === ri + 1 ? { backgroundColor: pillar.color } : {}}
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <div className="flex items-start gap-2">
                      <Sparkles size={14} className="text-intuit-blue mt-0.5" />
                      <p className="text-xs text-blue-800">
                        <strong>AI Insight:</strong> Based on your self-assessment and recent feedback, your strongest area in {pillar.name} is
                        execution velocity. Consider focusing development on cross-team influence to close the gap to Senior Staff PM level.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

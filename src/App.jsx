import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import GoalsCoach from './components/GoalsCoach'
import FeedbackCoach from './components/FeedbackCoach'
import CheckInPrep from './components/CheckInPrep'
import CraftSkillsAssessment from './components/CraftSkillsAssessment'
import PromotionReadiness from './components/PromotionReadiness'
import DevelopmentPlanner from './components/DevelopmentPlanner'
import AgentChat from './components/AgentChat'

export default function App() {
  const [persona, setPersona] = useState('employee')
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar persona={persona} setPersona={setPersona} />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard persona={persona} />} />
          <Route path="/goals" element={<GoalsCoach />} />
          <Route path="/feedback" element={<FeedbackCoach />} />
          <Route path="/checkin" element={<CheckInPrep />} />
          <Route path="/skills" element={<CraftSkillsAssessment />} />
          <Route path="/promotion" element={<PromotionReadiness />} />
          <Route path="/development" element={<DevelopmentPlanner />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <AgentChat open={chatOpen} onToggle={() => setChatOpen(!chatOpen)} persona={persona} />
    </div>
  )
}

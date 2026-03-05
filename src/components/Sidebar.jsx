import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Target, MessageSquare, Calendar, Layers, Award, TrendingUp, Bot, User, Briefcase } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/goals', icon: Target, label: 'Goals Coach' },
  { to: '/feedback', icon: MessageSquare, label: 'Feedback Coach' },
  { to: '/checkin', icon: Calendar, label: '1:1 Prep' },
  { to: '/skills', icon: Layers, label: 'Craft Skills' },
  { to: '/promotion', icon: Award, label: 'Promotion Readiness' },
  { to: '/development', icon: TrendingUp, label: 'Development Plan' },
]

export default function Sidebar({ persona, setPersona }) {
  return (
    <aside className="w-64 bg-intuit-navy text-white flex flex-col h-full shrink-0">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-lg bg-intuit-blue flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight">PM&D Agent</h1>
            <p className="text-[11px] text-blue-300">Performance & Growth</p>
          </div>
        </div>
        <div className="flex bg-white/10 rounded-lg p-0.5">
          <button
            onClick={() => setPersona('employee')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              persona === 'employee' ? 'bg-intuit-blue text-white shadow' : 'text-blue-200 hover:text-white'
            }`}
          >
            <User size={13} /> Employee
          </button>
          <button
            onClick={() => setPersona('manager')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              persona === 'manager' ? 'bg-intuit-blue text-white shadow' : 'text-blue-200 hover:text-white'
            }`}
          >
            <Briefcase size={13} /> Manager
          </button>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-intuit-blue/20 text-white font-medium'
                  : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-intuit-blue/30 flex items-center justify-center text-xs font-bold">
            AC
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Alex Chen</p>
            <p className="text-[11px] text-blue-300">Staff PM (T4)</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

import { useState, useRef, useEffect } from 'react'
import { Bot, X, Send, Sparkles, Minimize2, Maximize2 } from 'lucide-react'

const INITIAL_MESSAGES = {
  employee: [
    {
      role: 'assistant',
      content: "Hi Alex! I'm your PM&D Growth Agent. I can help you with goals, feedback, check-in prep, craft skills assessment, promotion readiness, and development planning. What would you like to work on?",
    },
  ],
  manager: [
    {
      role: 'assistant',
      content: "Welcome! I'm your Manager Assist co-pilot. I can help with team performance synthesis, 1:1 prep, feedback drafting, calibration prep, and risk detection. How can I help?",
    },
  ],
}

const SAMPLE_RESPONSES = {
  goal: `Here's what I can see about your goals:

**4 Active Goals** — 3 on track, 1 at risk.

The **data pipeline reliability goal** is at risk at 38% progress. I'd recommend:
1. Breaking it into smaller milestones
2. Discussing resource needs in your next 1:1
3. Connecting with the platform team for support

I've added this to your 1:1 agenda. Want me to draft a revised timeline?`,

  feedback: `Based on your recent feedback (4 items), here are the key themes:

**Strengths:** Execution velocity and cross-team collaboration are consistently praised.

**Growth area:** Stakeholder communication timing — Priya from Design mentioned decisions being shared late.

I can help you draft a response or create an action plan. What would you prefer?`,

  promo: `Your promotion readiness for **Senior Staff PM (T5)** is at **68%**.

**Strong areas:**
- Product Execution (85%) — 3 major launches
- Product Strategy (72%) — VP-approved strategy doc

**Gaps to close:**
- Org Effectiveness (55%) — Need more cross-team influence examples
- Tech Fluency (48%) — Need AI evangelism across portfolio

I recommend leading the Q3 cross-BU architecture review. Want me to draft a development plan?`,

  default: `I can help with that! Here are some things I can do:

- **Draft goals** aligned to your craft skills
- **Compose feedback** using the SBI model
- **Prepare 1:1 agendas** from your performance data
- **Assess promotion readiness** against the rubric
- **Create development plans** for your career path

What would you like to explore?`,
}

function getResponse(input) {
  const lower = input.toLowerCase()
  if (lower.includes('goal') || lower.includes('objective')) return SAMPLE_RESPONSES.goal
  if (lower.includes('feedback') || lower.includes('review')) return SAMPLE_RESPONSES.feedback
  if (lower.includes('promo') || lower.includes('ready') || lower.includes('next level')) return SAMPLE_RESPONSES.promo
  return SAMPLE_RESPONSES.default
}

export default function AgentChat({ open, onToggle, persona }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES[persona] || INITIAL_MESSAGES.employee)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    setMessages(INITIAL_MESSAGES[persona] || INITIAL_MESSAGES.employee)
  }, [persona])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const response = getResponse(input)
      setTyping(false)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    }, 1200)
  }

  if (!open) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-intuit-blue text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all hover:scale-105 z-50"
      >
        <Bot size={24} />
      </button>
    )
  }

  return (
    <div className={`fixed right-6 bottom-6 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 transition-all ${
      minimized ? 'w-80 h-14' : 'w-96 h-[520px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-intuit-navy rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-intuit-blue flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">PM&D Agent</p>
            <p className="text-blue-300 text-[10px]">
              {persona === 'employee' ? 'Employee Assist' : 'Manager Assist'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setMinimized(!minimized)} className="p-1.5 text-blue-300 hover:text-white transition-colors">
            {minimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
          <button onClick={onToggle} className="p-1.5 text-blue-300 hover:text-white transition-colors">
            <X size={14} />
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-intuit-blue text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }`}>
                  <div className="whitespace-pre-line">{msg.content}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
            {['My goals', 'Feedback themes', 'Promo readiness', 'Help'].map(q => (
              <button
                key={q}
                onClick={() => { setInput(q); }}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask your PM&D Agent..."
                className="input-field flex-1 text-sm"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="w-9 h-9 rounded-lg bg-intuit-blue text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

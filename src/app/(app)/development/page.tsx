"use client";

import { TrendingUp, Sparkles, CheckCircle2, Circle, ArrowRight } from "lucide-react";

const CAREER_PATHS = [
  { title: "Director, Product Management", timeline: "6-12 months", readiness: 95, focus: ["Cross-BU Influence", "Quantified Impact"] },
  { title: "Senior Director", timeline: "24-36 months", readiness: 45, focus: ["P&L Ownership", "Multi-Org Leadership"] },
];

const MILESTONES = [
  { label: "Enterprise Vision V2.0 authored & presented", due: "Feb 2026", done: true },
  { label: "AI Superagency paper published", due: "Feb 2026", done: true },
  { label: "Expanded to own all HR Product Tech", due: "Feb 2026", done: true },
  { label: "Promo Tool with GenAI launched", due: "Mar 2026", done: true },
  { label: "Present at company-wide tech forum", due: "Q2 2026", done: false },
  { label: "Quantified $ impact across all pillars", due: "Q3 2026", done: false },
  { label: "Shape roadmap/strategy outside T4i", due: "Q3 2026", done: false },
  { label: "Publish AI POV externally", due: "Q4 2026", done: false },
];

export default function DevelopmentPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp size={24} className="text-teal-600" /> Development Planner
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          AI-personalized career paths and development milestones based on your craft skills and outcomes.
        </p>
      </div>

      <div className="stat-card">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-teal-600" />
          <h2 className="font-semibold text-sm">Career Path Simulation</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {CAREER_PATHS.map((path, i) => (
            <div key={i} className={`p-4 rounded-lg border-2 ${i === 0 ? "border-teal-500 bg-teal-50" : "border-gray-200"}`}>
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
        <div className="stat-card">
          <h2 className="font-semibold text-sm mb-4">Development Milestones</h2>
          <div className="space-y-2">
            {MILESTONES.map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50">
                {m.done ? <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> : <Circle size={16} className="text-gray-300 shrink-0" />}
                <div className="flex-1">
                  <p className={`text-sm ${m.done ? "text-gray-500 line-through" : ""}`}>{m.label}</p>
                  <p className="text-[11px] text-gray-400">Target: {m.due}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <h2 className="font-semibold text-sm mb-4">Skill Gap Bridge: GPM → Director</h2>
          <div className="space-y-4">
            {[
              { skill: "Product Strategy", current: 4.5, target: 5.0, gap: "Cross-BU adoption of authored strategies" },
              { skill: "Product Execution", current: 4.5, target: 5.0, gap: "Quantified $ impact narratives" },
              { skill: "Tech Fluency", current: 4.2, target: 5.0, gap: "AI thought leadership beyond T4i" },
              { skill: "Org Effectiveness", current: 4.3, target: 5.0, gap: "Cross-BU influence outside T4i" },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{s.skill}</span>
                  <span className="text-xs text-gray-500">{s.current} → {s.target}</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2 mb-1">
                  <div className="bg-teal-400 h-2 rounded-full" style={{ width: `${(s.current / 5) * 100}%` }} />
                </div>
                <p className="text-xs text-gray-500">{s.gap}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-teal-50 border border-teal-100">
            <div className="flex items-start gap-2">
              <Sparkles size={14} className="text-teal-600 mt-0.5" />
              <p className="text-xs text-teal-800">
                <strong>AI Insight:</strong> At 95% readiness, you're in the final stretch. The remaining gaps are all visibility-related — present your work beyond T4i and quantify business impact to close the case.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Award, CheckCircle2, AlertCircle, Sparkles, FileText, Target, Layers } from "lucide-react";

const MILESTONES = [
  { label: "Product Strategy", pct: 97, color: "#365EDC", items: [
    { t: "Enterprise Vision V2.0 authored & presented", done: true },
    { t: "Workforce Transformation / Superagency paper authored", done: true },
    { t: "5 strategic pillars defined, FY26-28 roadmap", done: true },
    { t: "Cross-BU strategy adoption — present beyond T4i", done: false },
  ]},
  { label: "Product Execution", pct: 96, color: "#10B981", items: [
    { t: "7+ concurrent programs (ServiceNow, CK, Avature, Workday, Learning, Expert Hiring)", done: true },
    { t: "Promo Tool launched Mar 2 with GenAI", done: true },
    { t: "DNME Portal: >50% task completion in first week", done: true },
    { t: "CK Avature Mar 30 cutover confirmed", done: true },
    { t: "Quantified $ impact narratives across all pillars", done: false },
  ]},
  { label: "Technology Fluency", pct: 92, color: "#F59E0B", items: [
    { t: "GenAI integration — Promo Tool, RAI + security approval", done: true },
    { t: "ServiceNow Now Assist Dynamic Sensitivity Routing", done: true },
    { t: "AI-Enabled Superagency frameworks (CVI, ACE, Flash Talent)", done: true },
    { t: "Present AI patterns at company-wide tech forum", done: false },
    { t: "Publish AI POV beyond T4i", done: false },
  ]},
  { label: "Org Effectiveness", pct: 93, color: "#FB7185", items: [
    { t: "7 PMs + 2 supporting across 5 domains", done: true },
    { t: "Expanded to own ALL HR Product Tech for T4i", done: true },
    { t: "Cross-functional: ServiceNow, Workday, Avature, Learning, Expert Hiring", done: true },
    { t: "Visible cross-BU influence outside T4i", done: false },
  ]},
];

export default function PromotionPage() {
  const overall = 95;
  const totalDone = MILESTONES.reduce((a, m) => a + m.items.filter((x) => x.done).length, 0);
  const totalItems = MILESTONES.reduce((a, m) => a + m.items.length, 0);
  const totalRemaining = totalItems - totalDone;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Award size={24} className="text-pink-600" /> Promotion Readiness
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Track your promotion readiness across all craft skill pillars — Group PM → Director, Product Management.
        </p>
      </div>

      {/* Readiness Score */}
      <div className="stat-card bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-pink-600 font-semibold uppercase">Readiness for Director, Product Management</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-4xl font-bold text-gray-900">{overall}%</span>
              <span className="text-sm text-gray-500 mb-1">overall readiness</span>
            </div>
            <div className="flex gap-4 mt-2">
              <span className="text-xs text-gray-600">{totalDone}/{totalItems} milestones complete</span>
              <span className="text-xs text-gray-600">{totalRemaining} remaining</span>
            </div>
          </div>
          <div className="w-24 h-24 relative">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EC4899" strokeWidth="3" strokeDasharray={`${overall}, 100`} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">{overall}%</span>
          </div>
        </div>
      </div>

      {/* Pillar Summary */}
      <div className="grid grid-cols-4 gap-3">
        {MILESTONES.map((m, i) => (
          <div key={i} className="stat-card text-center">
            <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: m.color }} />
            <span className="text-2xl font-bold">{m.pct}%</span>
            <p className="text-xs text-gray-500 mt-1">{m.label}</p>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
              <div className="h-1.5 rounded-full" style={{ width: `${m.pct}%`, backgroundColor: m.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Progress Tracker */}
      <div className="stat-card">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-500" /> Progress Tracker
        </h3>
        <div className="flex items-center justify-between mb-4">
          {["Evidence\nBuilt", "Strategy\nAuthored", "Execution\nProven", "Tech\nDemonstrated", "Cross-BU\nInfluence"].map((step, i) => {
            const done = i < 4;
            return (
              <div key={i} className="flex flex-col items-center" style={{ width: "20%" }}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${done ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-500 border-2 border-dashed border-gray-300"}`}>
                  {done ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <span className="text-[10px] text-gray-500 mt-1.5 text-center whitespace-pre-line leading-tight">{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Pillar Cards */}
      {MILESTONES.map((m, i) => {
        const done = m.items.filter((x) => x.done).length;
        const total = m.items.length;
        return (
          <div key={i} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="text-sm font-semibold">{m.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-500">{done}/{total}</span>
                <span className="text-xs font-bold" style={{ color: m.color }}>{m.pct}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
              <div className="h-1.5 rounded-full" style={{ width: `${m.pct}%`, backgroundColor: m.color }} />
            </div>
            <div className="space-y-1.5">
              {m.items.map((item, j) => (
                <div key={j} className="flex items-start gap-2">
                  {item.done ? (
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  ) : (
                    <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                  )}
                  <span className={`text-sm ${item.done ? "text-gray-600" : "text-amber-700 font-medium"}`}>{item.t}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* What's Left */}
      <div className="stat-card border-l-4 border-amber-400">
        <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
          <Sparkles size={14} className="text-amber-500" /> To reach 100%
        </h3>
        <div className="space-y-1.5 text-sm text-gray-600">
          <p>1. <strong>Cross-BU visibility</strong> — present Enterprise Vision or Superagency frameworks beyond T4i</p>
          <p>2. <strong>Quantified impact</strong> — build $ and efficiency metrics across all pillars</p>
          <p>3. <strong>AI thought leadership</strong> — present at company-wide tech forum, publish AI POV externally</p>
          <p>4. <strong>Organizational influence</strong> — shape a roadmap or strategy decision outside your org</p>
        </div>
      </div>
    </div>
  );
}

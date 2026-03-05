"use client";

import { useState } from "react";
import { MessageSquare, Sparkles, Send, Shield, ThumbsUp, TrendingUp, User, Users } from "lucide-react";

const FEEDBACK = [
  { id: 1, from: "VP of Technology (Skip-level)", date: "2026-02-20", type: "leadership", pillar: "Product Strategy", summary: "Ishita's Enterprise Vision V2.0 demonstrates exceptional portfolio-level thinking. Strong FY26-28 roadmap.", sentiment: "positive" },
  { id: 2, from: "Tammy Mao-McDonald (Direct)", date: "2026-02-15", type: "peer", pillar: "Org Effectiveness", summary: "Great support on TA platform decisions. Ishita helps navigate cross-org dependencies effectively.", sentiment: "positive" },
  { id: 3, from: "Engineering Lead (XFN)", date: "2026-02-01", type: "peer", pillar: "Technology Fluency", summary: "Strong technical product decisions on the Promo Tool GenAI integration. Navigated RAI approvals smoothly.", sentiment: "positive" },
  { id: 4, from: "Peer GPM (XFN)", date: "2026-01-15", type: "peer", pillar: "Org Effectiveness", summary: "Would benefit from more visibility into cross-BU roadmap decisions. Some alignment gaps on shared platform priorities.", sentiment: "constructive" },
];

const THEMES = [
  { theme: "Strategic Vision", count: 6, trend: "up", pillar: "Product Strategy" },
  { theme: "Cross-Platform Execution", count: 5, trend: "up", pillar: "Product Execution" },
  { theme: "AI Product Integration", count: 4, trend: "up", pillar: "Technology Fluency" },
  { theme: "Cross-BU Visibility", count: 2, trend: "flat", pillar: "Org Effectiveness" },
];

export default function FeedbackPage() {
  const [tab, setTab] = useState("received");
  const [feedbackInput, setFeedbackInput] = useState("");

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

      <div className="stat-card">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-emerald-600" />
          <h2 className="font-semibold text-sm">Draft Feedback with AI</h2>
        </div>
        <textarea
          className="input-field h-24 resize-none"
          placeholder="Describe what happened and who it's for..."
          value={feedbackInput}
          onChange={(e) => setFeedbackInput(e.target.value)}
        />
        <div className="flex gap-2 mt-3">
          <button className="btn-primary flex items-center gap-1.5">
            <Sparkles size={14} /> Draft with SBI Model
          </button>
          <button className="btn-secondary flex items-center gap-1.5">
            <Shield size={14} /> Check for Bias
          </button>
        </div>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5 w-fit">
        {["received", "themes"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
              tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "received" ? "Received Feedback" : "Thematic Analysis"}
          </button>
        ))}
      </div>

      {tab === "received" && (
        <div className="space-y-3">
          {FEEDBACK.map((fb) => (
            <div key={fb.id} className="stat-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${
                    fb.type === "leadership" ? "bg-purple-500" : "bg-emerald-500"
                  }`}>
                    {fb.type === "leadership" ? <User size={14} /> : <Users size={14} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{fb.from}</p>
                    <p className="text-[11px] text-gray-500">{fb.date}</p>
                  </div>
                </div>
                <span className={`pill ${fb.sentiment === "positive" ? "pill-green" : "pill-purple"}`}>
                  {fb.sentiment}
                </span>
              </div>
              <p className="text-sm text-gray-700">{fb.summary}</p>
              <div className="mt-2">
                <span className="pill pill-blue text-[10px]">{fb.pillar}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "themes" && (
        <div className="stat-card">
          <h3 className="font-semibold text-sm mb-4">Feedback Themes (AI Analysis)</h3>
          <div className="space-y-3">
            {THEMES.map((t, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                <div className="flex-1">
                  <p className="text-sm font-medium">{t.theme}</p>
                  <p className="text-xs text-gray-500">{t.pillar} | {t.count} mentions</p>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={14} className={t.trend === "up" ? "text-emerald-500" : "text-gray-400"} />
                  <span className="text-xs text-gray-500">{t.trend === "up" ? "Improving" : "Stable"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

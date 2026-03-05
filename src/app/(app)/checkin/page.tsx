"use client";

import { useState } from "react";
import { Calendar, Sparkles, AlertTriangle, CheckCircle2, Clock, MessageSquare, TrendingUp, Lightbulb, ChevronRight } from "lucide-react";

const TOPICS = [
  { priority: "high", topic: "ServiceNow HRSD R1 at YELLOW — resource gap, Jun 8 go-live", source: "Risk Signal" },
  { priority: "high", topic: "TPEP executive decision needed — blocking Pavel + Umang", source: "Risk Signal" },
  { priority: "medium", topic: "Docebo renewal due 3/16 — pricing + budget unresolved", source: "Team Update" },
  { priority: "medium", topic: "CK Avature Mar 30 cutover status check", source: "Goal Progress" },
  { priority: "low", topic: "Promo Tool launch follow-up — GenAI adoption metrics", source: "Outcome Tracking" },
];

const COACHING_PROMPTS = [
  "What support does Sylesh need to get HRSD R1 back to green?",
  "How can we accelerate the TPEP executive decision?",
  "What's the fallback plan if Docebo renewal doesn't close by 3/16?",
  "Are there any risks to the Mar 30 CK cutover we haven't surfaced?",
];

export default function CheckInPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const priorityColor: Record<string, string> = {
    high: "border-l-red-400 bg-red-50/50",
    medium: "border-l-amber-400 bg-amber-50/30",
    low: "border-l-blue-400 bg-blue-50/30",
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Calendar size={24} className="text-purple-600" /> 1:1 Prep Assistant
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          AI-generated agenda and coaching prompts for your next check-in.
        </p>
      </div>

      <div className="stat-card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-purple-600 font-semibold uppercase">Next Leadership Sync</p>
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
        <div className="col-span-2 space-y-4">
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-purple-600" />
              <h2 className="font-semibold text-sm">AI-Generated Agenda</h2>
            </div>
            <div className="space-y-2">
              {TOPICS.map((topic, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-sm ${priorityColor[topic.priority]} ${
                    selectedTopic === i ? "ring-2 ring-purple-300" : ""
                  }`}
                  onClick={() => setSelectedTopic(selectedTopic === i ? null : i)}
                >
                  <p className="text-sm font-medium">{topic.topic}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`pill ${topic.priority === "high" ? "pill-red" : topic.priority === "medium" ? "pill-yellow" : "pill-blue"}`}>
                      {topic.priority}
                    </span>
                    <span className="text-[11px] text-gray-500">Source: {topic.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={16} className="text-amber-500" />
              <h3 className="font-semibold text-sm">Coaching Prompts</h3>
            </div>
            <div className="space-y-2.5">
              {COACHING_PROMPTS.map((prompt, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-amber-50 border border-amber-100">
                  <p className="text-xs text-amber-900">&ldquo;{prompt}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>

          <div className="stat-card">
            <h3 className="font-semibold text-sm mb-3">Team Signals</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>3 goals on track</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <AlertTriangle size={14} className="text-amber-500" />
                <span>4 high-severity risks active</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <TrendingUp size={14} className="text-intuit-blue" />
                <span>2 promos in pipeline</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

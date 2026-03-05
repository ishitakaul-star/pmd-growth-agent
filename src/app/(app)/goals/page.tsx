"use client";

import { useState } from "react";
import {
  Target,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Plus,
  Lightbulb,
} from "lucide-react";

const GOALS = [
  { id: 1, title: "Deliver Enterprise HR Tech Vision & Strategy across all T4i pillars", status: "on_track", progress: 72, pillar: "Product Strategy", dueDate: "2026-06-30" },
  { id: 2, title: "Drive CK Integration to Aug 2026 completion", status: "on_track", progress: 55, pillar: "Product Execution", dueDate: "2026-08-31" },
  { id: 3, title: "Scale ServiceNow HRSD platform (R1 go-live Jun 8)", status: "at_risk", progress: 60, pillar: "Technology Fluency", dueDate: "2026-06-08" },
  { id: 4, title: "Consolidate TA platform on Avature", status: "on_track", progress: 65, pillar: "Product Execution", dueDate: "2026-07-31" },
  { id: 5, title: "Build high-performing PM team (7 direct + 2 supporting)", status: "on_track", progress: 80, pillar: "Org Effectiveness", dueDate: "2026-12-31" },
];

export default function GoalsPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [draftGoal, setDraftGoal] = useState("");

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Target size={24} className="text-intuit-blue" /> Goals Coach
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          AI-powered goal creation, alignment, and progress tracking tied to your craft skills and business outcomes.
        </p>
      </div>

      {/* AI Goal Drafting */}
      <div className="stat-card">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-intuit-blue" />
          <h2 className="font-semibold text-sm">Draft a New Goal with AI</h2>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Describe what you want to accomplish..."
            className="input-field flex-1"
            value={draftGoal}
            onChange={(e) => setDraftGoal(e.target.value)}
          />
          <button className="btn-primary flex items-center gap-1.5">
            <Sparkles size={14} /> Generate
          </button>
        </div>
      </div>

      {/* Active Goals */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm">Active Goals ({GOALS.length})</h2>
          <button className="btn-secondary flex items-center gap-1.5 text-xs">
            <Plus size={14} /> Add Goal
          </button>
        </div>
        <div className="space-y-3">
          {GOALS.map((goal) => (
            <div key={goal.id} className="stat-card">
              <div
                className="flex items-start gap-3 cursor-pointer"
                onClick={() => setExpanded(expanded === goal.id ? null : goal.id)}
              >
                {goal.status === "on_track" ? (
                  <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                ) : (
                  <AlertTriangle size={18} className="text-amber-500 mt-0.5 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">{goal.title}</h3>
                    {expanded === goal.id ? (
                      <ChevronUp size={16} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="pill pill-blue">{goal.pillar}</span>
                    <span className="text-xs text-gray-500">Due {goal.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          goal.status === "at_risk" ? "bg-amber-500" : "bg-intuit-blue"
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium tabular-nums">{goal.progress}%</span>
                  </div>
                </div>
              </div>
              {expanded === goal.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <div className="flex items-start gap-2">
                      <Sparkles size={14} className="text-intuit-blue mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-intuit-blue">AI Coach Insight</p>
                        <p className="text-xs text-blue-800 mt-1">
                          {goal.status === "at_risk"
                            ? "This goal is at risk. Consider breaking it into smaller milestones and requesting additional resources. Your manager check-in agenda has been updated."
                            : "Good progress! Consider adding quantitative impact metrics to strengthen alignment with your craft skills at the Director level."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

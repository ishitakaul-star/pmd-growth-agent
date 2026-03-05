"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Target,
  MessageSquare,
  TrendingUp,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { TeamMemberData, RiskItem } from "@/data/seedData";

interface Props {
  pm: TeamMemberData;
  pmRisks: RiskItem[];
}

export default function PMDeepDiveClient({ pm, pmRisks }: Props) {
  const [activeTab, setActiveTab] = useState<"projects" | "feedback" | "development">("projects");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const ar = (pm.projects || []).filter((p) => p.s === "at-risk" || p.s === "off-track");
  const ot = (pm.projects || []).filter((p) => p.s === "on-track");
  const comp = (pm.projects || []).filter((p) => p.s === "completed");
  const onHold = (pm.projects || []).filter((p) => p.s === "on-hold");
  const health = ar.length > 2 ? "🔴" : ar.length > 0 ? "🟡" : "🟢";
  const healthLabel = ar.length > 2 ? "Needs Attention" : ar.length > 0 ? "Some Risks" : "On Track";

  const statusIcon = (s: string) => {
    switch (s) {
      case "completed": return "✅";
      case "on-track": return "🟢";
      case "at-risk": return "🟡";
      case "off-track": return "🔴";
      case "on-hold": return "⏸️";
      default: return "⚪";
    }
  };

  const topProject = pm.projects?.[0];
  const riskProject = pm.projects?.find((p) => p.s === "at-risk" || p.s === "off-track");
  const onTrackProjects = (pm.projects || []).filter((p) => p.s === "on-track" || p.s === "completed");

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Back Link */}
      <Link
        href="/team"
        className="inline-flex items-center gap-1.5 text-sm text-intuit-blue hover:underline"
      >
        <ArrowLeft size={14} /> Back to Team
      </Link>

      {/* Header */}
      <div className="stat-card">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{health}</span>
              <h1 className="text-xl font-bold">{pm.name}</h1>
            </div>
            <p className="text-sm text-gray-600">
              {pm.role} · {pm.area}
            </p>
            {pm.reportsTo && (
              <p className="text-xs text-intuit-blue mt-0.5">{pm.reportsTo}</p>
            )}
          </div>
          <div className="text-right">
            {pm.recentlyPromoted ? (
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                Recently Promoted
              </span>
            ) : pm.targetLevel ? (
              <span className="inline-block px-3 py-1 bg-blue-100 text-intuit-blue text-xs font-medium rounded-full">
                Target: {pm.targetLevel}
              </span>
            ) : null}
          </div>
        </div>

        {/* Health Stats */}
        <div className="mt-4 grid grid-cols-5 gap-3">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold">{(pm.projects || []).length}</p>
            <p className="text-[10px] text-gray-500">Total</p>
          </div>
          <div className="text-center p-2 bg-emerald-50 rounded-lg">
            <p className="text-lg font-bold text-emerald-600">{ot.length}</p>
            <p className="text-[10px] text-gray-500">On Track</p>
          </div>
          <div className="text-center p-2 bg-amber-50 rounded-lg">
            <p className="text-lg font-bold text-amber-600">{ar.length}</p>
            <p className="text-[10px] text-gray-500">At Risk</p>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <p className="text-lg font-bold text-blue-600">{comp.length}</p>
            <p className="text-[10px] text-gray-500">Completed</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-500">{onHold.length}</p>
            <p className="text-[10px] text-gray-500">On Hold</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {[
          { key: "projects" as const, icon: Target, label: "Projects" },
          { key: "feedback" as const, icon: MessageSquare, label: "Feedback Draft" },
          { key: "development" as const, icon: TrendingUp, label: "Development" },
        ].map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === key
                ? "bg-white text-intuit-blue shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content: Projects */}
      {activeTab === "projects" && (
        <div className="space-y-3">
          {(pm.projects || []).map((p, i) => (
            <div
              key={i}
              className={`stat-card cursor-pointer transition-all ${
                expandedProject === i ? "ring-2 ring-intuit-blue/20" : ""
              }`}
              onClick={() => setExpandedProject(expandedProject === i ? null : i)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5">{statusIcon(p.s)}</span>
                  <div>
                    <p className="text-sm font-semibold">{p.n}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {p.s.replace("-", " ")}
                    </p>
                  </div>
                </div>
                {expandedProject === i ? (
                  <ChevronUp size={14} className="text-gray-400" />
                ) : (
                  <ChevronDown size={14} className="text-gray-400" />
                )}
              </div>
              {expandedProject === i && (
                <div className="mt-3 pl-7">
                  <p className="text-sm text-gray-600 leading-relaxed">{p.d}</p>
                </div>
              )}
            </div>
          ))}

          {/* PM Risks */}
          {(pm.risks || []).length > 0 && (
            <div className="stat-card border-l-4 border-amber-400">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <AlertTriangle size={14} className="text-amber-500" />
                Risks ({(pm.risks || []).length})
              </h3>
              <ul className="space-y-1.5">
                {(pm.risks || []).map((r, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-600 flex items-start gap-2"
                  >
                    <span className="text-amber-500 mt-1">•</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cross-ref: Org-level risks */}
          {pmRisks.length > 0 && (
            <div className="stat-card border-l-4 border-red-400">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <AlertTriangle size={14} className="text-red-500" />
                Org-Level Risks
              </h3>
              {pmRisks.map((r, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-red-50 mb-1.5 last:mb-0">
                  <span className={`text-xs font-bold mt-0.5 ${r.sev === "high" ? "text-red-600" : r.sev === "med" ? "text-amber-600" : "text-gray-500"}`}>
                    {r.sev === "high" ? "HIGH" : r.sev === "med" ? "MED" : "LOW"}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{r.area}</p>
                    <p className="text-xs text-gray-600">{r.d}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Feedback Draft (SBI) */}
      {activeTab === "feedback" && (
        <div className="space-y-4">
          {/* Positive Feedback */}
          <div className="stat-card border-l-4 border-emerald-400">
            <h3 className="font-semibold text-sm mb-3 text-emerald-700 flex items-center gap-2">
              <CheckCircle2 size={14} /> Positive Feedback (SBI)
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-700">Situation</p>
                <p className="text-gray-600">
                  {topProject?.n || "This quarter"} —{" "}
                  {topProject?.d?.slice(0, 100) || "current sprint"}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Behavior</p>
                <p className="text-gray-600">
                  Drove the work forward with ownership —{" "}
                  {onTrackProjects.length} project(s) on-track or shipped.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Impact</p>
                <p className="text-gray-600">
                  Kept critical path on track for the org. Builds confidence in{" "}
                  {pm.name.split(" ")[0]}&apos;s ability to deliver under complexity.
                </p>
              </div>
            </div>
          </div>

          {/* Developmental Feedback */}
          {riskProject ? (
            <div className="stat-card border-l-4 border-amber-400">
              <h3 className="font-semibold text-sm mb-3 text-amber-700 flex items-center gap-2">
                <AlertTriangle size={14} /> Developmental Feedback (SBI)
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-700">Situation</p>
                  <p className="text-gray-600">
                    {riskProject.n} — {riskProject.d?.slice(0, 100)}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Behavior</p>
                  <p className="text-gray-600">
                    Risk surfaced but escalation or mitigation came late.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Impact</p>
                  <p className="text-gray-600">
                    Creates delivery risk for downstream dependencies. Coach on
                    earlier risk signaling and proactive stakeholder communication.
                  </p>
                </div>
              </div>
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-intuit-blue mb-1">
                  Coaching Prompt
                </p>
                <p className="text-sm text-gray-600 italic">
                  &quot;When you see a risk forming, what&apos;s your escalation threshold?
                  Let&apos;s define it together so we catch these earlier.&quot;
                </p>
              </div>
            </div>
          ) : (
            <div className="stat-card border-l-4 border-gray-300">
              <h3 className="font-semibold text-sm mb-2 text-gray-600">
                Developmental Feedback
              </h3>
              <p className="text-sm text-gray-500">
                No at-risk items right now — look for stretch opportunities to
                give constructive feedback on.
              </p>
            </div>
          )}

          {pm.recentlyPromoted && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-sm text-emerald-700 italic">
                Frame all feedback around excelling at {pm.role}, not next promo.
                Celebrate the promotion, reinforce expectations at current level.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Development */}
      {activeTab === "development" && (
        <div className="space-y-4">
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-3">
              <Layers size={16} className="text-purple-600" />
              <h3 className="font-semibold text-sm">
                {pm.recentlyPromoted
                  ? `Excelling at ${pm.role}`
                  : pm.targetLevel
                    ? `${pm.role} → ${pm.targetLevel}`
                    : "Growth Focus"}
              </h3>
            </div>
            {pm.recentlyPromoted && (
              <p className="text-xs text-emerald-600 mb-3">
                Recently promoted — focus on demonstrating consistent performance at
                current level before targeting next promotion.
              </p>
            )}
          </div>

          {pm.dev ? (
            <>
              {[
                { key: "strategy", label: "Product Strategy", color: "blue" },
                { key: "execution", label: "Product Execution", color: "emerald" },
                { key: "techFluency", label: "Technology Fluency", color: "purple" },
                { key: "orgEffectiveness", label: "Org Effectiveness", color: "amber" },
              ].map(({ key, label, color }) => (
                <div key={key} className={`stat-card border-l-4 border-${color}-400`}>
                  <h4 className="font-semibold text-sm mb-2">{label}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {pm.dev![key as keyof typeof pm.dev]}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <div className="stat-card">
              <p className="text-sm text-gray-500">
                Based on {pm.name.split(" ")[0]}&apos;s current portfolio, focus on the
                craft pillar most relevant to their next level.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

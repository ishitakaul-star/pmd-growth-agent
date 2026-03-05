"use client";

import { useState } from "react";
import { Users, AlertTriangle, CheckCircle2, TrendingUp, ChevronRight } from "lucide-react";
import { DEFAULT_TEAM, RISKS } from "@/data/seedData";
import Link from "next/link";

export default function TeamClient() {
  const team = DEFAULT_TEAM;
  const risks = RISKS;
  const atRiskTotal = team.reduce((a, t) => a + (t.projects || []).filter((p) => p.s === "at-risk" || p.s === "off-track").length, 0);
  const totalP = team.reduce((a, t) => a + (t.projects || []).length, 0);
  const highRisks = risks.filter((r) => r.sev === "high");

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users size={24} className="text-intuit-blue" /> Team Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {team.length} PMs · {totalP} active projects · {atRiskTotal} at-risk items
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="text-2xl font-bold">{team.length}</p>
          <p className="text-xs text-gray-500">Direct Reports</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold">{totalP}</p>
          <p className="text-xs text-gray-500">Active Projects</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-amber-600">{atRiskTotal}</p>
          <p className="text-xs text-gray-500">At Risk / Off Track</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-red-600">{highRisks.length}</p>
          <p className="text-xs text-gray-500">High Severity Risks</p>
        </div>
      </div>

      {/* High Risks */}
      {highRisks.length > 0 && (
        <div className="stat-card border-l-4 border-red-400">
          <h3 className="font-semibold text-sm mb-3 text-red-700">🔴 High-Severity Risks</h3>
          <div className="space-y-2">
            {highRisks.map((r, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-red-50">
                <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800">{r.area} — {r.who}</p>
                  <p className="text-xs text-red-600">{r.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Grid */}
      <div className="grid grid-cols-2 gap-4">
        {team.map((t, i) => {
          const ar = (t.projects || []).filter((p) => p.s === "at-risk" || p.s === "off-track");
          const ot = (t.projects || []).filter((p) => p.s === "on-track").length;
          const comp = (t.projects || []).filter((p) => p.s === "completed").length;
          const health = ar.length > 2 ? "🔴" : ar.length > 0 ? "🟡" : "🟢";

          return (
            <div key={i} className="stat-card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span>{health}</span>
                    <h3 className="text-sm font-semibold">{t.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500">{t.role} · {t.area}</p>
                  {t.reportsTo && <p className="text-[11px] text-intuit-blue">{t.reportsTo}</p>}
                </div>
                <div className="text-right">
                  {t.recentlyPromoted ? (
                    <span className="pill pill-green text-[10px]">Recently promoted</span>
                  ) : t.targetLevel ? (
                    <span className="pill pill-blue text-[10px]">→ {t.targetLevel}</span>
                  ) : null}
                </div>
              </div>

              <div className="flex gap-3 text-xs text-gray-500 mb-2">
                <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-500" /> {ot} on-track</span>
                <span className="flex items-center gap-1"><AlertTriangle size={12} className="text-amber-500" /> {ar.length} at-risk</span>
                {comp > 0 && <span>✅ {comp} done</span>}
              </div>

              {ar.length > 0 && (
                <div className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2 mb-2">
                  <strong>Attention:</strong> {ar.map((p) => p.n).join(", ")}
                </div>
              )}

              <div className="flex gap-2 mt-2">
                <Link href={`/team/${encodeURIComponent(t.name.toLowerCase().replace(/\s+/g, "-"))}`} className="text-[11px] text-intuit-blue hover:underline">
                  Deep dive →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Promo Pipeline */}
      <div className="stat-card">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <TrendingUp size={16} className="text-purple-600" /> Promo Pipeline
        </h3>
        <div className="space-y-2">
          {team.filter((t) => !t.recentlyPromoted && t.targetLevel).map((t, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
              <div className="flex-1">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role} → {t.targetLevel}</p>
              </div>
              <ChevronRight size={14} className="text-gray-400" />
            </div>
          ))}
          {team.filter((t) => t.recentlyPromoted).map((t, i) => (
            <div key={`r${i}`} className="flex items-center gap-3 p-2 rounded-lg bg-emerald-50">
              <div className="flex-1">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-emerald-700">Recently promoted — excelling at {t.role}</p>
              </div>
              <CheckCircle2 size={14} className="text-emerald-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

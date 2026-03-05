"use client";

import { useState } from "react";
import { Layers, ChevronDown, ChevronUp, CheckCircle2, Circle, Sparkles } from "lucide-react";

const PILLARS = [
  {
    id: "product_strategy", name: "Product Strategy", color: "#0077C5",
    description: "Applies customer empathy, business acumen, and AI-first product expertise to develop a winning product vision, strategy and roadmap.",
    self: 4.5, target: 5.0,
    skills: [
      "Defines customer segments to prioritize and connects them with marketing and business strategy",
      "Coaches teams on deepening understanding of customer problems with D4D + AI",
      "Influences quarterly and annual business outcomes anchored in market dynamics",
      "Leverages deep domain expertise to fly at multiple altitudes",
    ],
  },
  {
    id: "product_execution", name: "Product Execution", color: "#2CA01C",
    description: "Delivers customer experiences and business outcomes reimagined by AI and delivered through end to end ownership.",
    self: 4.5, target: 5.0,
    skills: [
      "Collaborates with cross-functional leaders on goals and planning for E2E customer experiences",
      "Advocates for improvements in process, AI capabilities, systems beyond their offering",
      "Drives business results for organization and collaborates with leaders on cross-functional goals",
      "Demonstrates leadership in roadmap planning and holding a high bar for data-driven outcomes",
    ],
  },
  {
    id: "technology_fluency", name: "Technology Fluency", color: "#6C5CE7",
    description: "Leverages technical acumen, platform mindset, and AI-first mindset to unlock velocity and innovation.",
    self: 4.2, target: 5.0,
    skills: [
      "Reinforces and contributes to Intuit technology standards and practices",
      "Leverages AI tools, LLMs, AI-augmented prototyping alongside self-serve tooling",
      "Defines capability and AI strategies to accelerate multiple lines of business",
      "Drives an AI-first product strategy across their domain",
    ],
  },
  {
    id: "org_effectiveness", name: "Organizational Effectiveness", color: "#FF6B35",
    description: "Drives product excellence and innovation through data-driven decision making and AI-enhanced collaboration.",
    self: 4.3, target: 5.0,
    skills: [
      "Drives and coaches teams to make timely data-driven decisions",
      "Coaches and inspires team on effective communication, leading by example",
      "Inspires multiple teams through AI prototyped experiences",
      "Develops change strategy on how team/portfolio will adapt to changes",
    ],
  },
];

export default function SkillsPage() {
  const [expandedPillar, setExpandedPillar] = useState("product_strategy");

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Layers size={24} className="text-intuit-warm" /> Craft Skills Assessment
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Self-assess against the PM Craft Skills Rubric for Director-level bar.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-3">
        {PILLARS.map((pillar) => {
          const gap = pillar.target - pillar.self;
          return (
            <div key={pillar.id} className="stat-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pillar.color }} />
                <p className="text-xs font-semibold">{pillar.name}</p>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold">{pillar.self}</span>
                <span className="text-xs text-gray-500 mb-1">/ 5.0</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">Target: {pillar.target}</span>
                {gap > 0 ? (
                  <span className="pill pill-yellow text-[10px]">Gap: {gap.toFixed(1)}</span>
                ) : (
                  <span className="pill pill-green text-[10px]">At target</span>
                )}
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                <div className="h-2 rounded-full transition-all" style={{ width: `${(pillar.self / 5) * 100}%`, backgroundColor: pillar.color }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Rubric */}
      <div className="space-y-3">
        {PILLARS.map((pillar) => {
          const isExpanded = expandedPillar === pillar.id;
          return (
            <div key={pillar.id} className="stat-card">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedPillar(isExpanded ? "" : pillar.id)}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${pillar.color}15` }}>
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: pillar.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{pillar.name}</h3>
                    <p className="text-xs text-gray-500">{pillar.description.slice(0, 80)}...</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{pillar.skills.length} skills</span>
                  {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
              </div>
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  {pillar.skills.map((skill, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-gray-50">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-gray-800">{skill}</p>
                      </div>
                    </div>
                  ))}
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <div className="flex items-start gap-2">
                      <Sparkles size={14} className="text-intuit-blue mt-0.5" />
                      <p className="text-xs text-blue-800">
                        <strong>AI Insight:</strong> Based on your outcomes and strategy papers, your evidence is strong in {pillar.name}. Focus on broadening cross-BU visibility to close the remaining gap.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

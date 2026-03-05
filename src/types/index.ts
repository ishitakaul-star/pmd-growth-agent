import type { DefaultSession } from "next-auth";

// Extend NextAuth session with role
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      profileId?: string;
    } & DefaultSession["user"];
  }
}

export type Role = "manager" | "employee";

export interface Project {
  n: string; // name
  s: string; // status: on-track | at-risk | off-track | completed | on-hold
  d: string; // detail
}

export interface DevRecommendations {
  strategy: string;
  execution: string;
  techFluency: string;
  orgEffectiveness: string;
}

export interface TeamMemberData {
  name: string;
  role: string;
  area: string;
  targetLevel?: string;
  reportsTo?: string;
  recentlyPromoted?: boolean;
  projects: Project[];
  risks: string[];
  dev?: DevRecommendations;
  note?: string;
}

export interface RiskItem {
  sev: "high" | "med" | "low";
  area: string;
  who: string;
  d: string;
}

export interface UserProfileData {
  name: string;
  role: string;
  org: string;
  target: string;
  goals: string[];
  wins: string[];
  strengths: string[];
  areasToGrow: string[];
  craftPillars: string[];
}

import type { Role } from "@/types";

export function isManager(role: string | undefined): boolean {
  return role === "manager";
}

export function isEmployee(role: string | undefined): boolean {
  return role === "employee";
}

export function requireManager(role: string | undefined): void {
  if (role !== "manager") {
    throw new Error("Forbidden: Manager role required");
  }
}

export function requireAuth(userId: string | undefined): void {
  if (!userId) {
    throw new Error("Unauthorized: Sign in required");
  }
}

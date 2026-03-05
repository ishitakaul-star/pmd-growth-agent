import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import TeamClient from "./TeamClient";

export default async function TeamPage() {
  const session = await auth();
  const role = (session?.user as any)?.role || "employee";

  // RBAC: only managers can see the team page
  if (role !== "manager") {
    redirect("/dashboard");
  }

  return <TeamClient />;
}

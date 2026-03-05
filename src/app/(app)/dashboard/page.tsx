import { auth } from "@/lib/auth";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth();
  const role = (session?.user as any)?.role || "employee";

  return <DashboardClient role={role} userName={session?.user?.name || "User"} />;
}

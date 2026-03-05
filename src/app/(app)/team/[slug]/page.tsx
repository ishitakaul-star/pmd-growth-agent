import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DEFAULT_TEAM, RISKS } from "@/data/seedData";
import PMDeepDiveClient from "./PMDeepDiveClient";

interface Props {
  params: { slug: string };
}

export default async function PMDeepDivePage({ params }: Props) {
  const session = await auth();
  const role = (session?.user as any)?.role || "employee";

  if (role !== "manager") {
    redirect("/dashboard");
  }

  // Match slug to team member (slug is lowercase-hyphenated name)
  const slug = params.slug;
  const pm = DEFAULT_TEAM.find(
    (t) => t.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!pm) {
    redirect("/team");
  }

  // Get risks relevant to this PM
  const pmRisks = RISKS.filter(
    (r) => r.who.toLowerCase().includes(pm.name.split(" ")[0].toLowerCase())
  );

  return <PMDeepDiveClient pm={pm} pmRisks={pmRisks} />;
}

// Generate static params for all team members
export function generateStaticParams() {
  return DEFAULT_TEAM.map((t) => ({
    slug: t.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

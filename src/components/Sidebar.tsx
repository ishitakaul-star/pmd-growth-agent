"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Target,
  MessageSquare,
  Calendar,
  Layers,
  Award,
  TrendingUp,
  Bot,
  Users,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/goals", icon: Target, label: "Goals Coach" },
  { href: "/feedback", icon: MessageSquare, label: "Feedback Coach" },
  { href: "/checkin", icon: Calendar, label: "1:1 Prep" },
  { href: "/skills", icon: Layers, label: "Craft Skills" },
  { href: "/promotion", icon: Award, label: "Promotion Readiness" },
  { href: "/development", icon: TrendingUp, label: "Development Plan" },
];

const MANAGER_ITEMS = [
  { href: "/team", icon: Users, label: "My Team" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = (session?.user as any)?.role || "employee";
  const isManager = role === "manager";
  const initials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "??";

  return (
    <aside className="w-64 bg-intuit-navy text-white flex flex-col h-full shrink-0">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-lg bg-intuit-blue flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight">PM&D Agent</h1>
            <p className="text-[11px] text-blue-300">Performance & Growth</p>
          </div>
        </div>
        {isManager && (
          <div className="px-2 py-1 rounded-lg bg-white/10 text-center">
            <span className="text-[11px] font-medium text-blue-200">
              Manager View
            </span>
          </div>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-intuit-blue/20 text-white font-medium"
                  : "text-blue-200 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}

        {isManager && (
          <>
            <div className="my-2 border-t border-white/10" />
            {MANAGER_ITEMS.map(({ href, icon: Icon, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    isActive
                      ? "bg-intuit-blue/20 text-white font-medium"
                      : "text-blue-200 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-intuit-blue/30 flex items-center justify-center text-xs font-bold">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {session?.user?.name || "User"}
            </p>
            <p className="text-[11px] text-blue-300 capitalize">{role}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-blue-300 hover:text-white transition-colors"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

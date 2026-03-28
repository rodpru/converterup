"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  DollarSign,
  Wrench,
  Settings,
} from "lucide-react";
import { Logo } from "@/components/logo";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/conversions", label: "Conversions", icon: ArrowLeftRight },
  { href: "/admin/revenue", label: "Revenue", icon: DollarSign },
  { href: "/admin/tools", label: "Tools", icon: Wrench },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col border-r border-[#2A2535] bg-[#0C0A12] z-40">
        <div className="p-6 flex items-center gap-2.5">
          <Logo className="w-6 h-6" />
          <span className="font-[Syne] font-extrabold text-sm uppercase tracking-tight">
            ConverterUp
          </span>
          <span className="ml-auto px-2 py-0.5 rounded-full bg-[#2DD4BF]/10 text-[#2DD4BF] font-mono text-[10px] uppercase tracking-wider">
            Admin
          </span>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-[#2DD4BF]/5 text-[#2DD4BF]"
                    : "text-[#71717A] hover:text-[#EDEDEF] hover:bg-[#1C1825]"
                }`}
              >
                <link.icon className="w-[18px] h-[18px] stroke-[1.5]" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Tabs */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-[#2A2535] bg-[#0C0A12]/95 backdrop-blur-xl z-40">
        <div className="flex justify-around py-2 pb-[env(safe-area-inset-bottom)]">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 min-h-[44px] justify-center ${
                  isActive ? "text-[#2DD4BF]" : "text-[#71717A]"
                }`}
              >
                <link.icon className="w-5 h-5 stroke-[1.5]" />
                <span className="text-[10px] font-mono uppercase tracking-wider">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

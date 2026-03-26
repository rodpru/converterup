"use client";

import { useState } from "react";
import { UserBadge } from "@/components/admin/user-badge";
import { Search } from "lucide-react";

const filters = ["all", "free", "active", "cancelled"] as const;

export default function AdminUsersPage() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[Syne] font-bold text-2xl text-[#EDEDEF]">
          Users
        </h1>
        <p className="text-sm text-[#71717A] mt-1">
          Manage users and subscriptions.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email..."
            className="w-full h-10 pl-10 pr-4 bg-[#1C1825] border border-[#2A2535] rounded-lg text-sm text-[#EDEDEF] placeholder:text-[#71717A]/50 focus:outline-none focus:border-[#2DD4BF]/30"
          />
        </div>
        <div className="flex gap-1 bg-[#1C1825] border border-[#2A2535] rounded-lg p-1">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md font-mono text-[11px] uppercase tracking-wider transition-colors ${
                filter === f
                  ? "bg-[#2DD4BF]/10 text-[#2DD4BF]"
                  : "text-[#71717A] hover:text-[#EDEDEF]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2A2535]">
              <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                Email
              </th>
              <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                Status
              </th>
              <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A] hidden sm:table-cell">
                Signup
              </th>
              <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A] hidden md:table-cell">
                Conversions
              </th>
              <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A] hidden lg:table-cell">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={5}
                className="px-5 py-12 text-center text-[#71717A] text-sm"
              >
                No users yet. Connect Supabase to see data.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

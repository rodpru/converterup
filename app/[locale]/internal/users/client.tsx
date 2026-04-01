"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { UserBadge } from "@/components/admin/user-badge";
import type { ProfileRow } from "@/lib/admin";

const filters = ["all", "free", "active", "cancelled"] as const;

interface Props {
  users: ProfileRow[];
  total: number;
  page: number;
  limit: number;
  currentFilter: string;
  currentSearch: string;
}

export function AdminUsersClient({
  users,
  total,
  page,
  limit,
  currentFilter,
  currentSearch,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentSearch);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const navigate = useCallback(
    (overrides: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(overrides)) {
        if (value && value !== "all" && value !== "1" && value !== "") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      router.push(`/internal/users?${params.toString()}`);
    },
    [router, searchParams],
  );

  const handleSearch = () => {
    navigate({ search, page: "1" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[Syne] font-bold text-2xl text-[#EDEDEF]">Users</h1>
        <p className="text-sm text-[#71717A] mt-1">
          Manage users and subscriptions.{" "}
          <span className="text-[#EDEDEF]">{total}</span> total.
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
            onKeyDown={handleKeyDown}
            onBlur={handleSearch}
            placeholder="Search by email..."
            className="w-full h-10 pl-10 pr-4 bg-[#1C1825] border border-[#2A2535] rounded-lg text-sm text-[#EDEDEF] placeholder:text-[#71717A]/50 focus:outline-none focus:border-[#2DD4BF]/30"
          />
        </div>
        <div className="flex gap-1 bg-[#1C1825] border border-[#2A2535] rounded-lg p-1">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => navigate({ filter: f, page: "1" })}
              className={`px-3 py-1.5 rounded-md font-mono text-[11px] uppercase tracking-wider transition-colors ${
                currentFilter === f
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
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-[#71717A] text-sm"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[#2A2535]/50 hover:bg-[#1C1825] transition-colors"
                >
                  <td className="px-5 py-3 text-sm text-[#EDEDEF] truncate max-w-[200px]">
                    {user.email}
                  </td>
                  <td className="px-5 py-3">
                    <UserBadge
                      status={
                        user.subscription_status as
                          | "free"
                          | "active"
                          | "cancelled"
                      }
                    />
                  </td>
                  <td className="px-5 py-3 text-sm text-[#71717A] hidden sm:table-cell">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 font-mono text-sm text-[#EDEDEF] hidden md:table-cell">
                    {user.total_conversions}
                  </td>
                  <td className="px-5 py-3 font-mono text-sm text-[#EDEDEF] hidden lg:table-cell">
                    ${(user.total_paid / 100).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-[#71717A] font-mono">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => navigate({ page: String(page - 1) })}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1C1825] border border-[#2A2535] text-sm text-[#71717A] hover:text-[#EDEDEF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => navigate({ page: String(page + 1) })}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1C1825] border border-[#2A2535] text-sm text-[#71717A] hover:text-[#EDEDEF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import {
  Search,
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { ConversionRow } from "@/lib/admin";

const typeFilters = ["all", "images", "videos", "audio"] as const;

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / k ** i).toFixed(1)} ${sizes[i]}`;
}

interface Props {
  conversions: ConversionRow[];
  total: number;
  page: number;
  limit: number;
  currentType: string;
  currentSearch: string;
}

export function AdminConversionsClient({
  conversions,
  total,
  page,
  limit,
  currentType,
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
      router.push(`/admin/conversions?${params.toString()}`);
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
        <h1 className="font-[Syne] font-bold text-2xl text-[#EDEDEF]">
          Conversions
        </h1>
        <p className="text-sm text-[#71717A] mt-1">
          Track file conversion activity across the platform.{" "}
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
            placeholder="Search by format..."
            className="w-full h-10 pl-10 pr-4 bg-[#1C1825] border border-[#2A2535] rounded-lg text-sm text-[#EDEDEF] placeholder:text-[#71717A]/50 focus:outline-none focus:border-[#2DD4BF]/30"
          />
        </div>
        <div className="flex gap-1 bg-[#1C1825] border border-[#2A2535] rounded-lg p-1">
          {typeFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => navigate({ type: f, page: "1" })}
              className={`px-3 py-1.5 rounded-md font-mono text-[11px] uppercase tracking-wider transition-colors ${
                currentType === f
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
                Timestamp
              </th>
              <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                User
              </th>
              <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                Input
              </th>
              <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                Output
              </th>
              <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A] hidden sm:table-cell">
                Reduction
              </th>
              <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A] hidden md:table-cell">
                Duration
              </th>
              <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {conversions.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-12 text-center text-[#71717A] text-sm"
                >
                  <div className="flex flex-col items-center gap-3">
                    <ArrowLeftRight className="w-8 h-8 text-[#2A2535]" />
                    <span>No conversions found.</span>
                  </div>
                </td>
              </tr>
            ) : (
              conversions.map((c) => {
                const reduction =
                  c.output_size && c.input_size > 0
                    ? Math.round(
                        ((c.input_size - c.output_size) / c.input_size) * 100,
                      )
                    : null;

                return (
                  <tr
                    key={c.id}
                    className="border-b border-[#2A2535]/50 hover:bg-[#1C1825] transition-colors"
                  >
                    <td className="px-5 py-3 text-sm text-[#71717A] whitespace-nowrap">
                      {new Date(c.created_at).toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-sm text-[#EDEDEF] truncate max-w-[160px]">
                      {c.user_email}
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-mono text-xs text-[#EDEDEF] bg-[#2A2535] px-2 py-0.5 rounded">
                        {c.input_format.toUpperCase()}
                      </span>
                      <span className="text-[#71717A] text-xs ml-2 hidden sm:inline">
                        {formatBytes(c.input_size)}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-mono text-xs text-[#2DD4BF] bg-[#2DD4BF]/10 px-2 py-0.5 rounded">
                        {c.output_format.toUpperCase()}
                      </span>
                      {c.output_size != null && (
                        <span className="text-[#71717A] text-xs ml-2 hidden sm:inline">
                          {formatBytes(c.output_size)}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 font-mono text-sm hidden sm:table-cell">
                      {reduction !== null ? (
                        <span
                          className={
                            reduction > 0 ? "text-[#2DD4BF]" : "text-[#FB7185]"
                          }
                        >
                          {reduction > 0
                            ? `-${reduction}%`
                            : `+${Math.abs(reduction)}%`}
                        </span>
                      ) : (
                        <span className="text-[#71717A]">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 font-mono text-sm text-[#71717A] hidden md:table-cell">
                      {c.duration_ms != null
                        ? `${(c.duration_ms / 1000).toFixed(1)}s`
                        : "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider ${
                          c.status === "completed"
                            ? "bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/20"
                            : c.status === "failed"
                              ? "bg-[#FB7185]/10 text-[#FB7185] border border-[#FB7185]/20"
                              : "border border-[#2A2535] text-[#71717A]"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                );
              })
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

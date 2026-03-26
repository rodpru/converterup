"use client";

import { useState } from "react";
import { Search, ArrowLeftRight } from "lucide-react";

const typeFilters = ["all", "images", "videos", "audio"] as const;

export default function AdminConversionsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[Syne] font-bold text-2xl text-[#EDEDEF]">
          Conversions
        </h1>
        <p className="text-sm text-[#71717A] mt-1">
          Track file conversion activity across the platform.
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
            placeholder="Search by user or file..."
            className="w-full h-10 pl-10 pr-4 bg-[#1C1825] border border-[#2A2535] rounded-lg text-sm text-[#EDEDEF] placeholder:text-[#71717A]/50 focus:outline-none focus:border-[#2DD4BF]/30"
          />
        </div>
        <div className="flex gap-1 bg-[#1C1825] border border-[#2A2535] rounded-lg p-1">
          {typeFilters.map((f) => (
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
            <tr>
              <td
                colSpan={7}
                className="px-5 py-12 text-center text-[#71717A] text-sm"
              >
                <div className="flex flex-col items-center gap-3">
                  <ArrowLeftRight className="w-8 h-8 text-[#2A2535]" />
                  <span>No conversions recorded yet.</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

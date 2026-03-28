"use client";

import { useState } from "react";
import { Settings, Shield, Activity } from "lucide-react";

export default function AdminSettingsPage() {
  const [freeTierLimit, setFreeTierLimit] = useState("5");

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[Syne] font-bold text-2xl text-[#EDEDEF]">
          Settings
        </h1>
        <p className="text-sm text-[#71717A] mt-1">
          Platform configuration and system health.
        </p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[#2A2535] flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#71717A]" />
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
              General
            </h3>
          </div>
          <div className="p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <div className="flex-1">
                <label className="text-sm text-[#EDEDEF] font-medium block mb-1">
                  Free Tier Daily Limit
                </label>
                <p className="text-xs text-[#71717A]">
                  Maximum conversions per day for free users.
                </p>
              </div>
              <input
                type="number"
                value={freeTierLimit}
                onChange={(e) => setFreeTierLimit(e.target.value)}
                min="1"
                max="100"
                className="w-24 h-10 px-3 bg-[#1C1825] border border-[#2A2535] rounded-lg text-sm text-[#EDEDEF] text-center font-mono focus:outline-none focus:border-[#2DD4BF]/30"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pt-4 border-t border-[#2A2535]/50">
              <div className="flex-1">
                <label className="text-sm text-[#EDEDEF] font-medium block mb-1">
                  Subscription Price
                </label>
                <p className="text-xs text-[#71717A]">
                  Managed via Stripe Dashboard.
                </p>
              </div>
              <span className="font-mono text-sm text-[#71717A]">$9.99/mo</span>
            </div>
          </div>
        </div>

        {/* Admin Management */}
        <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[#2A2535] flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#71717A]" />
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
              Admin Management
            </h3>
          </div>
          <div className="p-5">
            <div className="text-sm text-[#71717A]">
              No additional admins configured. Assign the{" "}
              <code className="font-mono text-[#2DD4BF] bg-[#2DD4BF]/5 px-1.5 py-0.5 rounded text-xs">
                admin
              </code>{" "}
              role in the{" "}
              <code className="font-mono text-[#2DD4BF] bg-[#2DD4BF]/5 px-1.5 py-0.5 rounded text-xs">
                profiles
              </code>{" "}
              table to grant access.
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[#2A2535] flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#71717A]" />
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
              System Health
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#71717A]">App Version</span>
              <span className="font-mono text-xs text-[#EDEDEF]">0.1.0</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#2A2535]/50">
              <span className="text-sm text-[#71717A]">Framework</span>
              <span className="font-mono text-xs text-[#EDEDEF]">
                Next.js 16
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#2A2535]/50">
              <span className="text-sm text-[#71717A]">Deploy Status</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" />
                <span className="font-mono text-xs text-[#2DD4BF]">
                  Healthy
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#2A2535]/50">
              <span className="text-sm text-[#71717A]">Database</span>
              <span className="font-mono text-xs text-[#EDEDEF]">
                Supabase (PostgreSQL)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

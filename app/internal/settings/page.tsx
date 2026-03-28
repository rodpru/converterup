"use client";

import { Activity } from "lucide-react";

export default function SettingsPage() {
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
        {/* Platform Config */}
        <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[#2A2535]">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
              Platform
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#71717A]">
                Free Tier Daily Limit
              </span>
              <span className="font-mono text-sm text-[#EDEDEF]">
                3 uses/day
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#2A2535]/50">
              <span className="text-sm text-[#71717A]">
                Subscription Price
              </span>
              <span className="font-mono text-sm text-[#EDEDEF]">$5/mo</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#2A2535]/50">
              <span className="text-sm text-[#71717A]">Total Tools</span>
              <span className="font-mono text-sm text-[#EDEDEF]">16</span>
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
            <div className="flex items-center justify-between pt-3 border-t border-[#2A2535]/50">
              <span className="text-sm text-[#71717A]">Payments</span>
              <span className="font-mono text-xs text-[#EDEDEF]">Stripe</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#2A2535]/50">
              <span className="text-sm text-[#71717A]">Video Processing</span>
              <span className="font-mono text-xs text-[#EDEDEF]">
                FFmpeg WASM + CloudConvert
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

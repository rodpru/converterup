"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditsData {
  dailyCreditsRemaining: number;
  isSubscriber: boolean;
}

interface CreditBadgeProps {
  className?: string;
  onUpgradeClick?: () => void;
}

export function CreditBadge({ className, onUpgradeClick }: CreditBadgeProps) {
  const [credits, setCredits] = useState<CreditsData | null>(null);

  useEffect(() => {
    async function fetchCredits() {
      try {
        const res = await fetch("/api/credits");
        if (res.ok) {
          const data = await res.json();
          setCredits({
            dailyCreditsRemaining:
              data.dailyCreditsRemaining ??
              data.imageCredits + data.videoCredits + (data.paidCredits ?? 0),
            isSubscriber: data.isSubscriber ?? false,
          });
        }
      } catch {
        // Silently fail for non-authed users
      }
    }
    fetchCredits();
  }, []);

  if (!credits) return null;

  const isLow = !credits.isSubscriber && credits.dailyCreditsRemaining <= 1;

  return (
    <button
      type="button"
      onClick={onUpgradeClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border font-mono text-xs transition-all",
        credits.isSubscriber
          ? "border-[#2DD4BF]/30 text-[#2DD4BF] bg-[#2DD4BF]/10 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]"
          : isLow
            ? "border-[#FB7185]/30 text-[#FB7185] bg-[#FB7185]/10 hover:border-[#FB7185]/50"
            : "border-[#2A2535] text-[#EDEDEF] bg-[#16131E] hover:border-[#2DD4BF]/30",
        className,
      )}
    >
      {credits.isSubscriber ? (
        <>
          <Sparkles className="w-3.5 h-3.5 text-[#2DD4BF]" />
          <span>Unlimited</span>
        </>
      ) : (
        <span>{credits.dailyCreditsRemaining} left today</span>
      )}
    </button>
  );
}

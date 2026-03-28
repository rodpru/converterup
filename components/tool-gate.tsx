"use client";

import { motion } from "framer-motion";
import { Lock, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useToolAuth } from "@/lib/use-tool-auth";

interface ToolGateProps {
  toolName: string;
  children: (gate: {
    canUse: boolean;
    remaining: number;
    isSubscriber: boolean;
    deduct: () => Promise<void>;
    trackStarted: () => void;
    trackCompleted: () => void;
  }) => React.ReactNode;
}

function trackEvent(toolName: string, eventType: "started" | "completed") {
  fetch("/api/tool-events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ toolName, eventType }),
  }).catch(() => {});
}

export function ToolGate({ toolName, children }: ToolGateProps) {
  const { loading, isAuthed, canUse, remaining, isSubscriber, deduct } =
    useToolAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-6 h-6 animate-spin text-[#2DD4BF]" />
      </div>
    );
  }

  if (!isAuthed) {
    return (
      <div className="flex items-center justify-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-xl border border-[#2A2535] bg-[#16131E] flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-[#71717A]" />
          </div>
          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-3">
            Sign up to use this tool
          </h2>
          <p className="text-[#71717A] mb-6 text-sm">
            Create a free account and get 3 free uses per day. No credit card
            required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center h-12 px-8 bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all min-h-[44px]"
            >
              Sign Up Free
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-12 px-8 border border-[#2A2535] text-[#EDEDEF] font-mono text-sm uppercase tracking-wider rounded-lg hover:border-[#2DD4BF]/30 transition-colors min-h-[44px]"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!canUse) {
    return (
      <div className="flex items-center justify-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-xl border border-[#FB7185]/30 bg-[#FB7185]/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-[#FB7185]" />
          </div>
          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-3">
            No uses left today
          </h2>
          <p className="text-[#71717A] mb-6 text-sm">
            You&apos;ve used all 3 free uses today. Upgrade for unlimited
            access.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center h-12 px-8 bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all min-h-[44px]"
          >
            Upgrade to Unlimited — $5/mo
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {children({
        canUse,
        remaining,
        isSubscriber,
        deduct,
        trackStarted: () => trackEvent(toolName, "started"),
        trackCompleted: () => trackEvent(toolName, "completed"),
      })}
    </>
  );
}

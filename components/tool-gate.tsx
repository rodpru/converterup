"use client";

import { useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import { useToolAuth } from "@/lib/use-tool-auth";
import { SignupGateModal } from "@/components/signup-gate-modal";
import { UpgradeModal } from "@/components/upgrade-modal";

interface ToolGateProps {
  toolName: string;
  children: (gate: {
    canUse: boolean;
    remaining: number;
    isSubscriber: boolean;
    isAuthed: boolean;
    gatedDownload: (downloadFn: () => void | Promise<void>) => Promise<void>;
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
  const { loading, isAuthed, canUse, remaining, isSubscriber, deduct, refresh } =
    useToolAuth();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleAuthSuccess = useCallback(async () => {
    setShowSignupModal(false);
    await refresh();
  }, [refresh]);

  const gatedDownload = useCallback(
    async (downloadFn: () => void | Promise<void>) => {
      if (!isAuthed) {
        setShowSignupModal(true);
        return;
      }
      if (!canUse) {
        setShowUpgradeModal(true);
        return;
      }
      await downloadFn();
      trackEvent(toolName, "completed");
      await deduct();
    },
    [isAuthed, canUse, deduct, toolName],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-6 h-6 animate-spin text-[#2DD4BF]" />
      </div>
    );
  }

  return (
    <>
      {children({
        canUse,
        remaining,
        isSubscriber,
        isAuthed,
        gatedDownload,
        trackStarted: () => trackEvent(toolName, "started"),
        trackCompleted: () => trackEvent(toolName, "completed"),
      })}
      <SignupGateModal
        open={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSuccess={handleAuthSuccess}
      />
      <UpgradeModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
}

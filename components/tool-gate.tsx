"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useToolAuth } from "@/lib/use-tool-auth";
import { SignupGateModal } from "@/components/signup-gate-modal";
import { UpgradeModal } from "@/components/upgrade-modal";
import {
  savePendingDownload,
  loadPendingDownload,
  clearPendingDownload,
} from "@/lib/tool-result-cache";

export interface Persistable {
  data: Blob | string;
  filename: string;
}

interface ToolGateProps {
  toolName: string;
  children: (gate: {
    canUse: boolean;
    remaining: number;
    isSubscriber: boolean;
    isAuthed: boolean;
    gatedDownload: (
      downloadFn: () => void | Promise<void>,
      persistable?: Persistable,
    ) => Promise<void>;
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

function triggerDownload(data: Blob | string, filename: string) {
  const a = document.createElement("a");
  if (data instanceof Blob) {
    const url = URL.createObjectURL(data);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else {
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

export function ToolGate({ toolName, children }: ToolGateProps) {
  const { loading, isAuthed, canUse, remaining, isSubscriber, deduct, refresh } =
    useToolAuth();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const checkedCache = useRef(false);

  // After OAuth return: check for cached download and auto-trigger
  useEffect(() => {
    if (loading || checkedCache.current) return;
    if (!isAuthed || !canUse) return;
    checkedCache.current = true;

    loadPendingDownload(toolName).then((cached) => {
      if (!cached) return;
      triggerDownload(cached.data, cached.filename);
      trackEvent(toolName, "completed");
      deduct();
      clearPendingDownload(toolName);
    });
  }, [loading, isAuthed, canUse, toolName, deduct]);

  const gatedDownload = useCallback(
    async (
      downloadFn: () => void | Promise<void>,
      persistable?: Persistable,
    ) => {
      if (!isAuthed) {
        if (persistable) {
          await savePendingDownload(toolName, persistable.data, persistable.filename);
        }
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

  const handleAuthSuccess = useCallback(async () => {
    setShowSignupModal(false);
    await refresh();
  }, [refresh]);

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

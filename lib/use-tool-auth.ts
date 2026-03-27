"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface ToolAuthState {
  loading: boolean;
  isAuthed: boolean;
  canUse: boolean;
  remaining: number;
  isSubscriber: boolean;
  deduct: () => Promise<void>;
}

export function useToolAuth(): ToolAuthState {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [canUse, setCanUse] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [isSubscriber, setIsSubscriber] = useState(false);

  useEffect(() => {
    async function check() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setIsAuthed(true);

      try {
        const res = await fetch("/api/credits");
        if (res.ok) {
          const data = await res.json();
          setIsSubscriber(data.isSubscriber ?? false);
          setCanUse(data.canConvert ?? false);
          setRemaining(
            data.isSubscriber ? Infinity : data.dailyLimit - data.dailyUsed,
          );
        }
      } catch {
        // If credits check fails, allow usage
        setCanUse(true);
        setRemaining(3);
      }

      setLoading(false);
    }

    check();
  }, []);

  const deduct = async () => {
    await fetch("/api/credits/deduct", { method: "POST" });
    if (!isSubscriber) {
      setRemaining((r) => Math.max(0, r - 1));
      setCanUse(remaining - 1 > 0);
    }
    window.dispatchEvent(new Event("credits-updated"));
  };

  return { loading, isAuthed, canUse, remaining, isSubscriber, deduct };
}

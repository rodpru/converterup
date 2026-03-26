"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { User, LogOut, CreditCard, Sparkles } from "lucide-react";

interface AccountMenuProps {
  inline?: boolean;
}

export function AccountMenu({ inline = false }: AccountMenuProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [loadingUpgrade, setLoadingUpgrade] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setEmail(user.email ?? null);
    });

    function fetchCredits() {
      fetch("/api/credits")
        .then((res) => {
          if (!res.ok) return null;
          return res.json();
        })
        .then((data) => {
          if (!data) return;
          setIsSubscriber(data.isSubscriber ?? false);
          if (
            !data.isSubscriber &&
            typeof data.dailyLimit === "number" &&
            typeof data.dailyUsed === "number"
          ) {
            setRemaining(data.dailyLimit - data.dailyUsed);
          }
        })
        .catch(() => {});
    }
    fetchCredits();
    window.addEventListener("credits-updated", fetchCredits);
    return () => window.removeEventListener("credits-updated", fetchCredits);
  }, []);

  useEffect(() => {
    if (inline) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inline]);

  const handleUpgrade = async () => {
    setLoadingUpgrade(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "unlimited" }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // ignore
    } finally {
      setLoadingUpgrade(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleManageSubscription = async () => {
    setLoadingPortal(true);
    try {
      const res = await fetch("/api/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // ignore
    } finally {
      setLoadingPortal(false);
    }
  };

  if (!email) return null;

  const menuItems = (
    <>
      <div className="px-4 py-3 border-b border-[#2A2535]">
        <p className="text-xs text-[#71717A] font-mono truncate">{email}</p>
        {remaining !== null && (
          <p className="text-xs text-[#71717A] mt-1">
            <span
              className={remaining <= 1 ? "text-[#FB7185]" : "text-[#2DD4BF]"}
            >
              {remaining}
            </span>{" "}
            conversions left today
          </p>
        )}
      </div>
      <div className="py-1">
        {isSubscriber ? (
          <button
            type="button"
            onClick={handleManageSubscription}
            disabled={loadingPortal}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[#EDEDEF] hover:bg-[#1C1825] transition-colors disabled:opacity-50"
          >
            <CreditCard className="w-4 h-4 text-[#71717A]" />
            {loadingPortal ? "Loading..." : "Manage Subscription"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleUpgrade}
            disabled={loadingUpgrade}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[#2DD4BF] hover:bg-[#1C1825] transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {loadingUpgrade ? "Redirecting..." : "Upgrade to Unlimited"}
          </button>
        )}
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[#FB7185] hover:bg-[#1C1825] transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </>
  );

  // Inline mode for mobile hamburger menu
  if (inline) {
    return (
      <div className="border border-[#2A2535] rounded-xl overflow-hidden">
        {menuItems}
      </div>
    );
  }

  // Dropdown mode for desktop
  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#2A2535] bg-[#16131E] hover:border-[#2DD4BF]/30 transition-colors min-h-[44px] min-w-[44px]"
      >
        <User className="w-4 h-4 text-[#EDEDEF]" />
        {remaining !== null && (
          <span
            className={`absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
              remaining <= 1
                ? "bg-[#FB7185] text-white"
                : "bg-[#2DD4BF] text-[#042F2E]"
            }`}
          >
            {remaining}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-64 bg-[#16131E] border border-[#2A2535] rounded-xl shadow-xl z-50 overflow-hidden">
          {menuItems}
        </div>
      )}
    </div>
  );
}

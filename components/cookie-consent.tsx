"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";

const STORAGE_KEY = "cu-consent";

type ConsentState = "granted" | "denied" | null;

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

export function CookieConsent() {
  const [state, setState] = useState<ConsentState>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setState(getConsent());
  }, []);

  const choose = (value: Exclude<ConsentState, null>) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setState(value);
    window.dispatchEvent(
      new CustomEvent("cu-consent-change", { detail: value }),
    );
  };

  if (!mounted || state !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
      >
        <div className="mx-auto max-w-3xl bg-[#16131E] border border-[#2A2535] rounded-xl p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-sm text-[#A1A1AA] font-[Inter] leading-relaxed flex-1">
            We use cookies for analytics and ads to keep ConverterUp free. Your
            files never leave your device. See our{" "}
            <Link
              href="/privacy"
              className="text-[#2DD4BF] underline hover:no-underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex gap-2 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="flex-1 sm:flex-initial h-10 px-4 rounded-lg border border-[#2A2535] text-[#A1A1AA] hover:text-[#EDEDEF] hover:border-[#2DD4BF]/30 transition-colors text-xs font-mono uppercase tracking-wider min-h-[44px]"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="flex-1 sm:flex-initial h-10 px-5 rounded-lg bg-[#2DD4BF] text-[#042F2E] hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all text-xs font-mono uppercase tracking-wider font-semibold min-h-[44px]"
            >
              Accept
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check } from "lucide-react";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

const features = [
  "Unlimited conversions per day",
  "Priority processing speed",
  "All formats including 4K video",
  "Batch conversions",
  "No watermarks ever",
];

export function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#16131E] border border-[#2A2535] rounded-2xl overflow-hidden"
          >
            {/* Gradient accent line at top */}
            <div className="gradient-line" />

            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-1">
                    Go Unlimited
                  </h2>
                  <p className="text-sm text-[#71717A]">
                    Everything you need, one simple price
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-[#1C1825] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center text-[#71717A] hover:text-[#EDEDEF]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price */}
              <div className="text-center mb-6 py-4">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-[Syne] font-bold text-[#EDEDEF]">$5</span>
                  <span className="text-[#71717A] font-mono text-sm">/month</span>
                </div>
                <p className="text-xs text-[#71717A] mt-1 font-mono">Cancel anytime</p>
              </div>

              {/* Features */}
              <div className="flex flex-col gap-3 mb-8">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#2DD4BF]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#2DD4BF]" />
                    </div>
                    <span className="text-sm text-[#EDEDEF]">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full h-12 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {loading ? "Redirecting..." : "Upgrade Now"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

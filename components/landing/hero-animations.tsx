"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type ReactNode, useState, useEffect } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay: 0.3 + delay, ease }}
    >
      {children}
    </motion.div>
  );
}

const PAIRS = [
  { from: "PNG", to: "WEBP", color: "teal" },
  { from: "MP4", to: "WEBM", color: "rose" },
  { from: "JPG", to: "AVIF", color: "teal" },
  { from: "AVI", to: "MP4", color: "rose" },
  { from: "TIFF", to: "PNG", color: "teal" },
];

export function FormatMorphCard() {
  const [idx, setIdx] = useState(0);
  const [showOut, setShowOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowOut(true), 900);
    const interval = setInterval(() => {
      setShowOut(false);
      setTimeout(() => {
        setIdx((p) => (p + 1) % PAIRS.length);
        setTimeout(() => setShowOut(true), 350);
      }, 250);
    }, 3200);
    return () => { clearInterval(interval); clearTimeout(t1); };
  }, []);

  const pair = PAIRS[idx];
  const isTeal = pair.color === "teal";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.5, ease }}
      className="relative w-full max-w-[340px] aspect-[3/4] bg-card border border-border rounded-2xl p-8 hover:border-primary/20 transition-all duration-500"
      style={{
        boxShadow: "0 0 60px rgba(45, 212, 191, 0.06), 0 0 120px rgba(124, 58, 237, 0.04)",
      }}
    >
      {/* Gradient accent line at top */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="h-full flex flex-col justify-between relative z-10">
        {/* Input */}
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/50 block mb-3">Input</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={`in-${idx}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className={`inline-flex px-4 py-2 rounded-lg font-mono text-sm tracking-wider border ${
                isTeal ? "border-primary/20 bg-primary/5 text-primary" : "border-accent/20 bg-accent/5 text-accent"
              }`}
            >
              .{pair.from}
            </motion.div>
          </AnimatePresence>

          {/* Mock file lines */}
          <div className="mt-6 space-y-2.5">
            <div className="h-1 w-3/4 rounded-full bg-border/50" />
            <div className="h-1 w-1/2 rounded-full bg-border/50" />
            <div className="h-1 w-2/3 rounded-full bg-border/50" />
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-10 h-10 rounded-lg border border-border flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M8 13L4 9M8 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" />
            </svg>
          </motion.div>
        </div>

        {/* Output */}
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/50 block mb-3">Output</span>
          <AnimatePresence mode="wait">
            {showOut ? (
              <motion.div
                key={`out-${idx}`}
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease }}
                className={`inline-flex px-4 py-2 rounded-lg font-mono text-sm tracking-wider font-medium ${
                  isTeal
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(45,212,191,0.25)]"
                    : "bg-accent text-accent-foreground shadow-[0_0_20px_rgba(251,113,133,0.25)]"
                }`}
              >
                .{pair.to}
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="inline-flex px-4 py-2 rounded-lg font-mono text-sm tracking-wider border border-dashed border-border text-muted-foreground/30"
              >
                ...
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

const FLOATS = [
  { label: "PNG", x: -60, y: -30, d: 0 },
  { label: "MP4", x: 70, y: -70, d: 0.6 },
  { label: "WEBP", x: -50, y: 70, d: 1.2 },
  { label: "MOV", x: 90, y: 30, d: 1.8 },
  { label: "AVIF", x: -20, y: -90, d: 0.9 },
];

export function FloatingFormats() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {FLOATS.map((f) => (
        <motion.div
          key={f.label}
          className="absolute top-1/2 left-1/2"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.4, 0.4, 0],
            x: [f.x, f.x + 6, f.x - 3, f.x],
            y: [f.y, f.y - 10, f.y + 3, f.y],
          }}
          transition={{
            duration: 7,
            delay: f.d + 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="px-2 py-0.5 rounded-full font-mono text-[9px] tracking-wider text-foreground/20 border border-border/50 bg-card/50 backdrop-blur-sm">
            {f.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

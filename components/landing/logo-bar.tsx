"use client";

import { motion } from "framer-motion";

const items = [
  "100% Client-Side",
  "No Upload Required",
  "WASM Powered",
  "Zero Data Collection",
  "Works Offline",
  "Private & Secure",
  "No Ads Ever",
  "Browser-Native",
];

function Marquee({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-3 shrink-0"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="shrink-0 px-4 py-1.5 rounded-full border border-[#2A2535] font-mono text-[10px] uppercase tracking-wider text-[#71717A] whitespace-nowrap hover:text-[#EDEDEF]/60 hover:border-[#2DD4BF]/20 transition-colors duration-300"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function LogoBar() {
  return (
    <section className="py-6 overflow-hidden border-t border-[#2A2535]/50">
      <div className="space-y-2.5">
        <Marquee />
        <Marquee reverse />
      </div>
    </section>
  );
}

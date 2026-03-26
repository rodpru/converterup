"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const DEMO_CONVERSIONS = [
  { from: "PNG", to: "WEBP", inputSize: "4.2 MB", outputSize: "1.1 MB", savings: "74%" },
  { from: "MP4", to: "WEBM", inputSize: "32.5 MB", outputSize: "18.2 MB", savings: "44%" },
  { from: "JPG", to: "AVIF", inputSize: "2.8 MB", outputSize: "0.6 MB", savings: "79%" },
  { from: "AVI", to: "MP4", inputSize: "128 MB", outputSize: "24.3 MB", savings: "81%" },
];

const formats = ["PNG", "JPG", "WEBP", "AVIF", "MP4", "WEBM"];

export function LiveDemo() {
  const [demoIndex, setDemoIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "converting" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const demo = DEMO_CONVERSIONS[demoIndex];

  useEffect(() => {
    const cycle = () => {
      setPhase("idle");
      setProgress(0);

      const startConvert = setTimeout(() => {
        setPhase("converting");
        let p = 0;
        const progressInterval = setInterval(() => {
          p += Math.random() * 15 + 5;
          if (p >= 100) {
            p = 100;
            clearInterval(progressInterval);
            setTimeout(() => setPhase("done"), 200);
          }
          setProgress(Math.min(p, 100));
        }, 150);
      }, 1500);

      const nextDemo = setTimeout(() => {
        setDemoIndex((prev) => (prev + 1) % DEMO_CONVERSIONS.length);
      }, 5500);

      return () => {
        clearTimeout(startConvert);
        clearTimeout(nextDemo);
      };
    };

    const cleanup = cycle();
    const interval = setInterval(() => {
      cycle();
    }, 5500);

    return () => {
      cleanup?.();
      clearInterval(interval);
    };
  }, [demoIndex]);

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-[#0C0A12] border-t border-[#2A2535]/50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
            See it <span className="gradient-text">in action.</span>
          </h2>
          <p className="text-lg text-[#71717A] font-[Inter] max-w-lg mx-auto">
            Watch how Recast converts your files in real time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="max-w-xl mx-auto"
        >
          <div className="border border-[#2A2535] bg-[#16131E] rounded-2xl p-6 sm:p-10">
            {/* Format pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {formats.map((fmt) => (
                <span
                  key={fmt}
                  className={`px-3 py-1.5 rounded-full font-mono text-xs tracking-wider transition-colors duration-200 ${
                    fmt === demo.from || fmt === demo.to
                      ? "bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/30"
                      : "bg-[#2A2535]/50 text-[#71717A] border border-[#2A2535]"
                  }`}
                >
                  {fmt}
                </span>
              ))}
            </div>

            {/* Format Display */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`from-${demoIndex}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="px-5 py-3 border border-[#2A2535] rounded-xl font-mono text-base sm:text-lg tracking-wider text-[#EDEDEF]"
                >
                  {demo.from}
                </motion.div>
              </AnimatePresence>

              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-5 h-5 text-[#71717A]" />
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`to-${demoIndex}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className={`px-5 py-3 font-mono text-base sm:text-lg tracking-wider rounded-xl font-bold transition-colors duration-300 ${
                    phase === "done"
                      ? "bg-[#2DD4BF] text-[#0C0A12]"
                      : "border border-[#2A2535] text-[#EDEDEF]"
                  }`}
                >
                  {demo.to}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full h-1 bg-[#2A2535] rounded-full overflow-hidden">
                <motion.div
                  className="h-full gradient-line rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-mono text-[10px] text-[#71717A]">
                  {phase === "idle" && "Ready"}
                  {phase === "converting" && `${Math.round(progress)}%`}
                  {phase === "done" && "Complete"}
                </span>
              </div>
            </div>

            {/* Result Stats */}
            <AnimatePresence mode="wait">
              {phase === "done" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-3 gap-4 text-center"
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#71717A] mb-1">
                      Input
                    </p>
                    <p className="font-mono text-sm text-[#EDEDEF]">{demo.inputSize}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#71717A] mb-1">
                      Output
                    </p>
                    <p className="font-mono text-sm text-[#EDEDEF]">{demo.outputSize}</p>
                  </div>
                  <div className="glow">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#71717A] mb-1">
                      Savings
                    </p>
                    <p className="font-mono text-sm text-[#2DD4BF] font-bold">
                      {demo.savings}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

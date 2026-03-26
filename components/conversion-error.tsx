"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface ConversionErrorProps {
  message: string;
  onRetry: () => void;
  onBack: () => void;
}

export function ConversionError({ message, onRetry, onBack }: ConversionErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <div className="w-16 h-16 rounded-xl border border-[#FB7185]/30 bg-[#FB7185]/10 flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="w-8 h-8 text-[#FB7185]" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-[Syne] font-bold text-[#EDEDEF] mb-3">Conversion failed</h2>
      <p className="text-[#71717A] mb-8 font-mono text-sm">{message}</p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={onRetry}
          className="h-12 px-6 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all min-h-[44px] flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
        <button
          type="button"
          onClick={onBack}
          className="h-12 px-6 rounded-lg border border-[#2A2535] text-[#EDEDEF] font-mono uppercase tracking-wider hover:border-[#2DD4BF]/30 transition-colors min-h-[44px]"
        >
          Change File
        </button>
      </div>
    </motion.div>
  );
}

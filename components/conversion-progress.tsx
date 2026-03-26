"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ConversionProgressProps {
  progress: number;
  onCancel?: () => void;
}

export function ConversionProgress({
  progress,
  onCancel,
}: ConversionProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto text-center"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-[Syne] font-bold text-[#EDEDEF] mb-8">
        Converting<span className="animate-pulse">...</span>
      </h2>

      <div className="mb-4">
        <div className="w-full h-1 bg-[#2A2535] rounded-full relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full gradient-line"
            style={{
              background: "linear-gradient(90deg, #0D9488, #7C3AED, #F43F5E)",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      <p className="font-mono text-sm text-[#71717A] mb-8">
        {progress}% complete
      </p>

      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#2A2535] text-[#EDEDEF] text-sm hover:border-[#FB7185]/50 hover:text-[#FB7185] transition-colors min-h-[44px]"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      )}
    </motion.div>
  );
}

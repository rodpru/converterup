"use client";

import { motion } from "framer-motion";
import { FormatBadge } from "@/components/format-badge";
import { formatFileSize, getFileCategory } from "@/lib/media-utils";
import { Download, Share2, RotateCcw } from "lucide-react";
import { downloadFile, shareFile, canShare } from "@/lib/mobile-utils";

interface ConversionResultProps {
  originalFile: File;
  result: {
    blob: Blob;
    filename: string;
    size: number;
    duration?: number;
  };
  onConvertAnother: () => void;
}

export function ConversionResult({
  originalFile,
  result,
  onConvertAnother,
}: ConversionResultProps) {
  const category = getFileCategory(originalFile);
  const reduction = Math.round((1 - result.size / originalFile.size) * 100);
  const outputExt = result.filename.split(".").pop() ?? "";

  const handleDownload = () => {
    const file = new File([result.blob], result.filename, {
      type: result.blob.type,
    });
    downloadFile(file, result.filename);
  };

  const handleShare = async () => {
    const file = new File([result.blob], result.filename, {
      type: result.blob.type,
    });
    await shareFile(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
          Done.
        </h2>
        {result.duration && (
          <p className="text-[#71717A] font-mono text-xs">
            Completed in {(result.duration / 1000).toFixed(1)}s
          </p>
        )}
      </div>

      {/* Before / After comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-6 text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-[#71717A] block mb-3">
            Before
          </span>
          <FormatBadge
            format={originalFile.name.split(".").pop() ?? ""}
            type={category as "image" | "video"}
            className="mb-3"
          />
          <p className="font-mono text-lg text-[#EDEDEF]">
            {formatFileSize(originalFile.size)}
          </p>
        </div>
        <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-6 text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-[#71717A] block mb-3">
            After
          </span>
          <FormatBadge
            format={outputExt}
            type={category as "image" | "video"}
            active
            className="mb-3"
          />
          <p className="font-mono text-lg text-[#EDEDEF]">
            {formatFileSize(result.size)}
          </p>
          {reduction > 0 && (
            <p className="font-mono text-xs text-[#2DD4BF] mt-1">
              {reduction}% smaller
            </p>
          )}
          {reduction < 0 && (
            <p className="font-mono text-xs text-[#FB7185] mt-1">
              {Math.abs(reduction)}% larger
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleDownload}
          className="flex-1 h-14 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all min-h-[44px] flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download
        </button>
        {canShare() && (
          <button
            type="button"
            onClick={handleShare}
            className="h-14 px-6 rounded-lg border border-[#2A2535] text-[#EDEDEF] hover:border-[#2DD4BF]/30 transition-colors min-h-[44px] flex items-center justify-center"
          >
            <Share2 className="w-5 h-5" />
          </button>
        )}
        <button
          type="button"
          onClick={onConvertAnother}
          className="flex-1 h-14 rounded-lg border border-[#2A2535] text-[#EDEDEF] font-mono uppercase tracking-wider hover:border-[#2DD4BF]/30 transition-colors min-h-[44px] flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Convert Another
        </button>
      </div>
    </motion.div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { FormatBadge } from "@/components/format-badge";
import {
  getFileCategory,
  getAvailableOutputFormats,
  getFileExtension,
  formatFileSize,
  createPreviewUrl,
  type FileCategory,
} from "@/lib/media-utils";
import { ArrowRight, Lock, Unlock, Music } from "lucide-react";

interface ConversionOptionsProps {
  file: File;
  onConvert: (options: {
    outputFormat: string;
    quality: number;
    width?: number;
    height?: number;
    maintainAspect: boolean;
    extractAudio?: boolean;
    audioFormat?: "mp3" | "aac" | "wav" | "ogg";
  }) => void;
  onBack: () => void;
}

export function ConversionOptions({
  file,
  onConvert,
  onBack,
}: ConversionOptionsProps) {
  const category = getFileCategory(file);
  const inputExt = getFileExtension(file);
  const formats = useMemo(
    () => getAvailableOutputFormats(inputExt),
    [inputExt],
  );

  const [outputFormat, setOutputFormat] = useState(formats[0] || "");
  const [quality, setQuality] = useState(80);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [extractAudio, setExtractAudio] = useState(false);
  const [audioFormat, setAudioFormat] = useState<"mp3" | "aac" | "wav" | "ogg">(
    "mp3",
  );

  const previewUrl = useMemo(() => {
    if (category === "image") return createPreviewUrl(file);
    return null;
  }, [file, category]);

  const handleConvert = () => {
    onConvert({
      outputFormat: extractAudio ? audioFormat : outputFormat,
      quality,
      width: width ? Number.parseInt(width, 10) : undefined,
      height: height ? Number.parseInt(height, 10) : undefined,
      maintainAspect,
      extractAudio: extractAudio || undefined,
      audioFormat: extractAudio ? audioFormat : undefined,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <button
        type="button"
        onClick={onBack}
        className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#71717A] hover:text-[#2DD4BF] transition-colors flex items-center gap-2 min-h-[44px] mb-6"
      >
        <span>&larr;</span> Change File
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-6 flex flex-col items-center justify-center min-h-[300px]">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-[280px] object-contain rounded-lg mb-4"
            />
          ) : (
            <div className="w-24 h-24 border border-[#2A2535] rounded-xl flex items-center justify-center mb-4">
              <span className="font-mono text-2xl uppercase text-[#71717A]">
                {inputExt}
              </span>
            </div>
          )}
          <p className="font-[Syne] font-bold text-lg text-[#EDEDEF] truncate max-w-full">
            {file.name}
          </p>
          <p className="font-mono text-xs text-[#71717A] mt-1">
            {formatFileSize(file.size)} &middot; {inputExt.toUpperCase()}
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-6">
          {/* Output Format */}
          {!extractAudio && (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-3 text-[#71717A]">
                Output Format
              </label>
              <div className="flex flex-wrap gap-2">
                {formats.map((fmt) => (
                  <FormatBadge
                    key={fmt}
                    format={fmt}
                    type={category as "image" | "video"}
                    active={outputFormat === fmt}
                    onClick={() => setOutputFormat(fmt)}
                    size="lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Extract Audio (video only) */}
          {category === "video" && (
            <div>
              <button
                type="button"
                onClick={() => setExtractAudio(!extractAudio)}
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider min-h-[44px] transition-colors text-[#71717A] hover:text-[#2DD4BF]"
              >
                <Music className="w-4 h-4" />
                <span>Extract Audio</span>
                <div
                  className={`w-8 h-4 border border-[#2A2535] rounded-full relative transition-colors ${extractAudio ? "bg-[#2DD4BF]" : "bg-[#1C1825]"}`}
                >
                  <div
                    className={`absolute top-0.5 w-2.5 h-2.5 rounded-full transition-all ${extractAudio ? "left-[14px] bg-[#042F2E]" : "left-0.5 bg-[#71717A]"}`}
                  />
                </div>
              </button>
              {extractAudio && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {(["mp3", "aac", "wav", "ogg"] as const).map((fmt) => (
                    <FormatBadge
                      key={fmt}
                      format={fmt}
                      type="audio"
                      active={audioFormat === fmt}
                      onClick={() => setAudioFormat(fmt)}
                      size="lg"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quality */}
          {!extractAudio && (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-3 text-[#71717A]">
                Quality — {quality}%
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) =>
                  setQuality(Number.parseInt(e.target.value, 10))
                }
                className="w-full h-1 bg-[#2A2535] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2DD4BF] [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(45,212,191,0.3)]"
              />
              <div className="flex justify-between mt-1">
                <span className="font-mono text-[10px] text-[#71717A]">
                  Smaller
                </span>
                <span className="font-mono text-[10px] text-[#71717A]">
                  Better
                </span>
              </div>
            </div>
          )}

          {/* Resize */}
          {!extractAudio && (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-3 text-[#71717A]">
                Resize (optional)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="Width"
                  className="flex-1 h-10 px-3 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 placeholder:text-[#71717A]/60"
                />
                <button
                  type="button"
                  onClick={() => setMaintainAspect(!maintainAspect)}
                  className="p-2 border border-[#2A2535] rounded-lg hover:bg-[#1C1825] transition-colors text-[#71717A] hover:text-[#2DD4BF]"
                  title={
                    maintainAspect
                      ? "Aspect ratio locked"
                      : "Aspect ratio unlocked"
                  }
                >
                  {maintainAspect ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <Unlock className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Height"
                  className="flex-1 h-10 px-3 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 placeholder:text-[#71717A]/60"
                />
              </div>
            </div>
          )}

          {/* Convert Button */}
          <button
            type="button"
            onClick={handleConvert}
            disabled={!outputFormat && !extractAudio}
            className="w-full h-14 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono uppercase tracking-wider text-base font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] flex items-center justify-center gap-2"
          >
            {extractAudio
              ? "Extract Audio"
              : `Convert to ${outputFormat.toUpperCase()}`}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

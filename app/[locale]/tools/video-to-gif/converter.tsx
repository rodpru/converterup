"use client";

import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";
import { loadFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Download,
  Film,
  Loader2,
  Play,
  Settings2,
  TriangleAlert,
  Upload,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const ACCEPTED_FORMATS = ".mp4,.webm,.mov,.avi";
const MAX_FILE_SIZE_MB = 100;
const LARGE_FILE_THRESHOLD_MB = 20;

const FPS_OPTIONS = [10, 15, 20, 25] as const;
const WIDTH_OPTIONS = [
  { value: 320, label: "320px" },
  { value: 480, label: "480px" },
  { value: 640, label: "640px" },
  { value: 800, label: "800px" },
  { value: -1, label: "Original" },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Video to GIF Converter",
  url: "https://converterup.com/tools/video-to-gif",
  description:
    "Convert MP4, WebM, MOV, and AVI videos to high-quality GIF animations. Adjust frame rate and size. Free, fast, and 100% browser-based.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any (browser-based)",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  isPartOf: {
    "@type": "WebSite",
    name: "ConverterUp",
    url: "https://converterup.com",
  },
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileExtension(file: File): string {
  const name = file.name.toLowerCase();
  const ext = name.split(".").pop();
  return ext || "mp4";
}

export function VideoToGifConverter() {
  return (
    <ToolGate toolName="video-to-gif">
      {({ gatedDownload, trackStarted }) => (
        <VideoToGifConverterContent
          gatedDownload={gatedDownload}
          trackStarted={trackStarted}
        />
      )}
    </ToolGate>
  );
}

function VideoToGifConverterContent({
  gatedDownload,
  trackStarted,
}: {
  gatedDownload: (downloadFn: () => void | Promise<void>) => Promise<void>;
  trackStarted: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [fps, setFps] = useState<number>(15);
  const [width, setWidth] = useState<number>(480);

  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [gifSize, setGifSize] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTrackedStarted = useRef(false);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (gifUrl) URL.revokeObjectURL(gifUrl);
    };
  }, [videoUrl, gifUrl]);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      setGifUrl(null);
      setGifSize(0);
      setProgress(0);

      const selected = e.target.files?.[0];
      if (!selected) return;

      if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(
          `File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB. Your file is ${formatFileSize(selected.size)}.`,
        );
        return;
      }

      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (gifUrl) URL.revokeObjectURL(gifUrl);

      setFile(selected);
      setVideoUrl(URL.createObjectURL(selected));
      setGifUrl(null);
      setGifSize(0);
      if (!hasTrackedStarted.current) {
        trackStarted();
        hasTrackedStarted.current = true;
      }
    },
    [videoUrl, gifUrl, trackStarted],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setError(null);

      const dropped = e.dataTransfer.files[0];
      if (!dropped) return;

      const ext = getFileExtension(dropped);
      if (!["mp4", "webm", "mov", "avi"].includes(ext)) {
        setError("Unsupported format. Please upload MP4, WebM, MOV, or AVI.");
        return;
      }

      if (dropped.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(
          `File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB. Your file is ${formatFileSize(dropped.size)}.`,
        );
        return;
      }

      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (gifUrl) URL.revokeObjectURL(gifUrl);

      setFile(dropped);
      setVideoUrl(URL.createObjectURL(dropped));
      setGifUrl(null);
      setGifSize(0);
      if (!hasTrackedStarted.current) {
        trackStarted();
        hasTrackedStarted.current = true;
      }
    },
    [videoUrl, gifUrl, trackStarted],
  );

  const handleConvert = useCallback(async () => {
    if (!file) return;

    setConverting(true);
    setProgress(0);
    setError(null);
    setGifUrl(null);
    setGifSize(0);

    try {
      const ffmpeg = await loadFFmpeg((p) => setProgress(p));

      const ext = getFileExtension(file);
      const inputName = `input.${ext}`;
      const outputName = "output.gif";

      await ffmpeg.writeFile(inputName, await fetchFile(file));

      const scaleFilter =
        width === -1
          ? `fps=${fps}`
          : `fps=${fps},scale=${width}:-1:flags=lanczos`;

      await ffmpeg.exec([
        "-i",
        inputName,
        "-vf",
        scaleFilter,
        "-y",
        outputName,
      ]);

      const data = await ffmpeg.readFile(outputName);
      const uint8 = data as Uint8Array;
      const blob = new Blob([new Uint8Array(uint8)], { type: "image/gif" });

      if (gifUrl) URL.revokeObjectURL(gifUrl);

      setGifUrl(URL.createObjectURL(blob));
      setGifSize(blob.size);

      // Cleanup temp files
      try {
        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);
      } catch {
        // Non-critical cleanup error
      }
    } catch (err) {
      console.error("Conversion error:", err);
      setError(
        "Conversion failed. The video may be too large or in an unsupported codec. Try a smaller file or different format.",
      );
    } finally {
      setConverting(false);
    }
  }, [file, fps, width, gifUrl]);

  const handleDownload = useCallback(async () => {
    if (!gifUrl || !file) return;
    await gatedDownload(() => {
      const a = document.createElement("a");
      a.href = gifUrl;
      a.download = `${file.name.replace(/\.[^.]+$/, "")}-converted.gif`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }, [gifUrl, file, gatedDownload]);

  const handleReset = useCallback(() => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    if (gifUrl) URL.revokeObjectURL(gifUrl);
    setFile(null);
    setVideoUrl(null);
    setGifUrl(null);
    setGifSize(0);
    setProgress(0);
    setError(null);
    setConverting(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [videoUrl, gifUrl]);

  const isLargeFile = file && file.size > LARGE_FILE_THRESHOLD_MB * 1024 * 1024;

  return (
    <>
      <JsonLd data={jsonLdSchema} />

      {/* Header */}
      <section className="container mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-20 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-primary mb-4">
            Free Tool
          </span>
          <h1 className="text-3xl sm:text-5xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
            Video to GIF
            <br />
            <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Convert MP4, WebM, MOV, and AVI videos to high-quality GIF
            animations. All processing happens in your browser.
          </p>
        </motion.div>
      </section>

      {/* Main content */}
      <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          {/* Upload area */}
          {!file && (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="relative border-2 border-dashed border-[#2A2535] rounded-xl p-10 sm:p-14 text-center hover:border-[#2DD4BF]/30 transition-colors cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  fileInputRef.current?.click();
              }}
              role="button"
              tabIndex={0}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_FORMATS}
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-[#16131E] border border-[#2A2535] flex items-center justify-center group-hover:border-[#2DD4BF]/20 transition-colors">
                <Upload className="w-6 h-6 text-[#71717A] group-hover:text-[#2DD4BF] transition-colors" />
              </div>
              <p className="text-[#EDEDEF] font-[Inter] text-base font-medium mb-2">
                Drop your video here or click to browse
              </p>
              <p className="text-[#71717A] font-[Inter] text-sm">
                MP4, WebM, MOV, AVI — up to {MAX_FILE_SIZE_MB}MB
              </p>
            </div>
          )}

          {/* Video preview + settings */}
          <AnimatePresence>
            {file && videoUrl && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                {/* Video preview */}
                <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden mb-6">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2A2535]">
                    <Play className="w-4 h-4 text-primary" />
                    <span className="text-sm font-[Inter] font-medium text-[#EDEDEF] truncate">
                      {file.name}
                    </span>
                    <span className="ml-auto font-mono text-[11px] text-[#71717A] shrink-0">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                  <div className="relative aspect-video bg-[#0C0A12]">
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      controls
                      className="w-full h-full object-contain"
                      preload="metadata"
                    >
                      <track kind="captions" />
                    </video>
                  </div>
                </div>

                {/* Large file warning */}
                {isLargeFile && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 mb-6 p-4 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20"
                  >
                    <TriangleAlert className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    <p className="text-[#F59E0B] text-sm font-[Inter]">
                      This file is over {LARGE_FILE_THRESHOLD_MB}MB. Conversion
                      may take significantly longer depending on your device.
                      Single-thread FFmpeg is used when multi-thread is not
                      available.
                    </p>
                  </motion.div>
                )}

                {/* Settings */}
                <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-5 mb-6">
                  <div className="flex items-center gap-2 mb-5">
                    <Settings2 className="w-4 h-4 text-primary" />
                    <h2 className="text-sm font-[Syne] font-bold text-[#EDEDEF] uppercase tracking-wider">
                      Settings
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Frame rate */}
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2">
                        Frame Rate
                      </label>
                      <div className="flex gap-2">
                        {FPS_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setFps(option)}
                            className={`flex-1 h-10 rounded-lg font-mono text-sm transition-all min-h-[44px] ${
                              fps === option
                                ? "bg-[#2DD4BF] text-[#042F2E] font-semibold"
                                : "bg-[#0C0A12] border border-[#2A2535] text-[#71717A] hover:border-[#2DD4BF]/30 hover:text-[#EDEDEF]"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      <p className="font-mono text-[10px] text-[#71717A]/60 mt-1.5">
                        fps — higher = smoother, larger file
                      </p>
                    </div>

                    {/* Width */}
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2">
                        Width
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {WIDTH_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setWidth(option.value)}
                            className={`flex-1 h-10 rounded-lg font-mono text-sm transition-all min-h-[44px] min-w-[60px] ${
                              width === option.value
                                ? "bg-[#2DD4BF] text-[#042F2E] font-semibold"
                                : "bg-[#0C0A12] border border-[#2A2535] text-[#71717A] hover:border-[#2DD4BF]/30 hover:text-[#EDEDEF]"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                      <p className="font-mono text-[10px] text-[#71717A]/60 mt-1.5">
                        px — height scales proportionally
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={converting}
                    className="h-12 px-5 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] font-mono text-sm uppercase tracking-wider hover:border-[#2DD4BF]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={handleConvert}
                    disabled={converting}
                    className="flex-1 h-12 px-6 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                  >
                    {converting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Converting...
                      </span>
                    ) : (
                      "Convert to GIF"
                    )}
                  </button>
                </div>

                {/* Progress bar */}
                <AnimatePresence>
                  {converting && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mt-5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                          Processing
                        </span>
                        <span className="font-mono text-[11px] text-[#2DD4BF]">
                          {progress}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#0C0A12] border border-[#2A2535] overflow-hidden">
                        <motion.div
                          className="h-full bg-[#2DD4BF] rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-[#FB7185]/10 border border-[#FB7185]/20"
              >
                <AlertCircle className="w-4 h-4 text-[#FB7185] shrink-0" />
                <p className="text-[#FB7185] text-sm font-[Inter]">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* GIF result */}
        <AnimatePresence>
          {gifUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="max-w-2xl mx-auto mt-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <Film className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
                  Result
                </h2>
                <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                  {formatFileSize(gifSize)}
                </span>
              </div>

              <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden">
                <div className="relative bg-[#0C0A12] flex items-center justify-center p-4">
                  {/* biome-ignore lint/performance/noImgElement: Dynamic blob URL for converted GIF output */}
                  <img
                    src={gifUrl}
                    alt="Converted GIF preview"
                    className="max-w-full max-h-[500px] object-contain rounded"
                  />
                </div>
                <div className="p-4 border-t border-[#2A2535]">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 h-12 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all min-h-[44px]"
                  >
                    <Download className="w-4 h-4" />
                    Download GIF
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-xl sm:text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                title: "Upload Video",
                desc: "Select an MP4, WebM, MOV, or AVI file from your device.",
              },
              {
                step: "02",
                title: "Customize",
                desc: "Choose your preferred frame rate and output width for the GIF.",
              },
              {
                step: "03",
                title: "Download",
                desc: "Convert and download your GIF. Everything stays in your browser.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.1 }}
                className="bg-[#16131E] border border-[#2A2535] rounded-xl p-5"
              >
                <span className="font-mono text-[11px] text-primary uppercase tracking-wider">
                  Step {item.step}
                </span>
                <h3 className="text-base font-[Syne] font-bold text-[#EDEDEF] mt-2 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}

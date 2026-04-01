"use client";

import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";
import { AnimatePresence, motion } from "framer-motion";
import JSZip from "jszip";
import {
  AlertCircle,
  Camera,
  ChevronLeft,
  ChevronRight,
  Download,
  ImageIcon,
  Loader2,
  Maximize2,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const ACCEPTED_FORMATS = ".mp4,.webm,.mov";
const MAX_FILE_SIZE_MB = 500;

type OutputFormat = "png" | "jpg";

type CapturedFrame = {
  id: string;
  blob: Blob;
  url: string;
  timestamp: number;
  width: number;
  height: number;
};

const ease = [0.16, 1, 0.3, 1] as const;

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Video Frame Extractor",
  url: "https://converterup.com/tools/video-frame-extractor",
  description:
    "Extract frames and screenshots from any video file. Supports MP4, WebM, and MOV. Capture, preview, and download frames as PNG or JPG. Free, fast, and 100% browser-based.",
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

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 100);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function VideoFrameExtractor() {
  return (
    <ToolGate toolName="video-frame-extractor">
      {({ gatedDownload, trackStarted }) => (
        <VideoFrameExtractorContent
          gatedDownload={gatedDownload}
          trackStarted={trackStarted}
        />
      )}
    </ToolGate>
  );
}

function VideoFrameExtractorContent({
  gatedDownload,
  trackStarted,
}: {
  gatedDownload: (downloadFn: () => void | Promise<void>) => Promise<void>;
  trackStarted: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [frames, setFrames] = useState<CapturedFrame[]>([]);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [error, setError] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [lightboxFrame, setLightboxFrame] = useState<CapturedFrame | null>(
    null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTrackedStarted = useRef(false);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      for (const frame of frames) {
        URL.revokeObjectURL(frame.url);
      }
    };
    // Only run cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);

      const selected = e.target.files?.[0];
      if (!selected) return;

      if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(
          `File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB. Your file is ${formatFileSize(selected.size)}.`,
        );
        return;
      }

      // Revoke old URL
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      // Revoke old frame URLs
      for (const frame of frames) {
        URL.revokeObjectURL(frame.url);
      }

      const url = URL.createObjectURL(selected);
      setFile(selected);
      setVideoUrl(url);
      setFrames([]);
      setLightboxFrame(null);
      if (!hasTrackedStarted.current) {
        trackStarted();
        hasTrackedStarted.current = true;
      }
    },
    [videoUrl, frames, trackStarted],
  );

  const captureFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setCapturing(true);
    setError(null);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Failed to create canvas context.");
        setCapturing(false);
        return;
      }

      ctx.drawImage(video, 0, 0);

      const mimeType = outputFormat === "jpg" ? "image/jpeg" : "image/png";
      const quality = outputFormat === "jpg" ? 0.92 : undefined;

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError(
              "Failed to capture frame. Try seeking to a different position.",
            );
            setCapturing(false);
            return;
          }

          const url = URL.createObjectURL(blob);
          const newFrame: CapturedFrame = {
            id: `frame-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            blob,
            url,
            timestamp: video.currentTime,
            width: video.videoWidth,
            height: video.videoHeight,
          };

          setFrames((prev) => [...prev, newFrame]);
          setCapturing(false);
        },
        mimeType,
        quality,
      );
    } catch {
      setError("Failed to capture frame. The video may not be fully loaded.");
      setCapturing(false);
    }
  }, [outputFormat]);

  const deleteFrame = useCallback((frameId: string) => {
    setFrames((prev) => {
      const frame = prev.find((f) => f.id === frameId);
      if (frame) URL.revokeObjectURL(frame.url);
      return prev.filter((f) => f.id !== frameId);
    });
    setLightboxFrame((prev) => (prev?.id === frameId ? null : prev));
  }, []);

  const downloadFrame = useCallback(
    async (frame: CapturedFrame) => {
      await gatedDownload(() => {
        const ext = outputFormat === "jpg" ? "jpg" : "png";
        const a = document.createElement("a");
        a.href = frame.url;
        a.download = `frame-${formatTimestamp(frame.timestamp).replace(/[:.]/g, "-")}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    },
    [outputFormat, gatedDownload],
  );

  const downloadAllFrames = useCallback(async () => {
    if (frames.length === 0) return;

    setDownloadingAll(true);
    try {
      await gatedDownload(async () => {
        const zip = new JSZip();
        const ext = outputFormat === "jpg" ? "jpg" : "png";

        for (let i = 0; i < frames.length; i++) {
          const frame = frames[i];
          const filename = `frame-${(i + 1).toString().padStart(3, "0")}-${formatTimestamp(frame.timestamp).replace(/[:.]/g, "-")}.${ext}`;
          zip.file(filename, frame.blob);
        }

        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = url;
        a.download = `frames-${file?.name?.replace(/\.[^.]+$/, "") || "video"}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    } catch {
      setError("Failed to create ZIP file. Please try again.");
    }
    setDownloadingAll(false);
  }, [frames, outputFormat, file, gatedDownload]);

  const seekBy = useCallback((seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(
      0,
      Math.min(video.duration, video.currentTime + seconds),
    );
  }, []);

  const resetAll = useCallback(() => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    for (const frame of frames) {
      URL.revokeObjectURL(frame.url);
    }
    setFile(null);
    setVideoUrl(null);
    setFrames([]);
    setError(null);
    setLightboxFrame(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [videoUrl, frames]);

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
            Video Frame
            <br />
            <span className="gradient-text">Extractor</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Capture screenshots from any video file. Seek to the perfect moment,
            grab frames, and download them as PNG or JPG.
          </p>
        </motion.div>
      </section>

      {/* Main content */}
      <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Upload / Video area */}
          {!videoUrl ? (
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  fileInputRef.current?.click();
              }}
              className="flex flex-col items-center justify-center gap-4 p-12 rounded-xl border-2 border-dashed border-[#2A2535] bg-[#16131E] hover:border-[#2DD4BF]/30 transition-colors cursor-pointer min-h-[240px]"
            >
              <div className="w-14 h-14 rounded-xl bg-[#0C0A12] border border-[#2A2535] flex items-center justify-center">
                <Upload className="w-6 h-6 text-[#2DD4BF]" />
              </div>
              <div className="text-center">
                <p className="text-[#EDEDEF] font-[Inter] font-medium mb-1">
                  Click to upload a video
                </p>
                <p className="text-[#71717A] font-mono text-[11px] uppercase tracking-wider">
                  MP4, WebM, MOV — up to {MAX_FILE_SIZE_MB}MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_FORMATS}
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Video player */}
              <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden">
                <div className="relative bg-black">
                  {/* biome-ignore lint/a11y/useMediaCaption: User-uploaded local video files with no captions available */}
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    className="w-full max-h-[480px] object-contain"
                  />
                </div>

                {/* Controls bar */}
                <div className="p-4 flex flex-wrap items-center gap-3 border-t border-[#2A2535]">
                  {/* Seek buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => seekBy(-5)}
                      className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] min-w-[44px]"
                      title="Back 5 seconds"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => seekBy(-1)}
                      className="flex items-center justify-center px-2 h-10 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#71717A] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] font-mono text-[11px]"
                      title="Back 1 second"
                    >
                      -1s
                    </button>
                    <button
                      type="button"
                      onClick={() => seekBy(-0.04)}
                      className="flex items-center justify-center px-2 h-10 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#71717A] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] font-mono text-[11px]"
                      title="Back 1 frame (~1/25s)"
                    >
                      -1f
                    </button>
                    <button
                      type="button"
                      onClick={() => seekBy(0.04)}
                      className="flex items-center justify-center px-2 h-10 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#71717A] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] font-mono text-[11px]"
                      title="Forward 1 frame (~1/25s)"
                    >
                      +1f
                    </button>
                    <button
                      type="button"
                      onClick={() => seekBy(1)}
                      className="flex items-center justify-center px-2 h-10 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#71717A] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] font-mono text-[11px]"
                      title="Forward 1 second"
                    >
                      +1s
                    </button>
                    <button
                      type="button"
                      onClick={() => seekBy(5)}
                      className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] min-w-[44px]"
                      title="Forward 5 seconds"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Format selector */}
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                      Format
                    </span>
                    <div className="flex rounded-lg border border-[#2A2535] overflow-hidden">
                      {(["png", "jpg"] as const).map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => setOutputFormat(fmt)}
                          className={`px-3 h-10 font-mono text-[11px] uppercase tracking-wider transition-colors min-h-[44px] ${
                            outputFormat === fmt
                              ? "bg-[#2DD4BF] text-[#042F2E] font-semibold"
                              : "bg-[#0C0A12] text-[#71717A] hover:text-[#EDEDEF]"
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Capture button */}
                  <button
                    type="button"
                    onClick={captureFrame}
                    disabled={capturing}
                    className="flex items-center gap-2 h-12 px-6 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                  >
                    {capturing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                    Capture Frame
                  </button>
                </div>
              </div>

              {/* File info & reset */}
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[11px] text-[#71717A] truncate">
                  {file?.name} — {file ? formatFileSize(file.size) : ""}
                </p>
                <button
                  type="button"
                  onClick={resetAll}
                  className="text-[#71717A] hover:text-[#FB7185] font-mono text-[11px] uppercase tracking-wider transition-colors shrink-0"
                >
                  Remove video
                </button>
              </div>
            </div>
          )}

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

        {/* Captured frames gallery */}
        <AnimatePresence>
          {frames.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="max-w-5xl mx-auto mt-10 sm:mt-14"
            >
              <div className="flex items-center gap-2 mb-6">
                <ImageIcon className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
                  Captured Frames
                </h2>
                <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                  {frames.length} frame{frames.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {frames.map((frame, i) => (
                  <motion.div
                    key={frame.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease, delay: i * 0.05 }}
                    className="group bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden hover:border-[#2DD4BF]/20 transition-colors duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxFrame(frame)}
                      className="relative w-full aspect-video bg-[#0C0A12] cursor-pointer"
                    >
                      {/* biome-ignore lint/a11y/useAltText: Dynamically generated frame captures */}
                      <img
                        src={frame.url}
                        alt={`Frame at ${formatTimestamp(frame.timestamp)}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                        <Maximize2 className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] text-[#EDEDEF] truncate">
                          {formatTimestamp(frame.timestamp)}
                        </p>
                        <p className="font-mono text-[10px] text-[#71717A]">
                          {frame.width} x {frame.height}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => downloadFrame(frame)}
                          className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] min-w-[44px]"
                          title="Download frame"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteFrame(frame.id)}
                          className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#71717A] hover:border-[#FB7185]/30 hover:text-[#FB7185] transition-colors min-h-[44px] min-w-[44px]"
                          title="Delete frame"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Download all */}
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={downloadAllFrames}
                  disabled={downloadingAll}
                  className="flex items-center gap-2 h-12 px-8 rounded-lg border border-[#2A2535] bg-[#16131E] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] font-mono text-sm uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                >
                  {downloadingAll ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Download All as ZIP
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxFrame && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setLightboxFrame(null)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setLightboxFrame(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative max-w-[90vw] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={() => {}}
              >
                {/* biome-ignore lint/a11y/useAltText: Dynamically generated frame capture in lightbox */}
                <img
                  src={lightboxFrame.url}
                  alt={`Frame at ${formatTimestamp(lightboxFrame.timestamp)}`}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg"
                />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => downloadFrame(lightboxFrame)}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#16131E]/90 border border-[#2A2535] text-[#EDEDEF] hover:text-[#2DD4BF] transition-colors min-h-[44px] min-w-[44px]"
                    title="Download frame"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxFrame(null)}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#16131E]/90 border border-[#2A2535] text-[#EDEDEF] hover:text-[#FB7185] transition-colors min-h-[44px] min-w-[44px]"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 bg-[#16131E]/90 border border-[#2A2535] rounded-lg px-3 py-2">
                  <p className="font-mono text-[11px] text-[#EDEDEF]">
                    {formatTimestamp(lightboxFrame.timestamp)} —{" "}
                    {lightboxFrame.width} x {lightboxFrame.height}
                  </p>
                </div>
              </motion.div>
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
                desc: "Select an MP4, WebM, or MOV video file from your device.",
              },
              {
                step: "02",
                title: "Seek & Capture",
                desc: "Use the video controls to find the perfect moment, then capture the frame.",
              },
              {
                step: "03",
                title: "Download",
                desc: "Download individual frames or grab all of them as a ZIP file.",
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

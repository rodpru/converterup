"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Download,
  ImageIcon,
  Link as LinkIcon,
  Loader2,
  Lock,
  Unlink,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { createClient } from "@/lib/supabase/client";

const ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/avif",
];

const ACCEPTED_EXTENSIONS = ".png,.jpg,.jpeg,.webp,.gif,.avif";

type ImageInfo = {
  file: File;
  url: string;
  width: number;
  height: number;
};

type PresetSize = {
  label: string;
  width: number;
  height: number;
};

const PRESET_SIZES: PresetSize[] = [
  { label: "1920 x 1080", width: 1920, height: 1080 },
  { label: "1280 x 720", width: 1280, height: 720 },
  { label: "800 x 600", width: 800, height: 600 },
  { label: "640 x 480", width: 640, height: 480 },
];

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image Resizer",
  url: "https://converterup.com/tools/image-resizer",
  description:
    "Resize images directly in your browser. Lock aspect ratio, use presets, preview results, and download instantly. 100% client-side.",
  applicationCategory: "UtilityApplication",
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

const ease = [0.16, 1, 0.3, 1] as const;

function getMimeType(file: File): string {
  if (file.type && ACCEPTED_TYPES.includes(file.type)) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    case "avif":
      return "image/avif";
    default:
      return "image/png";
  }
}

function getExtension(mime: string): string {
  switch (mime) {
    case "image/png":
      return "png";
    case "image/jpeg":
      return "jpg";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    case "image/avif":
      return "avif";
    default:
      return "png";
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function ImageResizer() {
  const [authChecking, setAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [original, setOriginal] = useState<ImageInfo | null>(null);
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [resizedBlob, setResizedBlob] = useState<Blob | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [resizing, setResizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aspectRatio = useRef<number>(1);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setIsAuthenticated(!!data.user);
      setAuthChecking(false);
    });
  }, []);

  const loadImage = useCallback((file: File) => {
    setError(null);
    setResizedBlob(null);
    setResizedUrl(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError(
        "Unsupported format. Please upload a PNG, JPG, WebP, GIF, or AVIF image.",
      );
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setOriginal({
        file,
        url,
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
      setTargetWidth(img.naturalWidth);
      setTargetHeight(img.naturalHeight);
      aspectRatio.current = img.naturalWidth / img.naturalHeight;
    };
    img.onerror = () => {
      setError("Failed to load image. The file may be corrupted.");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) loadImage(file);
    },
    [loadImage],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) loadImage(file);
    },
    [loadImage],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleWidthChange = useCallback(
    (value: number) => {
      const w = Math.max(1, value);
      setTargetWidth(w);
      if (lockAspect) {
        setTargetHeight(Math.round(w / aspectRatio.current));
      }
    },
    [lockAspect],
  );

  const handleHeightChange = useCallback(
    (value: number) => {
      const h = Math.max(1, value);
      setTargetHeight(h);
      if (lockAspect) {
        setTargetWidth(Math.round(h * aspectRatio.current));
      }
    },
    [lockAspect],
  );

  const applyPresetPercent = useCallback(
    (pct: number) => {
      if (!original) return;
      const w = Math.round(original.width * pct);
      const h = Math.round(original.height * pct);
      setTargetWidth(w);
      setTargetHeight(h);
    },
    [original],
  );

  const applyPresetSize = useCallback(
    (preset: PresetSize) => {
      setTargetWidth(preset.width);
      setTargetHeight(preset.height);
      if (lockAspect) {
        aspectRatio.current = preset.width / preset.height;
      }
    },
    [lockAspect],
  );

  const resize = useCallback(async () => {
    if (!original) return;
    setResizing(true);
    setError(null);

    try {
      const img = new Image();
      img.src = original.url;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () =>
          reject(new Error("Failed to load image for resizing."));
      });

      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context unavailable.");

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const mime = getMimeType(original.file);
      const quality =
        mime === "image/png" || mime === "image/gif" ? undefined : 0.92;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error("Failed to export resized image."));
          },
          mime,
          quality,
        );
      });

      if (resizedUrl) URL.revokeObjectURL(resizedUrl);
      const newUrl = URL.createObjectURL(blob);
      setResizedBlob(blob);
      setResizedUrl(newUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    } finally {
      setResizing(false);
    }
  }, [original, targetWidth, targetHeight, resizedUrl]);

  const handleDownload = useCallback(() => {
    if (!resizedBlob || !original) return;
    const mime = getMimeType(original.file);
    const ext = getExtension(mime);
    const baseName = original.file.name.replace(/\.[^.]+$/, "");
    const filename = `${baseName}-${targetWidth}x${targetHeight}.${ext}`;

    const url = URL.createObjectURL(resizedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [resizedBlob, original, targetWidth, targetHeight]);

  if (authChecking) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 text-[#2DD4BF] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <JsonLd data={jsonLdSchema} />
        <section className="container mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-20 sm:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="max-w-xl mx-auto text-center"
          >
            <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-8 sm:p-12">
              <Lock className="w-10 h-10 text-[#2DD4BF] mx-auto mb-4" />
              <h1 className="text-2xl sm:text-3xl font-[Syne] font-bold text-[#EDEDEF] mb-3">
                Sign in to use this tool
              </h1>
              <p className="text-[#71717A] font-[Inter] text-sm sm:text-base mb-6">
                The Image Resizer requires a free account. Sign in to resize
                images directly in your browser.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all min-h-[44px]"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </section>
      </>
    );
  }

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
            Image
            <br />
            <span className="gradient-text">Resizer</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Resize images to any dimension. Lock aspect ratio, use presets, and
            download instantly. 100% client-side.
          </p>
        </motion.div>
      </section>

      {/* Upload / Controls */}
      <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          {!original ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  fileInputRef.current?.click();
              }}
              role="button"
              tabIndex={0}
              className="flex flex-col items-center justify-center gap-4 p-10 sm:p-16 border-2 border-dashed border-[#2A2535] rounded-xl bg-[#16131E] hover:border-[#2DD4BF]/30 transition-colors cursor-pointer"
            >
              <Upload className="w-8 h-8 text-[#71717A]" />
              <div className="text-center">
                <p className="text-[#EDEDEF] font-[Inter] text-sm font-medium mb-1">
                  Drop an image here or click to upload
                </p>
                <p className="text-[#71717A] font-mono text-[11px] uppercase tracking-wider">
                  PNG, JPG, WebP, GIF, AVIF
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Original info */}
              <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  <h2 className="text-base font-[Syne] font-bold text-[#EDEDEF]">
                    Original Image
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      if (original.url) URL.revokeObjectURL(original.url);
                      if (resizedUrl) URL.revokeObjectURL(resizedUrl);
                      setOriginal(null);
                      setResizedBlob(null);
                      setResizedUrl(null);
                      setError(null);
                    }}
                    className="ml-auto font-mono text-[11px] uppercase tracking-wider text-[#71717A] hover:text-[#2DD4BF] transition-colors"
                  >
                    Change
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full sm:w-40 h-28 bg-[#0C0A12] rounded-lg overflow-hidden shrink-0">
                    {/* biome-ignore lint/performance/noImgElement: Dynamic user-uploaded image preview */}
                    <img
                      src={original.url}
                      alt="Original"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <p className="text-sm font-[Inter] text-[#EDEDEF] truncate max-w-xs">
                      {original.file.name}
                    </p>
                    <p className="font-mono text-[11px] text-[#71717A]">
                      {original.width} x {original.height} px
                    </p>
                    <p className="font-mono text-[11px] text-[#71717A]">
                      {formatFileSize(original.file.size)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dimensions */}
              <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-base font-[Syne] font-bold text-[#EDEDEF]">
                    New Dimensions
                  </h2>
                </div>

                <div className="flex items-end gap-3 mb-5">
                  <div className="flex-1">
                    <label
                      htmlFor="width-input"
                      className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
                    >
                      Width (px)
                    </label>
                    <input
                      id="width-input"
                      type="number"
                      min={1}
                      value={targetWidth}
                      onChange={(e) =>
                        handleWidthChange(Number(e.target.value))
                      }
                      className="w-full h-12 px-4 border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 min-h-[44px] font-mono text-sm"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setLockAspect(!lockAspect)}
                    title={
                      lockAspect ? "Unlock aspect ratio" : "Lock aspect ratio"
                    }
                    className="flex items-center justify-center w-12 h-12 rounded-lg border border-[#2A2535] bg-[#0C0A12] hover:border-[#2DD4BF]/30 transition-colors min-h-[44px] min-w-[44px] shrink-0"
                  >
                    {lockAspect ? (
                      <LinkIcon className="w-4 h-4 text-[#2DD4BF]" />
                    ) : (
                      <Unlink className="w-4 h-4 text-[#71717A]" />
                    )}
                  </button>

                  <div className="flex-1">
                    <label
                      htmlFor="height-input"
                      className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
                    >
                      Height (px)
                    </label>
                    <input
                      id="height-input"
                      type="number"
                      min={1}
                      value={targetHeight}
                      onChange={(e) =>
                        handleHeightChange(Number(e.target.value))
                      }
                      className="w-full h-12 px-4 border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 min-h-[44px] font-mono text-sm"
                    />
                  </div>
                </div>

                {/* Presets */}
                <div className="space-y-3">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                    Scale
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => applyPresetPercent(0.5)}
                      className="h-9 px-4 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] font-mono text-[11px] uppercase tracking-wider hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px]"
                    >
                      50%
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPresetPercent(0.25)}
                      className="h-9 px-4 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] font-mono text-[11px] uppercase tracking-wider hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px]"
                    >
                      25%
                    </button>
                  </div>

                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#71717A] pt-2">
                    Common Sizes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_SIZES.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => applyPresetSize(preset)}
                        className="h-9 px-4 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] font-mono text-[11px] uppercase tracking-wider hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px]"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resize button */}
              <button
                type="button"
                onClick={resize}
                disabled={resizing || targetWidth < 1 || targetHeight < 1}
                className="w-full h-12 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              >
                {resizing ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Resizing
                  </span>
                ) : (
                  `Resize to ${targetWidth} x ${targetHeight}`
                )}
              </button>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-[#FB7185]/10 border border-[#FB7185]/20"
                  >
                    <AlertCircle className="w-4 h-4 text-[#FB7185] shrink-0" />
                    <p className="text-[#FB7185] text-sm font-[Inter]">
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result */}
              <AnimatePresence>
                {resizedUrl && resizedBlob && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <ImageIcon className="w-4 h-4 text-primary" />
                        <h2 className="text-base font-[Syne] font-bold text-[#EDEDEF]">
                          Resized Preview
                        </h2>
                      </div>

                      <div className="relative w-full max-h-80 bg-[#0C0A12] rounded-lg overflow-hidden mb-4">
                        {/* biome-ignore lint/performance/noImgElement: Dynamic resized image preview */}
                        <img
                          src={resizedUrl}
                          alt="Resized preview"
                          className="w-full h-full object-contain max-h-80"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <p className="font-mono text-[11px] text-[#71717A]">
                            {targetWidth} x {targetHeight} px
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[11px] text-[#71717A]">
                              Original: {formatFileSize(original.file.size)}
                            </span>
                            <span className="font-mono text-[11px] text-[#EDEDEF]">
                              New: {formatFileSize(resizedBlob.size)}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleDownload}
                          className="flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all min-h-[44px]"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
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
                title: "Upload",
                desc: "Drop or select any image file from your device.",
              },
              {
                step: "02",
                title: "Resize",
                desc: "Set custom dimensions, scale by percentage, or pick a preset.",
              },
              {
                step: "03",
                title: "Download",
                desc: "Preview the result and download your resized image instantly.",
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

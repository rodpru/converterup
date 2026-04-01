"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Download,
  ImageIcon,
  Loader2,
  Upload,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/avif"];
const ACCEPTED_EXTENSIONS = ".png,.jpg,.jpeg,.webp,.avif";

type CompressionResult = {
  originalSize: number;
  compressedSize: number;
  compressedUrl: string;
  compressedBlob: Blob;
  fileName: string;
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image Compressor",
  url: "https://converterup.com/tools/image-compressor",
  description:
    "Compress PNG, JPG, WebP, and AVIF images directly in your browser. Adjust quality, preview results, and download smaller files instantly.",
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

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getOutputMimeType(file: File): string {
  if (file.type === "image/png") return "image/png";
  if (file.type === "image/webp") return "image/webp";
  if (file.type === "image/avif") return "image/webp";
  return "image/jpeg";
}

function getFileExtension(mimeType: string): string {
  if (mimeType === "image/png") return ".png";
  if (mimeType === "image/webp") return ".webp";
  return ".jpg";
}

const ease = [0.16, 1, 0.3, 1] as const;

export function ImageCompressor() {
  return (
    <ToolGate toolName="image-compressor">
      {({ gatedDownload, trackStarted }) => (
        <ImageCompressorContent
          gatedDownload={gatedDownload}
          trackStarted={trackStarted}
        />
      )}
    </ToolGate>
  );
}

function ImageCompressorContent({
  gatedDownload,
  trackStarted,
}: {
  gatedDownload: (downloadFn: () => void | Promise<void>) => Promise<void>;
  trackStarted: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(75);
  const [compressing, setCompressing] = useState(false);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasTrackedStarted = useRef(false);

  const resetState = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (result?.compressedUrl) URL.revokeObjectURL(result.compressedUrl);
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  }, [previewUrl, result]);

  const handleFile = useCallback(
    (selectedFile: File) => {
      resetState();

      if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
        setError(
          "Unsupported format. Please upload a PNG, JPG, WebP, or AVIF image.",
        );
        return;
      }

      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      if (!hasTrackedStarted.current) {
        trackStarted();
        hasTrackedStarted.current = true;
      }
    },
    [resetState, trackStarted],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) handleFile(selectedFile);
    },
    [handleFile],
  );

  const compress = useCallback(async () => {
    if (!file) return;

    setCompressing(true);
    setError(null);
    setResult(null);

    try {
      const img = new Image();
      const loadPromise = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image."));
      });

      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
      await loadPromise;

      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not available.");

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available.");

      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(objectUrl);

      const outputMimeType = getOutputMimeType(file);
      const qualityParam = quality / 100;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error("Compression failed."));
          },
          outputMimeType,
          qualityParam,
        );
      });

      const compressedUrl = URL.createObjectURL(blob);
      const baseName = file.name.replace(/\.[^.]+$/, "");
      const ext = getFileExtension(outputMimeType);

      setResult({
        originalSize: file.size,
        compressedSize: blob.size,
        compressedUrl,
        compressedBlob: blob,
        fileName: `${baseName}-compressed${ext}`,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    } finally {
      setCompressing(false);
    }
  }, [file, quality]);

  const handleDownload = useCallback(async () => {
    if (!result) return;
    await gatedDownload(() => {
      const a = document.createElement("a");
      a.href = result.compressedUrl;
      a.download = result.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }, [result, gatedDownload]);

  const reductionPercent =
    result && result.originalSize > 0
      ? ((1 - result.compressedSize / result.originalSize) * 100).toFixed(1)
      : null;

  return (
    <>
      <JsonLd data={jsonLdSchema} />
      <canvas ref={canvasRef} className="hidden" />

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
            <span className="gradient-text">Compressor</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Compress PNG, JPG, WebP, and AVIF images directly in your browser.
            Adjust quality and download smaller files instantly.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed rounded-xl transition-colors cursor-pointer min-h-[200px] ${
                dragOver
                  ? "border-[#2DD4BF] bg-[#2DD4BF]/5"
                  : "border-[#2A2535] bg-[#16131E] hover:border-[#2DD4BF]/30"
              }`}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  fileInputRef.current?.click();
              }}
              role="button"
              tabIndex={0}
            >
              <Upload className="w-8 h-8 text-[#71717A]" />
              <div className="text-center">
                <p className="text-sm font-[Inter] text-[#EDEDEF] mb-1">
                  Drop an image here or click to browse
                </p>
                <p className="font-mono text-[11px] text-[#71717A] uppercase tracking-wider">
                  PNG, JPG, WebP, AVIF
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS}
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-6">
              {previewUrl && (
                <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden">
                  <div className="relative aspect-video bg-[#0C0A12] flex items-center justify-center">
                    {/* biome-ignore lint/a11y/useAltText: User-uploaded image preview */}
                    <img
                      src={result?.compressedUrl ?? previewUrl}
                      alt=""
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-[Inter] font-medium text-[#EDEDEF] truncate max-w-[200px] sm:max-w-none">
                        {file.name}
                      </p>
                      <p className="font-mono text-[11px] text-[#71717A]">
                        {formatFileSize(file.size)}
                        {result && (
                          <> &rarr; {formatFileSize(result.compressedSize)}</>
                        )}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        resetState();
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                      className="font-mono text-[11px] uppercase tracking-wider text-[#71717A] hover:text-[#FB7185] transition-colors min-h-[44px] px-3"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <label
                    htmlFor="quality-slider"
                    className="text-sm font-[Inter] font-medium text-[#EDEDEF]"
                  >
                    Quality
                  </label>
                  <span className="font-mono text-[11px] text-[#2DD4BF] uppercase tracking-wider">
                    {quality}%
                  </span>
                </div>
                <input
                  id="quality-slider"
                  type="range"
                  min={1}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[#2A2535] accent-[#2DD4BF] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2DD4BF] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#2DD4BF] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="font-mono text-[10px] text-[#71717A]">
                    Smaller file
                  </span>
                  <span className="font-mono text-[10px] text-[#71717A]">
                    Higher quality
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={compress}
                disabled={compressing}
                className="w-full h-12 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              >
                {compressing ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Compressing
                  </span>
                ) : (
                  "Compress Image"
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

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="bg-[#16131E] border border-[#2A2535] rounded-xl p-5 space-y-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ImageIcon className="w-4 h-4 text-primary" />
                      <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
                        Result
                      </h2>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="font-mono text-[11px] text-[#71717A] uppercase tracking-wider mb-1">
                          Original
                        </p>
                        <p className="text-sm font-[Inter] font-medium text-[#EDEDEF]">
                          {formatFileSize(result.originalSize)}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[11px] text-[#71717A] uppercase tracking-wider mb-1">
                          Compressed
                        </p>
                        <p className="text-sm font-[Inter] font-medium text-[#EDEDEF]">
                          {formatFileSize(result.compressedSize)}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[11px] text-[#71717A] uppercase tracking-wider mb-1">
                          Reduction
                        </p>
                        <p
                          className={`text-sm font-[Inter] font-medium ${
                            Number(reductionPercent) > 0
                              ? "text-[#2DD4BF]"
                              : "text-[#FB7185]"
                          }`}
                        >
                          {Number(reductionPercent) > 0
                            ? `-${reductionPercent}%`
                            : `+${Math.abs(Number(reductionPercent))}%`}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleDownload}
                      className="w-full h-12 rounded-lg flex items-center justify-center gap-2 border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors font-mono text-sm uppercase tracking-wider min-h-[44px]"
                    >
                      <Download className="w-4 h-4" />
                      Download Compressed Image
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </section>

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
                desc: "Drop or select a PNG, JPG, WebP, or AVIF image.",
              },
              {
                step: "02",
                title: "Adjust",
                desc: "Use the quality slider to balance size and clarity.",
              },
              {
                step: "03",
                title: "Download",
                desc: "Get your compressed image instantly, processed in-browser.",
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

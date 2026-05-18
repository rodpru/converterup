"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Download, Loader2, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import {
  convertHeicToBlob,
  type HeicOutputFormat,
  isHeicFile,
  loadHeifDecoder,
} from "@/lib/heic";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

const FORMAT_OPTIONS: {
  value: HeicOutputFormat;
  label: string;
  ext: string;
  lossy: boolean;
}[] = [
  { value: "image/jpeg", label: "JPG", ext: "jpg", lossy: true },
  { value: "image/png", label: "PNG", ext: "png", lossy: false },
  { value: "image/webp", label: "WebP", ext: "webp", lossy: true },
];

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HEIC to JPG Converter",
  url: "https://converterup.com/tools/heic-to-jpg",
  description:
    "Convert iPhone HEIC photos to JPG, PNG, or WebP directly in your browser. Free, fast, and 100% private — files never leave your device.",
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

const ease = [0.16, 1, 0.3, 1] as const;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

interface ConversionResult {
  blob: Blob;
  url: string;
  filename: string;
  width: number;
  height: number;
}

export function HeicToJpgConverter() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<HeicOutputFormat>(
    "image/jpeg",
  );
  const [quality, setQuality] = useState(92);
  const [converting, setConverting] = useState(false);
  const [loadingDecoder, setLoadingDecoder] = useState(false);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const formatMeta = FORMAT_OPTIONS.find((f) => f.value === outputFormat);
  const isLossy = formatMeta?.lossy ?? true;

  const resetState = useCallback(() => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setError(null);
  }, [result]);

  const handleFile = useCallback(
    (selected: File) => {
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult(null);
      setError(null);

      if (!isHeicFile(selected)) {
        setError(
          "Unsupported format. Please upload a .heic or .heif file from your iPhone or camera.",
        );
        return;
      }
      if (selected.size > MAX_FILE_SIZE) {
        setError(
          `File too large. Max size is ${MAX_FILE_SIZE / (1024 * 1024)} MB.`,
        );
        return;
      }
      setFile(selected);
    },
    [result],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
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
      const selected = e.target.files?.[0];
      if (selected) handleFile(selected);
    },
    [handleFile],
  );

  const convert = useCallback(async () => {
    if (!file) return;

    setConverting(true);
    setError(null);
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);

    try {
      setLoadingDecoder(true);
      await loadHeifDecoder();
      setLoadingDecoder(false);

      const { blob, width, height } = await convertHeicToBlob(
        file,
        outputFormat,
        quality / 100,
      );

      const url = URL.createObjectURL(blob);
      const baseName = file.name.replace(/\.(heic|heif)$/i, "");
      const ext = formatMeta?.ext ?? "jpg";

      setResult({
        blob,
        url,
        filename: `${baseName}.${ext}`,
        width,
        height,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to convert HEIC file. Try a different photo.",
      );
    } finally {
      setLoadingDecoder(false);
      setConverting(false);
    }
  }, [file, outputFormat, quality, formatMeta, result]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [result]);

  const sizeChange =
    result && file
      ? ((result.blob.size / file.size - 1) * 100).toFixed(1)
      : null;

  return (
    <>
      <JsonLd data={jsonLdSchema} />

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
            HEIC to JPG
            <br />
            <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Convert iPhone HEIC photos to JPG, PNG, or WebP. Runs entirely in
            your browser — no upload, no signup, no tracking.
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
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  fileInputRef.current?.click();
              }}
              role="button"
              tabIndex={0}
              className={`relative flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed rounded-xl transition-colors cursor-pointer min-h-[200px] ${
                dragOver
                  ? "border-[#2DD4BF] bg-[#2DD4BF]/5"
                  : "border-[#2A2535] bg-[#16131E] hover:border-[#2DD4BF]/30"
              }`}
            >
              <Upload className="w-8 h-8 text-[#71717A]" />
              <div className="text-center">
                <p className="text-sm font-[Inter] text-[#EDEDEF] mb-1">
                  Drop a HEIC photo here or click to browse
                </p>
                <p className="font-mono text-[11px] text-[#71717A] uppercase tracking-wider">
                  .HEIC or .HEIF · up to 50 MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".heic,.heif,image/heic,image/heif,image/heic-sequence,image/heif-sequence"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          ) : (
            <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-[Inter] text-[#EDEDEF] truncate">
                    {file.name}
                  </p>
                  <p className="font-mono text-[11px] text-[#71717A] uppercase tracking-wider mt-1">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetState}
                  className="p-2 text-[#71717A] hover:text-[#FB7185] transition-colors"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label
                    htmlFor="heic-output-format"
                    className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
                  >
                    Output Format
                  </label>
                  <div id="heic-output-format" className="flex gap-1.5">
                    {FORMAT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setOutputFormat(opt.value)}
                        className={`flex-1 h-10 rounded-lg font-mono text-xs uppercase tracking-wider transition-all min-h-[44px] ${
                          outputFormat === opt.value
                            ? "bg-[#2DD4BF] text-[#042F2E] font-semibold"
                            : "border border-[#2A2535] bg-[#1C1825] text-[#71717A] hover:border-[#2DD4BF]/30"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="heic-quality"
                    className={`block font-mono text-[11px] uppercase tracking-wider mb-2 transition-colors ${
                      isLossy ? "text-[#71717A]" : "text-[#71717A]/40"
                    }`}
                  >
                    Quality {isLossy && <span>· {quality}%</span>}
                  </label>
                  <input
                    id="heic-quality"
                    type="range"
                    min={50}
                    max={100}
                    step={1}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    disabled={!isLossy}
                    className="w-full h-10 accent-[#2DD4BF] disabled:opacity-30 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={convert}
                disabled={converting}
                className="w-full h-12 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              >
                {converting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {loadingDecoder
                      ? "Loading decoder (~1 MB)"
                      : "Converting"}
                  </span>
                ) : (
                  `Convert to ${formatMeta?.label ?? "JPG"}`
                )}
              </button>
            </div>
          )}

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

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="max-w-2xl mx-auto mt-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Download className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
                  Converted Image
                </h2>
                <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                  {result.width} × {result.height}
                </span>
              </div>
              <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden">
                <div className="p-6 flex items-center justify-center checkered-bg">
                  {/* biome-ignore lint/a11y/useAltText: Dynamic converted image preview */}
                  <img
                    src={result.url}
                    alt="Converted output"
                    className="max-w-full max-h-[400px] object-contain rounded"
                  />
                </div>
                <div className="p-4 border-t border-[#2A2535] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex-1 grid grid-cols-2 gap-3 text-xs font-[Inter]">
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                        Output
                      </span>
                      <span className="text-[#EDEDEF]">
                        {formatFileSize(result.blob.size)}
                      </span>
                    </div>
                    {sizeChange && (
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                          vs HEIC
                        </span>
                        <span
                          className={
                            result.blob.size < (file?.size ?? 0)
                              ? "text-[#2DD4BF]"
                              : "text-[#FB7185]"
                          }
                        >
                          {result.blob.size < (file?.size ?? 0) ? "" : "+"}
                          {sizeChange}%
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="h-12 px-6 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-xs uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all min-h-[44px] flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download {formatMeta?.label}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

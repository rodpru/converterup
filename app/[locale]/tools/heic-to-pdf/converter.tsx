"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Download, FileText, Loader2, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { decodeHeic, isHeicFile, loadHeifDecoder } from "@/lib/heic";
import { canvasesToPdf, type PdfPageFit } from "@/lib/pdf";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB per file
const MAX_FILES = 20;
const MAX_TOTAL_SIZE = 200 * 1024 * 1024; // 200 MB total

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HEIC to PDF Converter",
  url: "https://converterup.com/tools/heic-to-pdf",
  description:
    "Convert iPhone HEIC photos to a single multi-page PDF directly in your browser. Free, fast, and 100% private — files never leave your device.",
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

interface PdfResult {
  blob: Blob;
  url: string;
  filename: string;
  pageCount: number;
}

export function HeicToPdfConverter() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [pageFit, setPageFit] = useState<PdfPageFit>("fit-a4");
  const [quality, setQuality] = useState(90);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(
    null,
  );
  const [loadingDecoder, setLoadingDecoder] = useState(false);
  const [result, setResult] = useState<PdfResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const reset = useCallback(() => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFiles([]);
    setResult(null);
    setError(null);
    setProgress(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [result]);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult(null);
      setError(null);

      const arr = Array.from(incoming);
      const rejected: string[] = [];
      const accepted: File[] = [];

      for (const f of arr) {
        if (!isHeicFile(f)) {
          rejected.push(`${f.name}: not a HEIC/HEIF file`);
          continue;
        }
        if (f.size > MAX_FILE_SIZE) {
          rejected.push(`${f.name}: exceeds 50 MB`);
          continue;
        }
        accepted.push(f);
      }

      const merged = [...files, ...accepted].slice(0, MAX_FILES);
      const totalSize = merged.reduce((acc, f) => acc + f.size, 0);

      if (merged.length >= MAX_FILES && files.length + accepted.length > MAX_FILES) {
        rejected.push(`Limit is ${MAX_FILES} files per PDF`);
      }
      if (totalSize > MAX_TOTAL_SIZE) {
        setError(
          `Total size exceeds ${MAX_TOTAL_SIZE / (1024 * 1024)} MB. Remove some files.`,
        );
        return;
      }

      setFiles(merged);
      if (rejected.length > 0) {
        setError(rejected.join(" · "));
      }
    },
    [files, result],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
    },
    [addFiles],
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
      if (e.target.files && e.target.files.length > 0) addFiles(e.target.files);
    },
    [addFiles],
  );

  const removeFile = useCallback((idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setResult((prev) => {
      if (prev?.url) URL.revokeObjectURL(prev.url);
      return null;
    });
  }, []);

  const convert = useCallback(async () => {
    if (files.length === 0) return;

    setConverting(true);
    setError(null);
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    setProgress({ done: 0, total: files.length });

    try {
      setLoadingDecoder(true);
      await loadHeifDecoder();
      setLoadingDecoder(false);

      const canvases: HTMLCanvasElement[] = [];
      for (let i = 0; i < files.length; i++) {
        const { canvas } = await decodeHeic(files[i]);
        canvases.push(canvas);
        setProgress({ done: i + 1, total: files.length });
      }

      const blob = await canvasesToPdf(canvases, {
        quality: quality / 100,
        pageFit,
      });

      // Free canvas memory
      for (const c of canvases) {
        c.width = 0;
        c.height = 0;
      }

      const url = URL.createObjectURL(blob);
      const baseName =
        files.length === 1
          ? files[0].name.replace(/\.(heic|heif)$/i, "")
          : `heic-photos-${files.length}`;

      setResult({
        blob,
        url,
        filename: `${baseName}.pdf`,
        pageCount: files.length,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to build PDF. Try fewer or smaller HEIC files.",
      );
    } finally {
      setLoadingDecoder(false);
      setConverting(false);
      setProgress(null);
    }
  }, [files, quality, pageFit, result]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [result]);

  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

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
            HEIC to PDF
            <br />
            <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Combine iPhone HEIC photos into a single multi-page PDF. Runs in
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
            className={`relative flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-xl transition-colors cursor-pointer min-h-[160px] ${
              dragOver
                ? "border-[#2DD4BF] bg-[#2DD4BF]/5"
                : "border-[#2A2535] bg-[#16131E] hover:border-[#2DD4BF]/30"
            }`}
          >
            <Upload className="w-7 h-7 text-[#71717A]" />
            <div className="text-center">
              <p className="text-sm font-[Inter] text-[#EDEDEF] mb-1">
                Drop HEIC photos here or click to browse
              </p>
              <p className="font-mono text-[11px] text-[#71717A] uppercase tracking-wider">
                Up to {MAX_FILES} files · 50 MB each · 200 MB total
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".heic,.heif,image/heic,image/heif,image/heic-sequence,image/heif-sequence"
              multiple
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          {files.length > 0 && (
            <div className="mt-5 bg-[#16131E] border border-[#2A2535] rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                  {files.length} photo{files.length === 1 ? "" : "s"} ·{" "}
                  {formatFileSize(totalSize)}
                </span>
                <button
                  type="button"
                  onClick={reset}
                  className="font-mono text-[11px] uppercase tracking-wider text-[#71717A] hover:text-[#FB7185] transition-colors px-2"
                >
                  Clear all
                </button>
              </div>
              <ul className="space-y-1.5 max-h-48 overflow-y-auto">
                {files.map((f, i) => (
                  <li
                    key={`${f.name}-${i}-${f.lastModified}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1C1825]"
                  >
                    <span className="font-mono text-[10px] text-[#71717A] w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-[Inter] text-[#EDEDEF] truncate flex-1">
                      {f.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#71717A] shrink-0">
                      {formatFileSize(f.size)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-[#71717A] hover:text-[#FB7185] shrink-0"
                      aria-label={`Remove ${f.name}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div>
                  <label
                    htmlFor="heic-pdf-page-fit"
                    className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
                  >
                    Page Size
                  </label>
                  <div id="heic-pdf-page-fit" className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPageFit("fit-a4")}
                      className={`flex-1 h-10 rounded-lg font-mono text-xs uppercase tracking-wider transition-all min-h-[44px] ${
                        pageFit === "fit-a4"
                          ? "bg-[#2DD4BF] text-[#042F2E] font-semibold"
                          : "border border-[#2A2535] bg-[#1C1825] text-[#71717A] hover:border-[#2DD4BF]/30"
                      }`}
                    >
                      A4
                    </button>
                    <button
                      type="button"
                      onClick={() => setPageFit("native")}
                      className={`flex-1 h-10 rounded-lg font-mono text-xs uppercase tracking-wider transition-all min-h-[44px] ${
                        pageFit === "native"
                          ? "bg-[#2DD4BF] text-[#042F2E] font-semibold"
                          : "border border-[#2A2535] bg-[#1C1825] text-[#71717A] hover:border-[#2DD4BF]/30"
                      }`}
                    >
                      Native
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="heic-pdf-quality"
                    className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
                  >
                    Quality · {quality}%
                  </label>
                  <input
                    id="heic-pdf-quality"
                    type="range"
                    min={60}
                    max={100}
                    step={5}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-10 accent-[#2DD4BF]"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={convert}
                disabled={converting}
                className="w-full h-12 mt-5 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              >
                {converting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {loadingDecoder
                      ? "Loading decoder (~1 MB)"
                      : progress
                        ? `Decoding ${progress.done}/${progress.total}`
                        : "Building PDF"}
                  </span>
                ) : (
                  `Build PDF (${files.length} page${files.length === 1 ? "" : "s"})`
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
                className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-[#FB7185]/10 border border-[#FB7185]/20"
              >
                <AlertCircle className="w-4 h-4 text-[#FB7185] shrink-0 mt-0.5" />
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
              <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-6 flex flex-col sm:flex-row items-center gap-5">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 shrink-0">
                  <FileText className="w-7 h-7 text-[#2DD4BF]" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm font-[Inter] font-medium text-[#EDEDEF]">
                    {result.filename}
                  </p>
                  <p className="font-mono text-[11px] text-[#71717A] uppercase tracking-wider mt-1">
                    {result.pageCount} page{result.pageCount === 1 ? "" : "s"} ·{" "}
                    {formatFileSize(result.blob.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="h-12 px-6 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-xs uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all min-h-[44px] flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

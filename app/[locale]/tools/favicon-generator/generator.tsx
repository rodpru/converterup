"use client";

import { AnimatePresence, motion } from "framer-motion";
import JSZip from "jszip";
import {
  AlertCircle,
  Download,
  ImageIcon,
  Loader2,
  Package,
  Upload,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";

const FAVICON_SIZES = [
  { size: 16, label: "16x16", description: "Browser tab" },
  { size: 32, label: "32x32", description: "Browser tab (HiDPI)" },
  { size: 48, label: "48x48", description: "Windows site icon" },
  { size: 64, label: "64x64", description: "Windows site icon (HiDPI)" },
  { size: 128, label: "128x128", description: "Chrome Web Store" },
  { size: 180, label: "180x180", description: "Apple Touch Icon" },
  { size: 192, label: "192x192", description: "Android Chrome" },
  { size: 512, label: "512x512", description: "PWA splash screen" },
] as const;

type GeneratedFavicon = {
  size: number;
  label: string;
  description: string;
  blob: Blob;
  url: string;
};

const ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
];
const ACCEPTED_EXTENSIONS = ".png,.jpg,.jpeg,.webp,.svg";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Favicon Generator",
  url: "https://converterup.com/tools/favicon-generator",
  description:
    "Generate favicons in all standard sizes from any PNG, JPG, WebP, or SVG image. Download individually or as a ZIP. 100% browser-based.",
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

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

function resizeToCanvas(img: HTMLImageElement, size: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Canvas context unavailable"));
      return;
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, size, size);
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to generate blob"));
      },
      "image/png",
      1,
    );
  });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function FaviconGenerator() {
  return (
    <ToolGate toolName="favicon-generator">
      {({ gatedDownload, trackStarted }) => (
        <FaviconGeneratorContent
          gatedDownload={gatedDownload}
          trackStarted={trackStarted}
        />
      )}
    </ToolGate>
  );
}

function FaviconGeneratorContent({
  gatedDownload,
  trackStarted,
}: {
  gatedDownload: (downloadFn: () => void | Promise<void>) => Promise<void>;
  trackStarted: () => void;
}) {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourcePreview, setSourcePreview] = useState<string | null>(null);
  const [favicons, setFavicons] = useState<GeneratedFavicon[]>([]);
  const [generating, setGenerating] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [downloadingSize, setDownloadingSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasTrackedStarted = useRef(false);

  const resetState = useCallback(() => {
    if (sourcePreview) URL.revokeObjectURL(sourcePreview);
    for (const fav of favicons) URL.revokeObjectURL(fav.url);
    setSourceFile(null);
    setSourcePreview(null);
    setFavicons([]);
    setError(null);
  }, [sourcePreview, favicons]);

  const handleFile = useCallback(
    (file: File) => {
      resetState();

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError(
          "Unsupported format. Please upload a PNG, JPG, WebP, or SVG image.",
        );
        return;
      }

      setSourceFile(file);
      setSourcePreview(URL.createObjectURL(file));
      if (!hasTrackedStarted.current) {
        trackStarted();
        hasTrackedStarted.current = true;
      }
    },
    [resetState, trackStarted],
  );

  const generateFavicons = useCallback(async () => {
    if (!sourcePreview) return;

    setGenerating(true);
    setError(null);

    try {
      const img = await loadImage(sourcePreview);
      const results: GeneratedFavicon[] = [];

      for (const { size, label, description } of FAVICON_SIZES) {
        const blob = await resizeToCanvas(img, size);
        results.push({
          size,
          label,
          description,
          blob,
          url: URL.createObjectURL(blob),
        });
      }

      setFavicons(results);
    } catch {
      setError("Failed to generate favicons. Please try a different image.");
    } finally {
      setGenerating(false);
    }
  }, [sourcePreview]);

  const handleDownloadSingle = useCallback(
    async (fav: GeneratedFavicon) => {
      setDownloadingSize(fav.size);
      await gatedDownload(() => {
        const name =
          fav.size === 180
            ? "apple-touch-icon.png"
            : `favicon-${fav.size}x${fav.size}.png`;
        downloadBlob(fav.blob, name);
      });
      setDownloadingSize(null);
    },
    [gatedDownload],
  );

  const handleDownloadAll = useCallback(async () => {
    if (favicons.length === 0) return;
    setDownloadingAll(true);

    try {
      await gatedDownload(async () => {
        const zip = new JSZip();
        for (const fav of favicons) {
          const name =
            fav.size === 180
              ? "apple-touch-icon.png"
              : `favicon-${fav.size}x${fav.size}.png`;
          zip.file(name, fav.blob);
        }

        const htmlSnippet = `<!-- Favicon tags - generated by ConverterUp -->
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
<link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
`;
        zip.file("favicon-tags.html", htmlSnippet);

        const content = await zip.generateAsync({ type: "blob" });
        downloadBlob(content, "favicons.zip");
      });
    } catch {
      setError("Failed to create ZIP file. Please try again.");
    } finally {
      setDownloadingAll(false);
    }
  }, [favicons, gatedDownload]);

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

  return (
    <>
      <JsonLd data={jsonLdSchema} />

      {/* Hero */}
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
            Favicon
            <br />
            <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Upload any image and generate favicons in all standard sizes.
            Download individually or grab them all as a ZIP.
          </p>
        </motion.div>
      </section>

      {/* Upload area */}
      <section className="container mx-auto px-4 sm:px-6 pb-6 sm:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          {!sourceFile ? (
            <div
              role="button"
              tabIndex={0}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  fileInputRef.current?.click();
              }}
              className={`flex flex-col items-center justify-center gap-3 p-10 sm:p-14 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 ${
                dragOver
                  ? "border-[#2DD4BF] bg-[#2DD4BF]/5"
                  : "border-[#2A2535] bg-[#16131E] hover:border-[#2DD4BF]/30"
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-[#2DD4BF]" />
              </div>
              <p className="text-sm font-[Inter] text-[#EDEDEF]">
                Drop your image here or click to browse
              </p>
              <p className="text-xs font-mono text-[#71717A]">
                PNG, JPG, WebP, or SVG
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS}
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
            </div>
          ) : (
            <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-[#0C0A12] border border-[#2A2535] flex items-center justify-center overflow-hidden shrink-0">
                  {sourcePreview && (
                    // biome-ignore lint/a11y/useAltText: Preview of user-uploaded image
                    <img
                      src={sourcePreview}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-[Inter] font-medium text-[#EDEDEF] truncate">
                    {sourceFile.name}
                  </p>
                  <p className="font-mono text-[11px] text-[#71717A]">
                    {(sourceFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetState();
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="h-10 px-4 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] text-sm font-mono hover:border-[#FB7185]/30 hover:text-[#FB7185] transition-colors min-h-[44px]"
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={generateFavicons}
                    disabled={generating}
                    className="h-10 px-6 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                  >
                    {generating ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating
                      </span>
                    ) : (
                      "Generate"
                    )}
                  </button>
                </div>
              </div>
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
      </section>

      {/* Generated favicons */}
      <AnimatePresence>
        {favicons.length > 0 && (
          <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="max-w-5xl mx-auto"
            >
              <div className="flex items-center gap-2 mb-6">
                <ImageIcon className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
                  Generated Favicons
                </h2>
                <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                  {favicons.length} sizes
                </span>
              </div>

              {/* Download All button */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
                className="mb-6"
              >
                <button
                  type="button"
                  onClick={handleDownloadAll}
                  disabled={downloadingAll}
                  className="flex items-center gap-2 h-12 px-6 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                >
                  {downloadingAll ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Package className="w-4 h-4" />
                  )}
                  {downloadingAll ? "Creating ZIP..." : "Download All (ZIP)"}
                </button>
              </motion.div>

              {/* Favicon grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {favicons.map((fav, i) => (
                  <motion.div
                    key={fav.size}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease, delay: i * 0.05 }}
                    className="group bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden hover:border-[#2DD4BF]/20 transition-colors duration-200"
                  >
                    {/* Preview on dark and light backgrounds */}
                    <div className="grid grid-cols-2">
                      <div className="aspect-square bg-[#0C0A12] flex items-center justify-center p-3">
                        {/* biome-ignore lint/a11y/useAltText: Generated favicon preview */}
                        <img
                          src={fav.url}
                          alt=""
                          className="max-w-full max-h-full object-contain"
                          style={{
                            width: Math.min(fav.size, 80),
                            height: Math.min(fav.size, 80),
                          }}
                        />
                      </div>
                      <div className="aspect-square bg-[#F5F5F5] flex items-center justify-center p-3">
                        {/* biome-ignore lint/a11y/useAltText: Generated favicon preview */}
                        <img
                          src={fav.url}
                          alt=""
                          className="max-w-full max-h-full object-contain"
                          style={{
                            width: Math.min(fav.size, 80),
                            height: Math.min(fav.size, 80),
                          }}
                        />
                      </div>
                    </div>

                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-[Inter] font-medium text-[#EDEDEF]">
                          {fav.label}
                        </p>
                        <p className="font-mono text-[10px] text-[#71717A] truncate">
                          {fav.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDownloadSingle(fav)}
                        disabled={downloadingSize === fav.size}
                        className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] min-w-[44px] disabled:opacity-50 shrink-0"
                        title={`Download ${fav.label}`}
                      >
                        {downloadingSize === fav.size ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      {/* How It Works */}
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
                desc: "Drop any PNG, JPG, WebP, or SVG image to use as your favicon source.",
              },
              {
                step: "02",
                title: "Generate",
                desc: "All standard favicon sizes are generated instantly using the Canvas API.",
              },
              {
                step: "03",
                title: "Download",
                desc: "Grab individual sizes or download everything as a ready-to-use ZIP.",
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

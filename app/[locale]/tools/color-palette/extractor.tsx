"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  Copy,
  Download,
  ImageIcon,
  Loader2,
  Palette,
  Upload,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const ACCEPTED_EXTENSIONS = ".png,.jpg,.jpeg,.webp";
const NUM_CLUSTERS = 8;
const MAX_SAMPLE_DIMENSION = 150;
const MAX_ITERATIONS = 10;

type RGBColor = [number, number, number];

type ExtractedColor = {
  rgb: RGBColor;
  hex: string;
  hsl: string;
  percentage: number;
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Color Palette Extractor",
  url: "https://converterup.com/tools/color-palette",
  description:
    "Extract dominant colors from any image. Upload PNG, JPG, or WebP files and get a beautiful color palette with HEX, RGB, and HSL values.",
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

function rgbToHex([r, g, b]: RGBColor): string {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

function rgbToHsl([r, g, b]: RGBColor): string {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rNorm) h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
    else if (max === gNorm) h = ((bNorm - rNorm) / d + 2) / 6;
    else h = ((rNorm - gNorm) / d + 4) / 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function colorDistance(a: RGBColor, b: RGBColor): number {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
}

/**
 * K-means color quantization on raw pixel data.
 * Samples pixels from the image, then clusters them into `k` groups.
 */
function extractColors(imageData: ImageData, k: number): ExtractedColor[] {
  const { data, width, height } = imageData;
  const pixels: RGBColor[] = [];

  // Sample every few pixels for performance
  const step = Math.max(1, Math.floor((width * height) / 10000));
  for (let i = 0; i < width * height; i += step) {
    const offset = i * 4;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    const a = data[offset + 3];
    // Skip very transparent pixels
    if (a < 128) continue;
    // Skip near-white and near-black pixels to get more interesting colors
    if (r > 250 && g > 250 && b > 250) continue;
    if (r < 5 && g < 5 && b < 5) continue;
    pixels.push([r, g, b]);
  }

  if (pixels.length === 0) {
    return [
      {
        rgb: [128, 128, 128],
        hex: "#808080",
        hsl: "hsl(0, 0%, 50%)",
        percentage: 100,
      },
    ];
  }

  // Initialize centroids using k-means++ strategy
  const centroids: RGBColor[] = [];
  centroids.push(pixels[Math.floor(Math.random() * pixels.length)]);

  for (let c = 1; c < k; c++) {
    const distances = pixels.map((p) => {
      let minDist = Number.POSITIVE_INFINITY;
      for (const centroid of centroids) {
        const dist = colorDistance(p, centroid);
        if (dist < minDist) minDist = dist;
      }
      return minDist;
    });
    const totalDist = distances.reduce((sum, d) => sum + d, 0);
    let rand = Math.random() * totalDist;
    for (let i = 0; i < distances.length; i++) {
      rand -= distances[i];
      if (rand <= 0) {
        centroids.push(pixels[i]);
        break;
      }
    }
    if (centroids.length === c) {
      // Fallback if loop didn't break
      centroids.push(pixels[Math.floor(Math.random() * pixels.length)]);
    }
  }

  // K-means iterations
  const assignments = new Int32Array(pixels.length);

  for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
    let changed = false;

    // Assign pixels to nearest centroid
    for (let i = 0; i < pixels.length; i++) {
      let minDist = Number.POSITIVE_INFINITY;
      let minIdx = 0;
      for (let j = 0; j < centroids.length; j++) {
        const dist = colorDistance(pixels[i], centroids[j]);
        if (dist < minDist) {
          minDist = dist;
          minIdx = j;
        }
      }
      if (assignments[i] !== minIdx) {
        assignments[i] = minIdx;
        changed = true;
      }
    }

    if (!changed) break;

    // Recalculate centroids
    const sums: number[][] = Array.from({ length: k }, () => [0, 0, 0]);
    const counts = new Int32Array(k);

    for (let i = 0; i < pixels.length; i++) {
      const cluster = assignments[i];
      sums[cluster][0] += pixels[i][0];
      sums[cluster][1] += pixels[i][1];
      sums[cluster][2] += pixels[i][2];
      counts[cluster]++;
    }

    for (let j = 0; j < k; j++) {
      if (counts[j] > 0) {
        centroids[j] = [
          Math.round(sums[j][0] / counts[j]),
          Math.round(sums[j][1] / counts[j]),
          Math.round(sums[j][2] / counts[j]),
        ];
      }
    }
  }

  // Count final assignments
  const finalCounts = new Int32Array(k);
  for (let i = 0; i < pixels.length; i++) {
    finalCounts[assignments[i]]++;
  }

  const results: ExtractedColor[] = [];
  for (let j = 0; j < k; j++) {
    if (finalCounts[j] > 0) {
      const rgb = centroids[j];
      results.push({
        rgb,
        hex: rgbToHex(rgb),
        hsl: rgbToHsl(rgb),
        percentage: Math.round((finalCounts[j] / pixels.length) * 100),
      });
    }
  }

  // Sort by dominance (most pixels first)
  results.sort((a, b) => b.percentage - a.percentage);

  return results;
}

function generatePalettePng(colors: ExtractedColor[]): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const swatchSize = 120;
    const padding = 24;
    const textHeight = 70;
    const cols = Math.min(colors.length, 4);
    const rows = Math.ceil(colors.length / cols);
    const canvasWidth = padding + cols * (swatchSize + padding);
    const canvasHeight =
      padding + rows * (swatchSize + textHeight + padding) + 20;

    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Could not create canvas context."));
      return;
    }

    // Background
    ctx.fillStyle = "#0C0A12";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Title
    ctx.fillStyle = "#EDEDEF";
    ctx.font = "bold 14px monospace";
    ctx.fillText("ConverterUp — Color Palette", padding, padding + 10);

    const startY = padding + 30;

    colors.forEach((color, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = padding + col * (swatchSize + padding);
      const y = startY + row * (swatchSize + textHeight + padding);

      // Rounded swatch
      ctx.fillStyle = color.hex;
      ctx.beginPath();
      ctx.roundRect(x, y, swatchSize, swatchSize, 12);
      ctx.fill();

      // Color values
      ctx.fillStyle = "#EDEDEF";
      ctx.font = "bold 11px monospace";
      ctx.fillText(color.hex, x, y + swatchSize + 18);
      ctx.font = "11px monospace";
      ctx.fillStyle = "#71717A";
      ctx.fillText(
        `rgb(${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]})`,
        x,
        y + swatchSize + 34,
      );
      ctx.fillText(color.hsl, x, y + swatchSize + 50);
    });

    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to generate palette image."));
      },
      "image/png",
      1,
    );
  });
}

const ease = [0.16, 1, 0.3, 1] as const;

export function ColorPaletteExtractor() {
  return (
    <ToolGate toolName="color-palette">
      {({ gatedDownload, trackStarted }) => (
        <ColorPaletteExtractorContent
          gatedDownload={gatedDownload}
          trackStarted={trackStarted}
        />
      )}
    </ToolGate>
  );
}

function ColorPaletteExtractorContent({
  gatedDownload,
  trackStarted,
}: {
  gatedDownload: (downloadFn: () => void | Promise<void>, persistable?: { data: Blob | string; filename: string }) => Promise<void>;
  trackStarted: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [colors, setColors] = useState<ExtractedColor[]>([]);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasTrackedStarted = useRef(false);

  const resetState = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setColors([]);
    setError(null);
  }, [previewUrl]);

  const handleFile = useCallback(
    (selectedFile: File) => {
      resetState();

      if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
        setError(
          "Unsupported format. Please upload a PNG, JPG, or WebP image.",
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

  const extract = useCallback(async () => {
    if (!file || !canvasRef.current) return;

    setExtracting(true);
    setError(null);
    setColors([]);

    try {
      const img = new Image();
      const loadPromise = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image."));
      });
      img.src = URL.createObjectURL(file);
      await loadPromise;

      const canvas = canvasRef.current;
      // Scale down for performance
      const scale = Math.min(
        1,
        MAX_SAMPLE_DIMENSION / Math.max(img.width, img.height),
      );
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) throw new Error("Could not create canvas context.");

      ctx.drawImage(img, 0, 0, w, h);
      const imageData = ctx.getImageData(0, 0, w, h);
      const extracted = extractColors(imageData, NUM_CLUSTERS);
      setColors(extracted);
      URL.revokeObjectURL(img.src);
    } catch {
      setError("Failed to extract colors. Please try a different image.");
    }

    setExtracting(false);
  }, [file]);

  // Auto-extract when a file is selected
  useEffect(() => {
    if (file && canvasRef.current) {
      extract();
    }
  }, [file, extract]);

  const copyToClipboard = useCallback(
    async (value: string, index: number, format: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopiedIndex(index);
        setCopiedFormat(format);
        setTimeout(() => {
          setCopiedIndex(null);
          setCopiedFormat(null);
        }, 1500);
      } catch {
        // Clipboard API might not be available
      }
    },
    [],
  );

  const handleDownloadPalette = useCallback(async () => {
    if (colors.length === 0) return;
    setDownloading(true);
    try {
      const blob = await generatePalettePng(colors);
      await gatedDownload(() => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "color-palette.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, { data: blob, filename: "color-palette.png" });
    } catch {
      setError("Failed to generate palette image.");
    }
    setDownloading(false);
  }, [colors, gatedDownload]);

  return (
    <>
      <JsonLd data={jsonLdSchema} />
      <canvas ref={canvasRef} className="hidden" />

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
            Color Palette
            <br />
            <span className="gradient-text">Extractor</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Upload any image and extract its dominant colors. Get HEX, RGB, and
            HSL values with one click.
          </p>
        </motion.div>
      </section>

      {/* Upload Area */}
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
              className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors duration-200 ${
                dragOver
                  ? "border-[#2DD4BF] bg-[#2DD4BF]/5"
                  : "border-[#2A2535] bg-[#16131E] hover:border-[#2DD4BF]/30"
              }`}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  fileInputRef.current?.click();
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS}
                onChange={handleFileInput}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-[#2DD4BF]" />
              </div>
              <p className="text-[#EDEDEF] font-[Inter] text-sm font-medium mb-1">
                Drop an image here or click to upload
              </p>
              <p className="text-[#71717A] font-mono text-[11px] uppercase tracking-wider">
                PNG, JPG, WebP
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-[#16131E] border border-[#2A2535] rounded-xl p-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-5 h-5 text-[#2DD4BF]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-[Inter] font-medium text-[#EDEDEF] truncate">
                    {file.name}
                  </p>
                  <p className="font-mono text-[11px] text-[#71717A]">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={resetState}
                className="text-sm text-[#71717A] hover:text-[#EDEDEF] font-[Inter] transition-colors min-h-[44px] px-3"
              >
                Change
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

        {/* Results */}
        <AnimatePresence>
          {colors.length > 0 && previewUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="max-w-5xl mx-auto mt-10 sm:mt-14"
            >
              {/* Image Preview + Palette Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-primary" />
                  <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
                    Extracted Palette
                  </h2>
                  <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                    {colors.length} colors
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadPalette}
                  disabled={downloading}
                  className="flex items-center gap-2 h-10 px-5 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                >
                  {downloading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Download Palette
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Uploaded Image */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden"
                >
                  {/* biome-ignore lint/a11y/useAltText: Dynamic user-uploaded image */}
                  <img
                    src={previewUrl}
                    alt="Uploaded image for color extraction"
                    className="w-full h-auto max-h-[400px] object-contain bg-[#0C0A12]"
                  />
                </motion.div>

                {/* Color Swatches */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  {colors.map((color, i) => (
                    <motion.div
                      key={color.hex}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease, delay: i * 0.06 }}
                      className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden hover:border-[#2DD4BF]/20 transition-colors duration-200"
                    >
                      {/* Swatch */}
                      <div
                        className="w-full h-20 sm:h-24"
                        style={{ backgroundColor: color.hex }}
                      />
                      {/* Color Values */}
                      <div className="p-3 space-y-1.5">
                        <ColorValueRow
                          label="HEX"
                          value={color.hex}
                          index={i}
                          format="hex"
                          copiedIndex={copiedIndex}
                          copiedFormat={copiedFormat}
                          onCopy={copyToClipboard}
                          textColor={color.hex}
                        />
                        <ColorValueRow
                          label="RGB"
                          value={`rgb(${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]})`}
                          index={i}
                          format="rgb"
                          copiedIndex={copiedIndex}
                          copiedFormat={copiedFormat}
                          onCopy={copyToClipboard}
                        />
                        <ColorValueRow
                          label="HSL"
                          value={color.hsl}
                          index={i}
                          format="hsl"
                          copiedIndex={copiedIndex}
                          copiedFormat={copiedFormat}
                          onCopy={copyToClipboard}
                        />
                        <div className="pt-1">
                          <span className="font-mono text-[10px] text-[#71717A]">
                            {color.percentage}% of image
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {extracting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto mt-10 text-center"
          >
            <Loader2 className="w-6 h-6 animate-spin text-[#2DD4BF] mx-auto mb-3" />
            <p className="text-[#71717A] text-sm font-[Inter]">
              Analyzing image colors...
            </p>
          </motion.div>
        )}
      </section>

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
                title: "Upload Image",
                desc: "Drop or select any PNG, JPG, or WebP image.",
              },
              {
                step: "02",
                title: "Extract Colors",
                desc: "Dominant colors are detected using pixel analysis, all in your browser.",
              },
              {
                step: "03",
                title: "Copy & Download",
                desc: "Click any color value to copy it, or download the full palette as PNG.",
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

function ColorValueRow({
  label,
  value,
  index,
  format,
  copiedIndex,
  copiedFormat,
  onCopy,
  textColor,
}: {
  label: string;
  value: string;
  index: number;
  format: string;
  copiedIndex: number | null;
  copiedFormat: string | null;
  onCopy: (value: string, index: number, format: string) => void;
  textColor?: string;
}) {
  const isCopied = copiedIndex === index && copiedFormat === format;

  return (
    <button
      type="button"
      onClick={() => onCopy(value, index, format)}
      className="w-full flex items-center justify-between gap-2 group/row rounded px-1.5 py-0.5 -mx-1.5 hover:bg-[#0C0A12] transition-colors min-h-[28px]"
      title={`Copy ${label} value`}
    >
      <span className="font-mono text-[11px] text-[#71717A] shrink-0 w-7 text-left">
        {label}
      </span>
      <span
        className="font-mono text-[11px] text-[#EDEDEF] truncate text-left flex-1"
        style={textColor ? { color: textColor } : undefined}
      >
        {value}
      </span>
      {isCopied ? (
        <Check className="w-3 h-3 text-[#2DD4BF] shrink-0" />
      ) : (
        <Copy className="w-3 h-3 text-[#71717A] opacity-0 group-hover/row:opacity-100 transition-opacity shrink-0" />
      )}
    </button>
  );
}

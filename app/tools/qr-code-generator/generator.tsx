"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Download, Loader2, QrCode, Type } from "lucide-react";
import QRCode from "qrcode";
import { useCallback, useEffect, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";

const SIZE_OPTIONS = [
  { value: 256, label: "256px" },
  { value: 512, label: "512px" },
  { value: 1024, label: "1024px" },
  { value: 2048, label: "2048px" },
] as const;

const ERROR_CORRECTION_LEVELS = [
  { value: "L", label: "Low (7%)" },
  { value: "M", label: "Medium (15%)" },
  { value: "Q", label: "Quartile (25%)" },
  { value: "H", label: "High (30%)" },
] as const;

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "QR Code Generator",
  url: "https://converterup.com/tools/qr-code-generator",
  description:
    "Generate custom QR codes with custom colors, sizes, and error correction levels. Download as PNG instantly. Free, fast, and 100% browser-based.",
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

export function QRCodeGenerator() {
  return (
    <ToolGate>
      {({ deduct }) => <QRCodeGeneratorContent deduct={deduct} />}
    </ToolGate>
  );
}

function QRCodeGeneratorContent({ deduct }: { deduct: () => Promise<void> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState(512);
  const [errorCorrection, setErrorCorrection] =
    useState<ErrorCorrectionLevel>("M");
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const generateQR = useCallback(async () => {
    if (!text.trim() || !canvasRef.current) return;

    setError(null);
    try {
      await QRCode.toCanvas(canvasRef.current, text, {
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorCorrection,
      });
    } catch {
      setError("Failed to generate QR code. Please check your input.");
    }
  }, [text, fgColor, bgColor, size, errorCorrection]);

  useEffect(() => {
    if (text.trim()) {
      generateQR();
    }
  }, [generateQR, text]);

  const handleDownload = useCallback(async () => {
    if (!canvasRef.current || !text.trim()) return;

    setDownloading(true);
    try {
      const dataUrl = canvasRef.current.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `qrcode-${size}px.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      await deduct();
    } catch {
      setError("Failed to download QR code. Please try again.");
    }
    setDownloading(false);
  }, [text, size, deduct]);

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
            QR Code
            <br />
            <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Generate custom QR codes with your own colors, sizes, and error
            correction levels. Download as PNG instantly.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-5">
              {/* Text/URL Input */}
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2">
                  Text or URL
                </label>
                <div className="relative">
                  <Type className="absolute left-4 top-4 w-4 h-4 text-[#71717A]" />
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text or URL to encode..."
                    rows={3}
                    className="w-full pl-11 pr-4 py-3 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 placeholder:text-[#71717A]/60 font-[Inter] text-sm resize-none"
                  />
                </div>
              </div>

              {/* Color Pickers */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2">
                    Foreground Color
                  </label>
                  <div className="flex items-center gap-3 h-12 px-3 border border-[#2A2535] bg-[#1C1825] rounded-lg min-h-[44px]">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-8 h-8 rounded border-none cursor-pointer bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none"
                    />
                    <span className="font-mono text-xs text-[#EDEDEF] uppercase">
                      {fgColor}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center gap-3 h-12 px-3 border border-[#2A2535] bg-[#1C1825] rounded-lg min-h-[44px]">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded border-none cursor-pointer bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none"
                    />
                    <span className="font-mono text-xs text-[#EDEDEF] uppercase">
                      {bgColor}
                    </span>
                  </div>
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2">
                  Size
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {SIZE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSize(option.value)}
                      className={`h-11 rounded-lg font-mono text-xs transition-colors min-h-[44px] ${
                        size === option.value
                          ? "bg-[#2DD4BF] text-[#042F2E] font-semibold"
                          : "border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] hover:border-[#2DD4BF]/30"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Correction */}
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2">
                  Error Correction
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {ERROR_CORRECTION_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() =>
                        setErrorCorrection(level.value as ErrorCorrectionLevel)
                      }
                      className={`h-11 rounded-lg font-mono text-xs transition-colors min-h-[44px] ${
                        errorCorrection === level.value
                          ? "bg-[#2DD4BF] text-[#042F2E] font-semibold"
                          : "border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] hover:border-[#2DD4BF]/30"
                      }`}
                      title={level.label}
                    >
                      {level.value}
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 font-mono text-[10px] text-[#71717A]">
                  {
                    ERROR_CORRECTION_LEVELS.find(
                      (l) => l.value === errorCorrection,
                    )?.label
                  }{" "}
                  — Higher correction allows more damage tolerance
                </p>
              </div>

              {/* Download Button */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={!text.trim() || downloading}
                className="flex items-center justify-center gap-2 w-full h-12 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              >
                {downloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Downloading
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download PNG
                  </>
                )}
              </button>
            </div>

            {/* Preview */}
            <div className="flex flex-col items-center">
              <div className="w-full bg-[#16131E] border border-[#2A2535] rounded-xl p-6 flex flex-col items-center">
                <div className="flex items-center gap-2 w-full mb-4">
                  <QrCode className="w-4 h-4 text-primary" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                    Preview
                  </span>
                </div>
                <div
                  className="relative flex items-center justify-center rounded-lg overflow-hidden"
                  style={{ backgroundColor: bgColor }}
                >
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto"
                    style={{ maxHeight: "400px" }}
                  />
                  {!text.trim() && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center w-64 h-64 bg-[#1C1825] rounded-lg">
                      <QrCode className="w-12 h-12 text-[#2A2535] mb-3" />
                      <p className="text-[#71717A] text-sm font-[Inter] text-center px-4">
                        Enter text or a URL to generate a QR code
                      </p>
                    </div>
                  )}
                </div>
                <p className="mt-3 font-mono text-[10px] text-[#71717A] text-center">
                  {size} x {size}px &middot; Error correction: {errorCorrection}
                </p>
              </div>
            </div>
          </div>

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

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl mx-auto mt-16 sm:mt-24"
        >
          <h2 className="text-xl sm:text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                title: "Enter Content",
                desc: "Type or paste any text, URL, or data you want to encode.",
              },
              {
                step: "02",
                title: "Customize",
                desc: "Pick your colors, size, and error correction level.",
              },
              {
                step: "03",
                title: "Download",
                desc: "Grab your QR code as a high-quality PNG file.",
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

"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Code2,
  Download,
  ImageIcon,
  Loader2,
  Upload,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";

const SCALE_OPTIONS = [
  { value: 1, label: "1x" },
  { value: 2, label: "2x" },
  { value: 3, label: "3x" },
  { value: 4, label: "4x" },
] as const;

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SVG to PNG Converter",
  url: "https://converterup.com/tools/svg-to-png",
  description:
    "Convert SVG files to PNG with custom scale and background options. Free, fast, and 100% browser-based.",
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

type InputMode = "upload" | "paste";

export function SvgToPngConverter() {
  return (
    <ToolGate toolName="svg-to-png">
      {({ gatedDownload, trackStarted }) => (
        <SvgToPngConverterContent
          gatedDownload={gatedDownload}
          trackStarted={trackStarted}
        />
      )}
    </ToolGate>
  );
}

function SvgToPngConverterContent({
  gatedDownload,
  trackStarted,
}: {
  gatedDownload: (downloadFn: () => void | Promise<void>) => Promise<void>;
  trackStarted: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasTrackedStarted = useRef(false);
  const [inputMode, setInputMode] = useState<InputMode>("upload");
  const [svgCode, setSvgCode] = useState("");
  const [svgBlobUrl, setSvgBlobUrl] = useState<string | null>(null);
  const [svgDimensions, setSvgDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [scale, setScale] = useState(2);
  const [bgMode, setBgMode] = useState<"transparent" | "custom">("transparent");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);

  const processSvg = useCallback((svgString: string) => {
    setError(null);
    setPngUrl(null);

    if (!svgString.trim()) {
      setSvgBlobUrl(null);
      setSvgDimensions(null);
      return;
    }

    if (!svgString.includes("<svg") || !svgString.includes("</svg>")) {
      setError("Invalid SVG content. Please provide a valid SVG.");
      return;
    }

    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    setSvgBlobUrl(url);

    const img = new Image();
    img.onload = () => {
      setSvgDimensions({
        width: img.naturalWidth || 300,
        height: img.naturalHeight || 150,
      });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      setError("Failed to parse SVG. Please check the file content.");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.includes("svg") && !file.name.endsWith(".svg")) {
        setError("Please upload an SVG file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        setSvgCode(text);
        processSvg(text);
        if (!hasTrackedStarted.current) {
          trackStarted();
          hasTrackedStarted.current = true;
        }
      };
      reader.onerror = () => setError("Failed to read the file.");
      reader.readAsText(file);
    },
    [processSvg, trackStarted],
  );

  const handlePaste = useCallback(
    (value: string) => {
      setSvgCode(value);
      processSvg(value);
      if (value.trim() && !hasTrackedStarted.current) {
        trackStarted();
        hasTrackedStarted.current = true;
      }
    },
    [processSvg, trackStarted],
  );

  const handleConvert = useCallback(async () => {
    if (!svgCode.trim() || !svgDimensions) return;

    setConverting(true);
    setError(null);
    setPngUrl(null);

    try {
      const blob = new Blob([svgCode], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load SVG image"));
        img.src = url;
      });

      const canvas = document.createElement("canvas");
      const outputWidth = svgDimensions.width * scale;
      const outputHeight = svgDimensions.height * scale;
      canvas.width = outputWidth;
      canvas.height = outputHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      if (bgMode === "custom") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, outputWidth, outputHeight);
      }

      ctx.drawImage(img, 0, 0, outputWidth, outputHeight);
      URL.revokeObjectURL(url);

      const pngBlob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );

      if (!pngBlob) throw new Error("Failed to generate PNG");

      const pngObjUrl = URL.createObjectURL(pngBlob);
      setPngUrl(pngObjUrl);
    } catch {
      setError("Failed to convert SVG to PNG. Please check your SVG content.");
    }

    setConverting(false);
  }, [svgCode, svgDimensions, scale, bgMode, bgColor]);

  const handleDownload = useCallback(async () => {
    if (!pngUrl) return;
    await gatedDownload(() => {
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = `converted-${scale}x.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }, [pngUrl, scale, gatedDownload]);

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
            SVG to PNG
            <br />
            <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Upload or paste SVG code and convert to high-resolution PNG. Choose
            your scale and background, all processed in your browser.
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
          {/* Input mode toggle */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setInputMode("upload")}
              className={`flex items-center gap-2 h-10 px-4 rounded-lg font-mono text-xs uppercase tracking-wider transition-all min-h-[44px] ${
                inputMode === "upload"
                  ? "bg-[#2DD4BF] text-[#042F2E] font-semibold"
                  : "border border-[#2A2535] bg-[#1C1825] text-[#71717A] hover:border-[#2DD4BF]/30"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setInputMode("paste")}
              className={`flex items-center gap-2 h-10 px-4 rounded-lg font-mono text-xs uppercase tracking-wider transition-all min-h-[44px] ${
                inputMode === "paste"
                  ? "bg-[#2DD4BF] text-[#042F2E] font-semibold"
                  : "border border-[#2A2535] bg-[#1C1825] text-[#71717A] hover:border-[#2DD4BF]/30"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Paste SVG Code
            </button>
          </div>

          {/* Upload area */}
          {inputMode === "upload" && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  fileInputRef.current?.click();
              }}
              className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-[#2A2535] bg-[#1C1825] rounded-xl cursor-pointer hover:border-[#2DD4BF]/30 transition-colors"
            >
              <Upload className="w-6 h-6 text-[#71717A] mb-2" />
              <p className="text-sm font-[Inter] text-[#71717A]">
                Click to upload an SVG file
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".svg,image/svg+xml"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Paste area */}
          {inputMode === "paste" && (
            <textarea
              value={svgCode}
              onChange={(e) => handlePaste(e.target.value)}
              placeholder="Paste your SVG code here..."
              className="w-full h-40 p-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 placeholder:text-[#71717A]/60 font-mono text-sm resize-none"
            />
          )}

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {/* Scale selector */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2">
                Scale
              </label>
              <div className="flex gap-1.5">
                {SCALE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setScale(opt.value)}
                    className={`flex-1 h-10 rounded-lg font-mono text-xs uppercase tracking-wider transition-all min-h-[44px] ${
                      scale === opt.value
                        ? "bg-[#2DD4BF] text-[#042F2E] font-semibold"
                        : "border border-[#2A2535] bg-[#1C1825] text-[#71717A] hover:border-[#2DD4BF]/30"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Background mode */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2">
                Background
              </label>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setBgMode("transparent")}
                  className={`flex-1 h-10 rounded-lg font-mono text-xs uppercase tracking-wider transition-all min-h-[44px] ${
                    bgMode === "transparent"
                      ? "bg-[#2DD4BF] text-[#042F2E] font-semibold"
                      : "border border-[#2A2535] bg-[#1C1825] text-[#71717A] hover:border-[#2DD4BF]/30"
                  }`}
                >
                  None
                </button>
                <button
                  type="button"
                  onClick={() => setBgMode("custom")}
                  className={`flex-1 h-10 rounded-lg font-mono text-xs uppercase tracking-wider transition-all min-h-[44px] ${
                    bgMode === "custom"
                      ? "bg-[#2DD4BF] text-[#042F2E] font-semibold"
                      : "border border-[#2A2535] bg-[#1C1825] text-[#71717A] hover:border-[#2DD4BF]/30"
                  }`}
                >
                  Color
                </button>
              </div>
            </div>

            {/* Color picker */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2">
                {bgMode === "custom" ? "Pick Color" : "Background Color"}
              </label>
              <div className="relative">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  disabled={bgMode === "transparent"}
                  className="w-full h-10 min-h-[44px] rounded-lg border border-[#2A2535] bg-[#1C1825] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Convert button */}
          <button
            type="button"
            onClick={handleConvert}
            disabled={converting || !svgCode.trim() || !svgDimensions}
            className="w-full h-12 mt-6 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
          >
            {converting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Converting
              </span>
            ) : (
              "Convert to PNG"
            )}
          </button>

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

        {/* SVG Preview */}
        <AnimatePresence>
          {svgCode.trim() && svgDimensions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="max-w-2xl mx-auto mt-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
                  SVG Preview
                </h2>
                <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                  {svgDimensions.width} x {svgDimensions.height}
                </span>
              </div>
              <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-6 flex items-center justify-center overflow-hidden checkered-bg">
                <div
                  className="max-w-full max-h-[400px] [&>svg]:max-w-full [&>svg]:max-h-[400px]"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: SVG preview requires innerHTML rendering from user-provided content
                  dangerouslySetInnerHTML={{ __html: svgCode }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PNG Result */}
        <AnimatePresence>
          {pngUrl && (
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
                  PNG Output
                </h2>
                {svgDimensions && (
                  <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                    {svgDimensions.width * scale} x{" "}
                    {svgDimensions.height * scale}
                  </span>
                )}
              </div>
              <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden">
                <div className="p-6 flex items-center justify-center checkered-bg">
                  {/* biome-ignore lint/a11y/useAltText: Dynamic PNG output preview from user conversion */}
                  <img
                    src={pngUrl}
                    alt="Converted PNG output"
                    className="max-w-full max-h-[400px] object-contain"
                  />
                </div>
                <div className="p-4 border-t border-[#2A2535]">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full h-12 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] font-mono text-sm uppercase tracking-wider hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PNG
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
                title: "Upload SVG",
                desc: "Upload an SVG file or paste SVG code directly.",
              },
              {
                step: "02",
                title: "Configure",
                desc: "Choose output scale (1x-4x) and background color.",
              },
              {
                step: "03",
                title: "Download",
                desc: "Convert and download your high-resolution PNG.",
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

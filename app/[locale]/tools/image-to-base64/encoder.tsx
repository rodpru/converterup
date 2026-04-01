"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  Clipboard,
  FileImage,
  ImageIcon,
  Upload,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";

const ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image to Base64 Encoder",
  url: "https://converterup.com/tools/image-to-base64",
  description:
    "Convert images (PNG, JPG, WebP, GIF, SVG) to Base64 strings instantly. Copy Base64 or Data URI with one click. Free, fast, and 100% browser-based.",
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

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(1)} ${units[i]}`;
}

export function ImageToBase64Encoder() {
  return (
    <ToolGate toolName="image-to-base64">
      {({ gatedDownload, trackStarted }) => (
        <ImageToBase64EncoderContent
          gatedDownload={gatedDownload}
          trackStarted={trackStarted}
        />
      )}
    </ToolGate>
  );
}

function ImageToBase64EncoderContent({
  gatedDownload,
  trackStarted,
}: {
  gatedDownload: (downloadFn: () => void | Promise<void>) => Promise<void>;
  trackStarted: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasTrackedStarted = useRef(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dataUri, setDataUri] = useState<string | null>(null);
  const [base64Only, setBase64Only] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<"base64" | "datauri" | null>(
    null,
  );

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setError(null);
      setDataUri(null);
      setBase64Only(null);
      setCopiedField(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError(
          "Unsupported file type. Please upload a PNG, JPG, WebP, GIF, or SVG image.",
        );
        return;
      }

      setFileName(file.name);

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      if (!hasTrackedStarted.current) {
        trackStarted();
        hasTrackedStarted.current = true;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setDataUri(result);
        const base64Part = result.split(",")[1] || "";
        setBase64Only(base64Part);
      };
      reader.onerror = () =>
        setError("Failed to read the file. Please try again.");
      reader.readAsDataURL(file);
    },
    [trackStarted],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file) return;

      const syntheticEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileUpload(syntheticEvent);
    },
    [handleFileUpload],
  );

  const copyToClipboard = useCallback(
    async (text: string, field: "base64" | "datauri") => {
      await gatedDownload(async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopiedField(field);
          setTimeout(() => setCopiedField(null), 2000);
        } catch {
          setError("Failed to copy to clipboard.");
        }
      });
    },
    [gatedDownload],
  );

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
            Image to Base64
            <br />
            <span className="gradient-text">Encoder</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Upload any image and get its Base64 string or Data URI instantly.
            Copy with one click, processed entirely in your browser.
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
          {/* Upload area */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                fileInputRef.current?.click();
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-[#2A2535] bg-[#1C1825] rounded-xl cursor-pointer hover:border-[#2DD4BF]/30 transition-colors"
          >
            <Upload className="w-6 h-6 text-[#71717A] mb-2" />
            <p className="text-sm font-[Inter] text-[#71717A]">
              Click or drag an image to upload
            </p>
            <p className="text-xs font-mono text-[#71717A]/60 mt-1">
              PNG, JPG, WebP, GIF, SVG
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              onChange={handleFileUpload}
              className="hidden"
            />
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

        {/* Results */}
        <AnimatePresence>
          {dataUri && base64Only && previewUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="max-w-2xl mx-auto mt-8 space-y-6"
            >
              {/* Preview */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
                    Image Preview
                  </h2>
                  {fileName && (
                    <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                      {fileName}
                    </span>
                  )}
                </div>
                <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-6 flex items-center justify-center checkered-bg">
                  {/* biome-ignore lint/a11y/useAltText: Dynamic user-uploaded image preview */}
                  <img
                    src={previewUrl}
                    alt="Uploaded image preview"
                    className="max-w-full max-h-[300px] object-contain"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-1">
                    String Length
                  </p>
                  <p className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
                    {base64Only.length.toLocaleString()} chars
                  </p>
                </div>
                <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-1">
                    Estimated Size
                  </p>
                  <p className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
                    {formatBytes(Math.ceil((base64Only.length * 3) / 4))}
                  </p>
                </div>
              </div>

              {/* Base64 output */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileImage className="w-4 h-4 text-primary" />
                  <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
                    Base64 String
                  </h2>
                </div>
                <div className="relative">
                  <textarea
                    readOnly
                    value={base64Only}
                    className="w-full h-32 p-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-xl font-mono text-xs resize-none break-all focus:outline-none"
                    style={{ wordBreak: "break-all" }}
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(base64Only, "base64")}
                    className="absolute top-3 right-3 flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] font-mono text-[11px] uppercase tracking-wider hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px]"
                  >
                    {copiedField === "base64" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Clipboard className="w-3.5 h-3.5" />
                        Copy Base64
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Data URI output */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileImage className="w-4 h-4 text-primary" />
                  <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
                    Data URI
                  </h2>
                </div>
                <div className="relative">
                  <textarea
                    readOnly
                    value={dataUri}
                    className="w-full h-32 p-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-xl font-mono text-xs resize-none break-all focus:outline-none"
                    style={{ wordBreak: "break-all" }}
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(dataUri, "datauri")}
                    className="absolute top-3 right-3 flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] font-mono text-[11px] uppercase tracking-wider hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px]"
                  >
                    {copiedField === "datauri" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Clipboard className="w-3.5 h-3.5" />
                        Copy Data URI
                      </>
                    )}
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
                title: "Upload Image",
                desc: "Drop or select any image file (PNG, JPG, WebP, GIF, SVG).",
              },
              {
                step: "02",
                title: "Encode",
                desc: "Your image is converted to Base64 instantly in the browser.",
              },
              {
                step: "03",
                title: "Copy",
                desc: "Copy the Base64 string or full Data URI with one click.",
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

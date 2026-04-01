"use client";

import { motion } from "framer-motion";
import {
  Check,
  ClipboardCopy,
  Download,
  FileCode2,
  Image as ImageIcon,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Base64 Decoder",
  url: "https://converterup.com/tools/base64-decode",
  description:
    "Decode Base64 strings to text or images instantly. Supports data URIs and plain Base64. Free, fast, and works entirely in your browser.",
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

const DATA_URI_REGEX = /^data:([^;]+);base64,(.+)$/s;
const IMAGE_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/bmp",
  "image/tiff",
  "image/avif",
];

interface DecodeResult {
  type: "text" | "image" | "error";
  text?: string;
  imageSrc?: string;
  imageMime?: string;
  error?: string;
}

function decodeBase64(input: string): DecodeResult {
  const trimmed = input.trim();
  if (!trimmed) return { type: "text", text: "" };

  const dataUriMatch = trimmed.match(DATA_URI_REGEX);

  if (dataUriMatch) {
    const mime = dataUriMatch[1];
    const base64Data = dataUriMatch[2];

    if (IMAGE_MIME_TYPES.includes(mime)) {
      return {
        type: "image",
        imageSrc: trimmed,
        imageMime: mime,
      };
    }

    try {
      const decoded = atob(base64Data);
      const bytes = new Uint8Array(decoded.length);
      for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
      }
      const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
      return { type: "text", text };
    } catch {
      return {
        type: "error",
        error: "Could not decode the Base64 content from the data URI.",
      };
    }
  }

  try {
    const decoded = atob(trimmed);
    const bytes = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
      bytes[i] = decoded.charCodeAt(i);
    }

    // Check for common image magic bytes
    if (
      (bytes[0] === 0x89 && bytes[1] === 0x50) || // PNG
      (bytes[0] === 0xff && bytes[1] === 0xd8) || // JPEG
      (bytes[0] === 0x47 && bytes[1] === 0x49) || // GIF
      (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46) // RIFF/WebP
    ) {
      let mime = "image/png";
      if (bytes[0] === 0xff && bytes[1] === 0xd8) mime = "image/jpeg";
      else if (bytes[0] === 0x47 && bytes[1] === 0x49) mime = "image/gif";
      else if (bytes[0] === 0x52 && bytes[1] === 0x49) mime = "image/webp";

      return {
        type: "image",
        imageSrc: `data:${mime};base64,${trimmed}`,
        imageMime: mime,
      };
    }

    try {
      const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
      return { type: "text", text };
    } catch {
      return { type: "text", text: decoded };
    }
  } catch {
    return {
      type: "error",
      error: "Invalid Base64 string. Check your input and try again.",
    };
  }
}

export function Base64Decoder() {
  return (
    <ToolGate toolName="base64-decode">
      {({ gatedDownload, trackStarted }) => (
        <Base64DecoderContent
          gatedDownload={gatedDownload}
          trackStarted={trackStarted}
        />
      )}
    </ToolGate>
  );
}

function Base64DecoderContent({
  gatedDownload,
  trackStarted,
}: {
  gatedDownload: (downloadFn: () => void | Promise<void>) => Promise<void>;
  trackStarted: () => void;
}) {
  const [input, setInput] = useState("");
  const hasTrackedStarted = useRef(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => decodeBase64(input), [input]);

  const handleCopy = useCallback(async () => {
    if (result.type !== "text" || !result.text) return;
    await gatedDownload(async () => {
      try {
        await navigator.clipboard.writeText(result.text!);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = result.text!;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    });
  }, [result, gatedDownload]);

  const handleDownload = useCallback(async () => {
    if (result.type === "error") return;

    await gatedDownload(() => {
      if (result.type === "image" && result.imageSrc) {
        const link = document.createElement("a");
        link.href = result.imageSrc;
        const ext = result.imageMime?.split("/")[1] ?? "png";
        link.download = `decoded-image.${ext}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (result.type === "text" && result.text) {
        const blob = new Blob([result.text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "decoded-text.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    });
  }, [result, gatedDownload]);

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
            Base64
            <br />
            <span className="gradient-text">Decoder</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Decode Base64 strings to text or images instantly. Supports data
            URIs and plain Base64.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          {/* Input */}
          <div>
            <label
              htmlFor="base64-input"
              className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
            >
              Base64 Input
            </label>
            <div className="relative">
              <FileCode2 className="absolute left-4 top-4 w-4 h-4 text-[#71717A]" />
              <textarea
                id="base64-input"
                value={input}
                onChange={(e) => {
                  const val = e.target.value;
                  setInput(val);
                  if (val.length > 0 && !hasTrackedStarted.current) {
                    trackStarted();
                    hasTrackedStarted.current = true;
                  }
                }}
                placeholder="Paste a Base64 string or data URI..."
                rows={6}
                className="w-full pl-11 pr-4 py-3 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 placeholder:text-[#71717A]/60 font-mono text-sm resize-y min-h-[44px]"
              />
            </div>
          </div>

          {/* Error */}
          {result.type === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-3 bg-[#FB7185]/10 border border-[#FB7185]/30 rounded-lg text-[#FB7185] text-sm font-[Inter]"
            >
              {result.error}
            </motion.div>
          )}

          {/* Image preview */}
          {result.type === "image" && result.imageSrc && (
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2">
                Image Preview
              </label>
              <div className="border border-[#2A2535] bg-[#0C0A12] rounded-lg p-4 flex items-center justify-center">
                <img
                  src={result.imageSrc}
                  alt="Decoded from Base64"
                  className="max-w-full max-h-96 object-contain rounded"
                />
              </div>
            </div>
          )}

          {/* Text output */}
          {result.type === "text" && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="decoded-output"
                  className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A]"
                >
                  Decoded Text
                </label>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!result.text}
                  className="flex items-center gap-2 h-10 px-4 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-[11px] uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <ClipboardCopy className="w-4 h-4" />
                      Copy Text
                    </>
                  )}
                </button>
              </div>
              <textarea
                id="decoded-output"
                value={result.text ?? ""}
                readOnly
                rows={8}
                placeholder="Decoded text will appear here..."
                className="w-full px-4 py-3 border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] rounded-lg font-[Inter] text-sm resize-y min-h-[44px] placeholder:text-[#71717A]/60 focus:outline-none"
              />
            </div>
          )}

          {/* Download button */}
          {((result.type === "text" && result.text) ||
            (result.type === "image" && result.imageSrc)) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-end"
            >
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-2 h-10 px-4 rounded-lg border border-[#2A2535] text-[#EDEDEF] font-mono text-[11px] uppercase tracking-wider hover:border-[#2DD4BF]/30 transition-colors min-h-[44px]"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </motion.div>
          )}
        </motion.div>
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
                title: "Paste Base64",
                desc: "Paste a Base64 string or data URI into the input field.",
              },
              {
                step: "02",
                title: "Auto-Decode",
                desc: "The content is decoded live as you type. Images are previewed automatically.",
              },
              {
                step: "03",
                title: "Copy or Download",
                desc: "Copy the decoded text or download the decoded content.",
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

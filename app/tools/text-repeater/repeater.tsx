"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ClipboardCopy, Repeat, Type } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";

const SEPARATOR_OPTIONS = [
  { value: "newline", label: "New Line" },
  { value: "space", label: "Space" },
  { value: "comma", label: "Comma" },
  { value: "custom", label: "Custom" },
] as const;

type SeparatorType = (typeof SEPARATOR_OPTIONS)[number]["value"];

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Text Repeater",
  url: "https://converterup.com/tools/text-repeater",
  description:
    "Repeat any text multiple times with custom separators. Free, fast, and works entirely in your browser.",
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

function getSeparator(type: SeparatorType, custom: string): string {
  switch (type) {
    case "newline":
      return "\n";
    case "space":
      return " ";
    case "comma":
      return ",";
    case "custom":
      return custom;
  }
}

function countWords(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

export function TextRepeater() {
  return (
    <ToolGate toolName="text-repeater">
      {({ deduct, trackStarted, trackCompleted }) => (
        <TextRepeaterContent
          deduct={deduct}
          trackStarted={trackStarted}
          trackCompleted={trackCompleted}
        />
      )}
    </ToolGate>
  );
}

function TextRepeaterContent({
  deduct,
  trackStarted,
  trackCompleted,
}: {
  deduct: () => Promise<void>;
  trackStarted: () => void;
  trackCompleted: () => void;
}) {
  const [text, setText] = useState("");
  const hasTrackedStarted = useRef(false);
  const [repeatCount, setRepeatCount] = useState(3);
  const [separatorType, setSeparatorType] = useState<SeparatorType>("newline");
  const [customSeparator, setCustomSeparator] = useState("");
  const [copied, setCopied] = useState(false);

  const separator = getSeparator(separatorType, customSeparator);

  const output = useMemo(() => {
    if (!text) return "";
    const count = Math.max(1, Math.min(10000, repeatCount));
    return Array(count).fill(text).join(separator);
  }, [text, repeatCount, separator]);

  const charCount = output.length;
  const wordCount = countWords(output);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackCompleted();
      await deduct();
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackCompleted();
      await deduct();
    }
  }, [output, deduct, trackCompleted]);

  const handleRepeatCountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number.parseInt(e.target.value, 10);
      if (Number.isNaN(val)) {
        setRepeatCount(1);
      } else {
        setRepeatCount(Math.max(1, Math.min(10000, val)));
      }
    },
    [],
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
            Text
            <br />
            <span className="gradient-text">Repeater</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Repeat any text multiple times with custom separators. Fast, free,
            and entirely in your browser.
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
          {/* Input text */}
          <div>
            <label
              htmlFor="input-text"
              className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
            >
              Text to Repeat
            </label>
            <div className="relative">
              <Type className="absolute left-4 top-4 w-4 h-4 text-[#71717A]" />
              <textarea
                id="input-text"
                value={text}
                onChange={(e) => {
                  const val = e.target.value;
                  setText(val);
                  if (val.length === 1 && !hasTrackedStarted.current) {
                    trackStarted();
                    hasTrackedStarted.current = true;
                  }
                }}
                placeholder="Enter text to repeat..."
                rows={4}
                className="w-full pl-11 pr-4 py-3 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 placeholder:text-[#71717A]/60 font-[Inter] text-sm resize-y min-h-[44px]"
              />
            </div>
          </div>

          {/* Controls row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Repeat count */}
            <div>
              <label
                htmlFor="repeat-count"
                className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
              >
                Repeat Count
              </label>
              <div className="relative">
                <Repeat className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                <input
                  id="repeat-count"
                  type="number"
                  value={repeatCount}
                  onChange={handleRepeatCountChange}
                  min={1}
                  max={10000}
                  className="w-full h-12 pl-11 pr-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 font-[Inter] text-sm min-h-[44px]"
                />
              </div>
            </div>

            {/* Separator selector */}
            <div>
              <label
                htmlFor="separator"
                className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
              >
                Separator
              </label>
              <select
                id="separator"
                value={separatorType}
                onChange={(e) =>
                  setSeparatorType(e.target.value as SeparatorType)
                }
                className="w-full h-12 px-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 font-[Inter] text-sm min-h-[44px] appearance-none cursor-pointer"
              >
                {SEPARATOR_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Custom separator input */}
          <AnimatePresence>
            {separatorType === "custom" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease }}
              >
                <label
                  htmlFor="custom-separator"
                  className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
                >
                  Custom Separator
                </label>
                <input
                  id="custom-separator"
                  type="text"
                  value={customSeparator}
                  onChange={(e) => setCustomSeparator(e.target.value)}
                  placeholder="Enter custom separator..."
                  className="w-full h-12 px-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 placeholder:text-[#71717A]/60 font-[Inter] text-sm min-h-[44px]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats bar */}
          <div className="flex items-center gap-4 py-3 px-4 bg-[#16131E] border border-[#2A2535] rounded-lg">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
              Characters:{" "}
              <span className="text-[#EDEDEF]">
                {charCount.toLocaleString()}
              </span>
            </span>
            <span className="w-px h-4 bg-[#2A2535]" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
              Words:{" "}
              <span className="text-[#EDEDEF]">
                {wordCount.toLocaleString()}
              </span>
            </span>
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="output-text"
                className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A]"
              >
                Output
              </label>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!output}
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
                    Copy to Clipboard
                  </>
                )}
              </button>
            </div>
            <textarea
              id="output-text"
              value={output}
              readOnly
              rows={8}
              placeholder="Repeated text will appear here..."
              className="w-full px-4 py-3 border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] rounded-lg font-[Inter] text-sm resize-y min-h-[44px] placeholder:text-[#71717A]/60 focus:outline-none"
            />
          </div>
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
                title: "Enter Text",
                desc: "Type or paste the text you want to repeat.",
              },
              {
                step: "02",
                title: "Configure",
                desc: "Set the repeat count and choose a separator.",
              },
              {
                step: "03",
                title: "Copy",
                desc: "Copy the repeated text to your clipboard instantly.",
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

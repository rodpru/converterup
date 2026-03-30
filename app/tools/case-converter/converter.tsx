"use client";

import { motion } from "framer-motion";
import { Check, ClipboardCopy, Type } from "lucide-react";
import { useCallback, useState } from "react";
import { JsonLd } from "@/components/json-ld";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Case Converter",
  url: "https://converterup.com/tools/case-converter",
  description:
    "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and more. Free, fast, and works entirely in your browser.",
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

type CaseType =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant";

const CASE_OPTIONS: { value: CaseType; label: string }[] = [
  { value: "upper", label: "UPPERCASE" },
  { value: "lower", label: "lowercase" },
  { value: "title", label: "Title Case" },
  { value: "sentence", label: "Sentence case" },
  { value: "camel", label: "camelCase" },
  { value: "pascal", label: "PascalCase" },
  { value: "snake", label: "snake_case" },
  { value: "kebab", label: "kebab-case" },
  { value: "constant", label: "CONSTANT_CASE" },
];

function splitIntoWords(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function convertCase(text: string, caseType: CaseType): string {
  if (!text) return "";

  switch (caseType) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return text.replace(
        /\w\S*/g,
        (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
      );
    case "sentence": {
      const sentences = text.split(/([.!?]+\s*)/);
      return sentences
        .map((segment, i) => {
          if (i % 2 === 1) return segment;
          if (!segment) return segment;
          const trimmed = segment.trimStart();
          const leading = segment.slice(0, segment.length - trimmed.length);
          if (!trimmed) return segment;
          return (
            leading +
            trimmed.charAt(0).toUpperCase() +
            trimmed.slice(1).toLowerCase()
          );
        })
        .join("");
    }
    case "camel": {
      const words = splitIntoWords(text);
      return words
        .map((w, i) =>
          i === 0
            ? w.toLowerCase()
            : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
        )
        .join("");
    }
    case "pascal": {
      const words = splitIntoWords(text);
      return words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join("");
    }
    case "snake": {
      const words = splitIntoWords(text);
      return words.map((w) => w.toLowerCase()).join("_");
    }
    case "kebab": {
      const words = splitIntoWords(text);
      return words.map((w) => w.toLowerCase()).join("-");
    }
    case "constant": {
      const words = splitIntoWords(text);
      return words.map((w) => w.toUpperCase()).join("_");
    }
  }
}

function countWords(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

export function CaseConverter() {
  const [input, setInput] = useState("");
  const [selectedCase, setSelectedCase] = useState<CaseType>("upper");
  const [copied, setCopied] = useState(false);

  const output = convertCase(input, selectedCase);
  const charCount = output.length;
  const wordCount = countWords(output);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

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
            Case
            <br />
            <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Convert text between UPPERCASE, lowercase, Title Case, camelCase,
            snake_case, and more.
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
              htmlFor="case-input"
              className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
            >
              Input Text
            </label>
            <div className="relative">
              <Type className="absolute left-4 top-4 w-4 h-4 text-[#71717A]" />
              <textarea
                id="case-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter or paste text to convert..."
                rows={5}
                className="w-full pl-11 pr-4 py-3 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 placeholder:text-[#71717A]/60 font-[Inter] text-sm resize-y min-h-[44px]"
              />
            </div>
          </div>

          {/* Case type buttons */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2">
              Case Type
            </label>
            <div className="flex flex-wrap gap-2">
              {CASE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelectedCase(opt.value)}
                  className={`h-10 px-4 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all min-h-[44px] ${
                    selectedCase === opt.value
                      ? "bg-[#2DD4BF] text-[#042F2E] font-semibold shadow-[0_0_20px_rgba(45,212,191,0.15)]"
                      : "border border-[#2A2535] text-[#EDEDEF] hover:border-[#2DD4BF]/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

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
                htmlFor="case-output"
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
              id="case-output"
              value={output}
              readOnly
              rows={5}
              placeholder="Converted text will appear here..."
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
                desc: "Type or paste the text you want to convert.",
              },
              {
                step: "02",
                title: "Pick a Case",
                desc: "Choose from 9 case styles including camelCase and snake_case.",
              },
              {
                step: "03",
                title: "Copy",
                desc: "Copy the converted text to your clipboard instantly.",
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

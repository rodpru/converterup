"use client";

import { motion } from "framer-motion";
import { Check, ClipboardCopy, Code, Download, Minimize2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HTML Minifier",
  url: "https://converterup.com/tools/html-minifier",
  description:
    "Minify HTML code instantly. Remove comments, collapse whitespace, and reduce file size. Free, fast, and works entirely in your browser.",
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

function minifyHtml(input: string): string {
  let result = input;
  // Remove HTML comments
  result = result.replace(/<!--[\s\S]*?-->/g, "");
  // Collapse multiple whitespace/newlines to single space
  result = result.replace(/\s{2,}/g, " ");
  // Remove spaces between tags
  result = result.replace(/>\s+</g, "><");
  // Trim
  result = result.trim();
  return result;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(2)} KB`;
}

export function HtmlMinifier() {
  return (
    <ToolGate toolName="html-minifier">
      {({ deduct, trackStarted, trackCompleted }) => (
        <HtmlMinifierContent
          deduct={deduct}
          trackStarted={trackStarted}
          trackCompleted={trackCompleted}
        />
      )}
    </ToolGate>
  );
}

function HtmlMinifierContent({
  deduct,
  trackStarted,
  trackCompleted,
}: {
  deduct: () => Promise<void>;
  trackStarted: () => void;
  trackCompleted: () => void;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const hasTrackedStarted = useRef(false);

  const originalSize = new Blob([input]).size;
  const minifiedSize = new Blob([output]).size;
  const savings =
    originalSize > 0
      ? (((originalSize - minifiedSize) / originalSize) * 100).toFixed(1)
      : "0";

  const handleMinify = useCallback(() => {
    if (!input.trim()) return;
    setOutput(minifyHtml(input));
  }, [input]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackCompleted();
      await deduct();
    } catch {
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

  const handleDownload = useCallback(async () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minified.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    trackCompleted();
    await deduct();
  }, [output, deduct, trackCompleted]);

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
            HTML
            <br />
            <span className="gradient-text">Minifier</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Remove comments, collapse whitespace, and reduce your HTML file
            size. Fast, free, and entirely in your browser.
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
              htmlFor="html-input"
              className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
            >
              HTML Code
            </label>
            <div className="relative">
              <Code className="absolute left-4 top-4 w-4 h-4 text-[#71717A]" />
              <textarea
                id="html-input"
                value={input}
                onChange={(e) => {
                  const val = e.target.value;
                  setInput(val);
                  if (val.length === 1 && !hasTrackedStarted.current) {
                    trackStarted();
                    hasTrackedStarted.current = true;
                  }
                }}
                onPaste={() => {
                  if (!hasTrackedStarted.current) {
                    trackStarted();
                    hasTrackedStarted.current = true;
                  }
                }}
                placeholder="Paste your HTML code here..."
                rows={8}
                className="w-full pl-11 pr-4 py-3 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 placeholder:text-[#71717A]/60 font-mono text-sm resize-y min-h-[44px]"
              />
            </div>
          </div>

          {/* Minify button */}
          <button
            type="button"
            onClick={handleMinify}
            disabled={!input.trim()}
            className="flex items-center gap-2 h-12 px-8 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-[11px] uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
          >
            <Minimize2 className="w-4 h-4" />
            Minify
          </button>

          {/* Stats bar */}
          {output && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease }}
              className="flex flex-wrap items-center gap-4 py-3 px-4 bg-[#16131E] border border-[#2A2535] rounded-lg"
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                Original:{" "}
                <span className="text-[#EDEDEF]">
                  {formatBytes(originalSize)}
                </span>
              </span>
              <span className="w-px h-4 bg-[#2A2535]" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                Minified:{" "}
                <span className="text-[#EDEDEF]">
                  {formatBytes(minifiedSize)}
                </span>
              </span>
              <span className="w-px h-4 bg-[#2A2535]" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                Savings: <span className="text-[#2DD4BF]">{savings}%</span>
              </span>
            </motion.div>
          )}

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="html-output"
                className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A]"
              >
                Minified Output
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!output}
                  className="flex items-center gap-2 h-10 px-4 rounded-lg border border-[#2A2535] text-[#EDEDEF] font-mono text-[11px] uppercase tracking-wider hover:border-[#2DD4BF]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                >
                  <Download className="w-4 h-4" />
                  Download .html
                </button>
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
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
            <textarea
              id="html-output"
              value={output}
              readOnly
              rows={8}
              placeholder="Minified HTML will appear here..."
              className="w-full px-4 py-3 border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] rounded-lg font-mono text-sm resize-y min-h-[44px] placeholder:text-[#71717A]/60 focus:outline-none"
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
                title: "Paste HTML",
                desc: "Paste or type your HTML code into the input area.",
              },
              {
                step: "02",
                title: "Minify",
                desc: "Click Minify to remove comments and collapse whitespace.",
              },
              {
                step: "03",
                title: "Copy or Download",
                desc: "Copy the minified code or download it as an .html file.",
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

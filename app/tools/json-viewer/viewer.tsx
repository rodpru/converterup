"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Braces,
  Check,
  ClipboardCopy,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { JsonLd } from "@/components/json-ld";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON Viewer & Formatter",
  url: "https://converterup.com/tools/json-viewer",
  description:
    "Format, validate, and explore JSON with syntax highlighting. Free, fast, and works entirely in your browser.",
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

function syntaxHighlight(json: string): string {
  // Escape HTML entities first
  const escaped = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped.replace(
    /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|\bnull\b)/g,
    (match) => {
      // Keys (strings followed by colon)
      if (match.endsWith(":")) {
        return `<span style="color:#EDEDEF">${match.slice(0, -1)}</span>:`;
      }
      // Strings
      if (match.startsWith('"')) {
        return `<span style="color:#4ADE80">${match}</span>`;
      }
      // Booleans
      if (match === "true" || match === "false") {
        return `<span style="color:#FACC15">${match}</span>`;
      }
      // Null
      if (match === "null") {
        return `<span style="color:#FB7185">${match}</span>`;
      }
      // Numbers
      return `<span style="color:#22D3EE">${match}</span>`;
    },
  );
}

export function JsonViewer() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"formatted" | "minified" | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const parsed = useMemo(() => {
    if (!input.trim()) return { formatted: null, minified: null, valid: true };

    try {
      const obj = JSON.parse(input);
      return {
        formatted: JSON.stringify(obj, null, 2),
        minified: JSON.stringify(obj),
        valid: true,
      };
    } catch (e) {
      return {
        formatted: null,
        minified: null,
        valid: false,
        errorMessage: e instanceof Error ? e.message : "Invalid JSON",
      };
    }
  }, [input]);

  const highlighted = useMemo(() => {
    if (!parsed.formatted) return "";
    return syntaxHighlight(parsed.formatted);
  }, [parsed.formatted]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      setError(null);
    },
    [],
  );

  const handleFormat = useCallback(() => {
    if (!input.trim()) return;
    try {
      const obj = JSON.parse(input);
      setInput(JSON.stringify(obj, null, 2));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [input]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) return;
    try {
      const obj = JSON.parse(input);
      setInput(JSON.stringify(obj));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [input]);

  const handleCopy = useCallback(
    async (type: "formatted" | "minified") => {
      const text = type === "formatted" ? parsed.formatted : parsed.minified;
      if (!text) return;
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    },
    [parsed],
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
            JSON Viewer &
            <br />
            <span className="gradient-text">Formatter</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Paste JSON to format, validate, and explore with syntax
            highlighting. Prettify or minify instantly in your browser.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="max-w-5xl mx-auto"
        >
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              type="button"
              onClick={handleFormat}
              className="flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] font-mono text-sm"
            >
              <Maximize2 className="w-4 h-4" />
              Prettify
            </button>
            <button
              type="button"
              onClick={handleMinify}
              className="flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] font-mono text-sm"
            >
              <Minimize2 className="w-4 h-4" />
              Minify
            </button>
            {parsed.formatted && (
              <>
                <button
                  type="button"
                  onClick={() => handleCopy("formatted")}
                  className="flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] font-mono text-sm"
                >
                  {copied === "formatted" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <ClipboardCopy className="w-4 h-4" />
                  )}
                  {copied === "formatted" ? "Copied" : "Copy Formatted"}
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy("minified")}
                  className="flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] font-mono text-sm"
                >
                  {copied === "minified" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <ClipboardCopy className="w-4 h-4" />
                  )}
                  {copied === "minified" ? "Copied" : "Copy Minified"}
                </button>
                <button
                  type="button"
                  onClick={() => setCollapsed((c) => !c)}
                  className="flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] font-mono text-sm ml-auto"
                >
                  {collapsed ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                  {collapsed ? "Expand" : "Collapse"} Preview
                </button>
              </>
            )}
          </div>

          {/* Input / Output */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* JSON Input */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Braces className="w-4 h-4 text-primary" />
                <span className="text-sm font-[Syne] font-bold text-[#EDEDEF]">
                  Input
                </span>
                {input.trim() && (
                  <span className="ml-auto font-mono text-[11px] text-[#71717A]">
                    {parsed.valid ? (
                      <span className="text-[#4ADE80]">Valid JSON</span>
                    ) : (
                      <span className="text-[#FB7185]">Invalid JSON</span>
                    )}
                  </span>
                )}
              </div>
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder='{"name": "John", "age": 30, "active": true}'
                className="flex-1 min-h-[400px] p-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 placeholder:text-[#71717A]/40 font-mono text-sm resize-y"
                spellCheck={false}
              />
            </div>

            {/* Highlighted Output */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Braces className="w-4 h-4 text-primary" />
                <span className="text-sm font-[Syne] font-bold text-[#EDEDEF]">
                  Preview
                </span>
              </div>
              <div className="flex-1 min-h-[400px] p-4 border border-[#2A2535] bg-[#0C0A12] rounded-lg overflow-auto">
                {highlighted ? (
                  collapsed ? (
                    <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                      <code
                        dangerouslySetInnerHTML={{
                          __html: syntaxHighlight(parsed.minified ?? ""),
                        }}
                      />
                    </pre>
                  ) : (
                    <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
                    </pre>
                  )
                ) : (
                  <p className="text-[#71717A]/40 font-mono text-sm">
                    Formatted output will appear here...
                  </p>
                )}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {(error || (!parsed.valid && input.trim())) && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-[#FB7185]/10 border border-[#FB7185]/20"
              >
                <AlertCircle className="w-4 h-4 text-[#FB7185] shrink-0" />
                <p className="text-[#FB7185] text-sm font-[Inter]">
                  {error ||
                    ("errorMessage" in parsed
                      ? (parsed as { errorMessage: string }).errorMessage
                      : "Invalid JSON")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
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
                title: "Paste JSON",
                desc: "Paste any JSON string into the input area.",
              },
              {
                step: "02",
                title: "Format & Explore",
                desc: "Instantly see formatted, syntax-highlighted output.",
              },
              {
                step: "03",
                title: "Copy or Minify",
                desc: "Copy the prettified or minified version to clipboard.",
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

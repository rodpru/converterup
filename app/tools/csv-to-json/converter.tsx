"use client";

import { motion } from "framer-motion";
import {
  Check,
  ClipboardCopy,
  Download,
  FileSpreadsheet,
  Upload,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CSV to JSON Converter",
  url: "https://converterup.com/tools/csv-to-json",
  description:
    "Convert CSV data to JSON instantly. Supports custom delimiters, quoted fields, and header rows. Free, fast, and works entirely in your browser.",
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

type DelimiterType = "comma" | "semicolon" | "tab" | "custom";

const DELIMITER_OPTIONS: { value: DelimiterType; label: string }[] = [
  { value: "comma", label: "Comma (,)" },
  { value: "semicolon", label: "Semicolon (;)" },
  { value: "tab", label: "Tab" },
  { value: "custom", label: "Custom" },
];

function getDelimiter(type: DelimiterType, custom: string): string {
  switch (type) {
    case "comma":
      return ",";
    case "semicolon":
      return ";";
    case "tab":
      return "\t";
    case "custom":
      return custom || ",";
  }
}

function parseCsvLine(line: string, delimiter: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (line.startsWith(delimiter, i)) {
        fields.push(current);
        current = "";
        i += delimiter.length - 1;
      } else {
        current += char;
      }
    }
  }

  fields.push(current);
  return fields;
}

interface ParseResult {
  json: string;
  rowCount: number;
  error?: string;
}

function parseCsv(
  input: string,
  delimiter: string,
  firstRowIsHeader: boolean,
): ParseResult {
  if (!input.trim()) return { json: "", rowCount: 0 };

  try {
    const lines = input.split(/\r?\n/).filter((line) => line.trim().length > 0);

    if (lines.length === 0) return { json: "", rowCount: 0 };

    const rows = lines.map((line) => parseCsvLine(line, delimiter));

    if (firstRowIsHeader && rows.length > 1) {
      const headers = rows[0].map((h) => h.trim());
      const data = rows.slice(1).map((row) => {
        const obj: Record<string, string> = {};
        for (let i = 0; i < headers.length; i++) {
          obj[headers[i]] = row[i]?.trim() ?? "";
        }
        return obj;
      });
      return {
        json: JSON.stringify(data, null, 2),
        rowCount: data.length,
      };
    }

    return {
      json: JSON.stringify(rows, null, 2),
      rowCount: rows.length,
    };
  } catch {
    return {
      json: "",
      rowCount: 0,
      error: "Failed to parse CSV. Check your input and delimiter settings.",
    };
  }
}

export function CsvToJsonConverter() {
  return (
    <ToolGate toolName="csv-to-json">
      {({ deduct, trackStarted, trackCompleted }) => (
        <CsvToJsonContent
          deduct={deduct}
          trackStarted={trackStarted}
          trackCompleted={trackCompleted}
        />
      )}
    </ToolGate>
  );
}

function CsvToJsonContent({
  deduct,
  trackStarted,
  trackCompleted,
}: {
  deduct: () => Promise<void>;
  trackStarted: () => void;
  trackCompleted: () => void;
}) {
  const [input, setInput] = useState("");
  const [delimiterType, setDelimiterType] = useState<DelimiterType>("comma");
  const [customDelimiter, setCustomDelimiter] = useState("");
  const [firstRowIsHeader, setFirstRowIsHeader] = useState(true);
  const hasTrackedStarted = useRef(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const delimiter = getDelimiter(delimiterType, customDelimiter);
  const result = useMemo(
    () => parseCsv(input, delimiter, firstRowIsHeader),
    [input, delimiter, firstRowIsHeader],
  );

  const trackStart = useCallback(() => {
    if (!hasTrackedStarted.current) {
      trackStarted();
      hasTrackedStarted.current = true;
    }
  }, [trackStarted]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result;
        if (typeof text === "string") {
          setInput(text);
          trackStart();
        }
      };
      reader.readAsText(file);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [trackStart],
  );

  const handleCopy = useCallback(async () => {
    if (!result.json) return;
    try {
      await navigator.clipboard.writeText(result.json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackCompleted();
      await deduct();
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = result.json;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackCompleted();
      await deduct();
    }
  }, [result.json, deduct, trackCompleted]);

  const handleDownload = useCallback(async () => {
    if (!result.json) return;
    const blob = new Blob([result.json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "converted.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    trackCompleted();
    await deduct();
  }, [result.json, deduct, trackCompleted]);

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
            CSV to
            <br />
            <span className="gradient-text">JSON</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Convert CSV data to JSON instantly. Supports custom delimiters,
            quoted fields, and header rows.
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
          {/* File upload */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2">
              Upload CSV File
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.tsv,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-file-input"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 h-12 px-6 rounded-lg border border-dashed border-[#2A2535] text-[#EDEDEF] font-mono text-[11px] uppercase tracking-wider hover:border-[#2DD4BF]/30 transition-colors min-h-[44px] w-full justify-center"
            >
              <Upload className="w-4 h-4" />
              Choose CSV File
            </button>
          </div>

          {/* Input textarea */}
          <div>
            <label
              htmlFor="csv-input"
              className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
            >
              Or Paste CSV
            </label>
            <div className="relative">
              <FileSpreadsheet className="absolute left-4 top-4 w-4 h-4 text-[#71717A]" />
              <textarea
                id="csv-input"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  trackStart();
                }}
                placeholder="name,email,age&#10;John,john@example.com,30&#10;Jane,jane@example.com,25"
                rows={6}
                className="w-full pl-11 pr-4 py-3 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 placeholder:text-[#71717A]/60 font-mono text-sm resize-y min-h-[44px]"
              />
            </div>
          </div>

          {/* Controls row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Delimiter selector */}
            <div>
              <label
                htmlFor="delimiter-select"
                className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
              >
                Delimiter
              </label>
              <select
                id="delimiter-select"
                value={delimiterType}
                onChange={(e) =>
                  setDelimiterType(e.target.value as DelimiterType)
                }
                className="w-full h-12 px-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 font-[Inter] text-sm min-h-[44px] appearance-none cursor-pointer"
              >
                {DELIMITER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Header toggle */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2">
                Options
              </label>
              <button
                type="button"
                onClick={() => setFirstRowIsHeader((prev) => !prev)}
                className={`w-full h-12 px-4 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all min-h-[44px] flex items-center justify-center gap-2 ${
                  firstRowIsHeader
                    ? "bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 text-[#2DD4BF]"
                    : "border border-[#2A2535] text-[#71717A]"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    firstRowIsHeader
                      ? "bg-[#2DD4BF] border-[#2DD4BF]"
                      : "border-[#2A2535]"
                  }`}
                >
                  {firstRowIsHeader && (
                    <Check className="w-3 h-3 text-[#042F2E]" />
                  )}
                </span>
                First Row is Header
              </button>
            </div>
          </div>

          {/* Custom delimiter */}
          {delimiterType === "custom" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease }}
            >
              <label
                htmlFor="custom-delimiter"
                className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
              >
                Custom Delimiter
              </label>
              <input
                id="custom-delimiter"
                type="text"
                value={customDelimiter}
                onChange={(e) => setCustomDelimiter(e.target.value)}
                placeholder="Enter delimiter character..."
                className="w-full h-12 px-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 placeholder:text-[#71717A]/60 font-[Inter] text-sm min-h-[44px]"
              />
            </motion.div>
          )}

          {/* Error */}
          {result.error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-3 bg-[#FB7185]/10 border border-[#FB7185]/30 rounded-lg text-[#FB7185] text-sm font-[Inter]"
            >
              {result.error}
            </motion.div>
          )}

          {/* Stats bar */}
          {result.json && (
            <div className="flex items-center gap-4 py-3 px-4 bg-[#16131E] border border-[#2A2535] rounded-lg">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                Rows:{" "}
                <span className="text-[#EDEDEF]">
                  {result.rowCount.toLocaleString()}
                </span>
              </span>
              <span className="w-px h-4 bg-[#2A2535]" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                Characters:{" "}
                <span className="text-[#EDEDEF]">
                  {result.json.length.toLocaleString()}
                </span>
              </span>
            </div>
          )}

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="json-output"
                className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A]"
              >
                JSON Output
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!result.json}
                  className="flex items-center gap-2 h-10 px-4 rounded-lg border border-[#2A2535] text-[#EDEDEF] font-mono text-[11px] uppercase tracking-wider hover:border-[#2DD4BF]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!result.json}
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
                      Copy JSON
                    </>
                  )}
                </button>
              </div>
            </div>
            <textarea
              id="json-output"
              value={result.json}
              readOnly
              rows={10}
              placeholder="JSON output will appear here..."
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
                title: "Add CSV",
                desc: "Upload a CSV file or paste your CSV data directly.",
              },
              {
                step: "02",
                title: "Configure",
                desc: "Choose your delimiter and header row settings.",
              },
              {
                step: "03",
                title: "Get JSON",
                desc: "Copy or download the converted JSON instantly.",
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

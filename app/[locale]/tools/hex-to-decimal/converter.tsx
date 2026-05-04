"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, ClipboardCopy, Hash, Palette } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { JsonLd } from "@/components/json-ld";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Hex to Decimal Converter",
  url: "https://converterup.com/tools/hex-to-decimal",
  description:
    "Convert between hexadecimal, decimal, binary, and octal instantly. Free, fast, and works entirely in your browser.",
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

type ColorInfo = {
  hex: string;
  r: number;
  g: number;
  b: number;
} | null;

function parseColorHex(hex: string): ColorInfo {
  const cleaned = hex.replace(/^#/, "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned) && !/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return null;
  }

  let full = cleaned;
  if (cleaned.length === 3) {
    full =
      cleaned[0] +
      cleaned[0] +
      cleaned[1] +
      cleaned[1] +
      cleaned[2] +
      cleaned[2];
  }

  return {
    hex: `#${full.toUpperCase()}`,
    r: Number.parseInt(full.substring(0, 2), 16),
    g: Number.parseInt(full.substring(2, 4), 16),
    b: Number.parseInt(full.substring(4, 6), 16),
  };
}

export function HexToDecimalConverter() {
  const [hexInput, setHexInput] = useState("");
  const [decInput, setDecInput] = useState("");
  const [source, setSource] = useState<"hex" | "dec">("hex");
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const decimalValue = useMemo(() => {
    if (source === "hex") {
      const cleaned = hexInput.replace(/^(0x|#)/i, "").trim();
      if (!cleaned) return null;
      if (!/^[0-9a-fA-F]+$/.test(cleaned)) return null;
      return Number.parseInt(cleaned, 16);
    }
    const trimmed = decInput.trim();
    if (!trimmed) return null;
    if (!/^\d+$/.test(trimmed)) return null;
    return Number.parseInt(trimmed, 10);
  }, [hexInput, decInput, source]);

  const representations = useMemo(() => {
    if (decimalValue === null || Number.isNaN(decimalValue)) return null;
    return {
      decimal: decimalValue.toString(10),
      hex: decimalValue.toString(16).toUpperCase(),
      binary: decimalValue.toString(2),
      octal: decimalValue.toString(8),
    };
  }, [decimalValue]);

  const colorInfo = useMemo(() => {
    const cleaned = hexInput.replace(/^(0x)/i, "").trim();
    // Try with or without #
    return parseColorHex(cleaned);
  }, [hexInput]);

  const handleHexChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setHexInput(val);
      setSource("hex");
      setError(null);

      const cleaned = val.replace(/^(0x|#)/i, "").trim();
      if (!cleaned) {
        setDecInput("");
        return;
      }
      if (!/^[0-9a-fA-F]+$/.test(cleaned)) {
        setError("Invalid hexadecimal value.");
        setDecInput("");
        return;
      }
      const dec = Number.parseInt(cleaned, 16);
      setDecInput(dec.toString(10));
    },
    [],
  );

  const handleDecChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setDecInput(val);
      setSource("dec");
      setError(null);

      const trimmed = val.trim();
      if (!trimmed) {
        setHexInput("");
        return;
      }
      if (!/^\d+$/.test(trimmed)) {
        setError("Invalid decimal value.");
        setHexInput("");
        return;
      }
      const dec = Number.parseInt(trimmed, 10);
      setHexInput(dec.toString(16).toUpperCase());
    },
    [],
  );

  const handleCopy = useCallback(async (value: string, field: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }, []);

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
            Hex to Decimal
            <br />
            <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Convert between hexadecimal, decimal, binary, and octal. Supports
            color hex codes with RGB breakdown.
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
          {/* Hex and Decimal inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="flex items-center gap-2 mb-2">
                <Hash className="w-4 h-4 text-primary" />
                <span className="text-sm font-[Syne] font-bold text-[#EDEDEF]">
                  Hexadecimal
                </span>
              </label>
              <input
                type="text"
                value={hexInput}
                onChange={handleHexChange}
                placeholder="FF5733 or 0xFF5733 or #FF5733"
                className="w-full h-12 px-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 min-h-[44px] placeholder:text-[#71717A]/40 font-mono text-sm"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 mb-2">
                <Hash className="w-4 h-4 text-primary" />
                <span className="text-sm font-[Syne] font-bold text-[#EDEDEF]">
                  Decimal
                </span>
              </label>
              <input
                type="text"
                value={decInput}
                onChange={handleDecChange}
                placeholder="16733987"
                className="w-full h-12 px-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 min-h-[44px] placeholder:text-[#71717A]/40 font-mono text-sm"
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-[#FB7185]/10 border border-[#FB7185]/20"
              >
                <AlertCircle className="w-4 h-4 text-[#FB7185] shrink-0" />
                <p className="text-[#FB7185] text-sm font-[Inter]">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {representations && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease }}
                className="space-y-3"
              >
                {[
                  {
                    label: "Hexadecimal",
                    value: representations.hex,
                    prefix: "0x",
                  },
                  {
                    label: "Decimal",
                    value: representations.decimal,
                    prefix: "",
                  },
                  {
                    label: "Binary",
                    value: representations.binary,
                    prefix: "0b",
                  },
                  {
                    label: "Octal",
                    value: representations.octal,
                    prefix: "0o",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center gap-3 p-4 bg-[#16131E] border border-[#2A2535] rounded-xl"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="block font-mono text-[11px] text-[#71717A] uppercase tracking-wider mb-1">
                        {row.label}
                      </span>
                      <span className="block font-mono text-sm text-[#EDEDEF] truncate">
                        {row.prefix}
                        {row.value}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(`${row.prefix}${row.value}`, row.label)
                      }
                      className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] min-w-[44px]"
                      title={`Copy ${row.label}`}
                    >
                      {copiedField === row.label ? (
                        <Check className="w-4 h-4 text-[#4ADE80]" />
                      ) : (
                        <ClipboardCopy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}

                {/* Color preview */}
                {colorInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="p-4 bg-[#16131E] border border-[#2A2535] rounded-xl"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Palette className="w-4 h-4 text-primary" />
                      <span className="text-sm font-[Syne] font-bold text-[#EDEDEF]">
                        Color Preview
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-lg border border-[#2A2535] shrink-0"
                        style={{ backgroundColor: colorInfo.hex }}
                      />
                      <div className="grid grid-cols-3 gap-3 flex-1">
                        <div>
                          <span className="block font-mono text-[11px] text-[#71717A] uppercase tracking-wider mb-0.5">
                            Red
                          </span>
                          <span className="block font-mono text-sm text-[#FB7185]">
                            {colorInfo.r}
                          </span>
                        </div>
                        <div>
                          <span className="block font-mono text-[11px] text-[#71717A] uppercase tracking-wider mb-0.5">
                            Green
                          </span>
                          <span className="block font-mono text-sm text-[#4ADE80]">
                            {colorInfo.g}
                          </span>
                        </div>
                        <div>
                          <span className="block font-mono text-[11px] text-[#71717A] uppercase tracking-wider mb-0.5">
                            Blue
                          </span>
                          <span className="block font-mono text-sm text-[#60A5FA]">
                            {colorInfo.b}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            `rgb(${colorInfo.r}, ${colorInfo.g}, ${colorInfo.b})`,
                            "rgb",
                          )
                        }
                        className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] min-w-[44px] shrink-0"
                        title="Copy RGB"
                      >
                        {copiedField === "rgb" ? (
                          <Check className="w-4 h-4 text-[#4ADE80]" />
                        ) : (
                          <ClipboardCopy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
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
                title: "Enter a Value",
                desc: "Type a hex or decimal number in either input field.",
              },
              {
                step: "02",
                title: "See All Bases",
                desc: "Instantly view the value in hex, decimal, binary, and octal.",
              },
              {
                step: "03",
                title: "Copy & Use",
                desc: "Copy any representation to your clipboard with one click.",
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

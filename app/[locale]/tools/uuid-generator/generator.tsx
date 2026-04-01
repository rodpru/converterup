"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ClipboardCopy,
  Fingerprint,
  Hash,
  RefreshCw,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "UUID Generator",
  url: "https://converterup.com/tools/uuid-generator",
  description:
    "Generate UUID v4 identifiers instantly. Single or bulk generation with format options. Free, fast, and works entirely in your browser.",
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

function formatUuid(
  uuid: string,
  uppercase: boolean,
  hyphens: boolean,
): string {
  let result = uuid;
  if (!hyphens) {
    result = result.replace(/-/g, "");
  }
  if (uppercase) {
    result = result.toUpperCase();
  }
  return result;
}

export function UuidGenerator() {
  return (
    <ToolGate toolName="uuid-generator">
      {({ gatedDownload, trackStarted }) => (
        <UuidGeneratorContent
          gatedDownload={gatedDownload}
          trackStarted={trackStarted}
        />
      )}
    </ToolGate>
  );
}

function UuidGeneratorContent({
  gatedDownload,
  trackStarted,
}: {
  gatedDownload: (downloadFn: () => void | Promise<void>) => Promise<void>;
  trackStarted: () => void;
}) {
  const [singleUuid, setSingleUuid] = useState("");
  const [bulkUuids, setBulkUuids] = useState("");
  const [bulkCount, setBulkCount] = useState(10);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [copiedSingle, setCopiedSingle] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const hasTrackedStarted = useRef(false);

  const trackFirstGenerate = useCallback(() => {
    if (!hasTrackedStarted.current) {
      trackStarted();
      hasTrackedStarted.current = true;
    }
  }, [trackStarted]);

  const handleGenerate = useCallback(() => {
    trackFirstGenerate();
    const uuid = crypto.randomUUID();
    setSingleUuid(formatUuid(uuid, uppercase, hyphens));
  }, [uppercase, hyphens, trackFirstGenerate]);

  const handleGenerateBulk = useCallback(() => {
    trackFirstGenerate();
    const count = Math.max(1, Math.min(100, bulkCount));
    const uuids = Array.from({ length: count }, () =>
      formatUuid(crypto.randomUUID(), uppercase, hyphens),
    );
    setBulkUuids(uuids.join("\n"));
  }, [bulkCount, uppercase, hyphens, trackFirstGenerate]);

  const handleCopySingle = useCallback(async () => {
    if (!singleUuid) return;
    await gatedDownload(async () => {
      try {
        await navigator.clipboard.writeText(singleUuid);
        setCopiedSingle(true);
        setTimeout(() => setCopiedSingle(false), 2000);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = singleUuid;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopiedSingle(true);
        setTimeout(() => setCopiedSingle(false), 2000);
      }
    });
  }, [singleUuid, gatedDownload]);

  const handleCopyAll = useCallback(async () => {
    if (!bulkUuids) return;
    await gatedDownload(async () => {
      try {
        await navigator.clipboard.writeText(bulkUuids);
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = bulkUuids;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
      }
    });
  }, [bulkUuids, gatedDownload]);

  const handleBulkCountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number.parseInt(e.target.value, 10);
      if (Number.isNaN(val)) {
        setBulkCount(1);
      } else {
        setBulkCount(Math.max(1, Math.min(100, val)));
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
            UUID
            <br />
            <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Generate UUID v4 identifiers instantly. Single or bulk, with format
            options. Fast, free, and entirely in your browser.
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
          {/* Format options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 py-3 px-4 bg-[#16131E] border border-[#2A2535] rounded-lg cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 accent-[#2DD4BF]"
              />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#EDEDEF]">
                Uppercase
              </span>
            </label>
            <label className="flex items-center gap-3 py-3 px-4 bg-[#16131E] border border-[#2A2535] rounded-lg cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={hyphens}
                onChange={(e) => setHyphens(e.target.checked)}
                className="w-4 h-4 accent-[#2DD4BF]"
              />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#EDEDEF]">
                Include Hyphens
              </span>
            </label>
          </div>

          {/* Single UUID */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2">
              Single UUID
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleGenerate}
                className="flex items-center gap-2 h-12 px-8 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-[11px] uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all min-h-[44px] shrink-0"
              >
                <RefreshCw className="w-4 h-4" />
                Generate
              </button>
              {singleUuid && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={singleUuid}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, ease }}
                    className="flex items-center gap-3 flex-1 py-3 px-4 bg-[#0C0A12] border border-[#2A2535] rounded-lg min-h-[44px]"
                  >
                    <Fingerprint className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                    <span className="font-mono text-sm sm:text-base text-[#EDEDEF] break-all select-all flex-1">
                      {singleUuid}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySingle}
                      className="shrink-0 p-2 rounded-md hover:bg-[#2A2535] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      {copiedSingle ? (
                        <Check className="w-4 h-4 text-[#2DD4BF]" />
                      ) : (
                        <ClipboardCopy className="w-4 h-4 text-[#71717A]" />
                      )}
                    </button>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#2A2535]" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
              or
            </span>
            <div className="flex-1 h-px bg-[#2A2535]" />
          </div>

          {/* Bulk generation */}
          <div>
            <label
              htmlFor="bulk-count"
              className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A] mb-2"
            >
              Generate Multiple
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative shrink-0">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                <input
                  id="bulk-count"
                  type="number"
                  value={bulkCount}
                  onChange={handleBulkCountChange}
                  min={1}
                  max={100}
                  className="w-full sm:w-32 h-12 pl-11 pr-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 font-[Inter] text-sm min-h-[44px]"
                />
              </div>
              <button
                type="button"
                onClick={handleGenerateBulk}
                className="flex items-center gap-2 h-12 px-8 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-[11px] uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all min-h-[44px] shrink-0"
              >
                <RefreshCw className="w-4 h-4" />
                Generate Bulk
              </button>
            </div>
          </div>

          {/* Bulk output */}
          {bulkUuids && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease }}
            >
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="bulk-output"
                  className="block font-mono text-[11px] uppercase tracking-wider text-[#71717A]"
                >
                  Generated UUIDs
                </label>
                <button
                  type="button"
                  onClick={handleCopyAll}
                  className="flex items-center gap-2 h-10 px-4 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-[11px] uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all min-h-[44px]"
                >
                  {copiedAll ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied All
                    </>
                  ) : (
                    <>
                      <ClipboardCopy className="w-4 h-4" />
                      Copy All
                    </>
                  )}
                </button>
              </div>
              <textarea
                id="bulk-output"
                value={bulkUuids}
                readOnly
                rows={Math.min(12, bulkCount)}
                className="w-full px-4 py-3 border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] rounded-lg font-mono text-sm resize-y min-h-[44px] placeholder:text-[#71717A]/60 focus:outline-none"
              />
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
                title: "Configure",
                desc: "Choose format options: uppercase, lowercase, with or without hyphens.",
              },
              {
                step: "02",
                title: "Generate",
                desc: "Click Generate for a single UUID or Generate Bulk for multiple.",
              },
              {
                step: "03",
                title: "Copy",
                desc: "Copy individual UUIDs or all at once to your clipboard.",
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

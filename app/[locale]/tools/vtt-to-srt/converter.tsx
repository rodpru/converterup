"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  ClipboardCopy,
  Download,
  Subtitles,
  Upload,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "VTT to SRT Converter",
  url: "https://converterup.com/tools/vtt-to-srt",
  description:
    "Convert WebVTT subtitle files to SRT format instantly. Free, fast, and works entirely in your browser.",
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

function convertVttToSrt(vtt: string): string {
  let content = vtt.trim();

  // Remove WEBVTT header and any metadata lines
  content = content.replace(/^WEBVTT[^\n]*\n*/i, "");
  content = content.replace(/^(Kind|Language|NOTE)[^\n]*\n*/gim, "");
  content = content.trim();

  // Split into cue blocks
  const blocks = content.split(/\n\s*\n/).filter((block) => block.trim());

  const srtBlocks: string[] = [];
  let index = 1;

  for (const block of blocks) {
    const lines = block.trim().split("\n");

    // Find the timestamp line
    let timestampLineIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("-->")) {
        timestampLineIndex = i;
        break;
      }
    }

    if (timestampLineIndex === -1) continue;

    // Convert timestamp format: . to ,
    let timestamp = lines[timestampLineIndex];
    // Replace dots with commas in timestamps
    timestamp = timestamp.replace(/(\d{2}:\d{2}:\d{2})\.(\d{3})/g, "$1,$2");
    // Add hours if missing (VTT allows MM:SS.mmm)
    timestamp = timestamp.replace(/(?<!\d)(\d{2}:\d{2}),(\d{3})/g, "00:$1,$2");
    // Remove position/alignment cues
    timestamp = timestamp.replace(
      /\s+(position|align|line|size|region):[^\s]*/gi,
      "",
    );

    const textLines = lines.slice(timestampLineIndex + 1);
    // Remove VTT tags like <b>, <i>, <c.colorClass>
    const text = textLines
      .map((line) => line.replace(/<[^>]+>/g, ""))
      .join("\n");

    if (text.trim()) {
      srtBlocks.push(`${index}\n${timestamp.trim()}\n${text}`);
      index++;
    }
  }

  return srtBlocks.join("\n\n") + "\n";
}

export function VttToSrtConverter() {
  return (
    <ToolGate toolName="vtt-to-srt">
      {({ gatedDownload, trackStarted }) => (
        <VttToSrtConverterContent
          gatedDownload={gatedDownload}
          trackStarted={trackStarted}
        />
      )}
    </ToolGate>
  );
}

function VttToSrtConverterContent({
  gatedDownload,
  trackStarted,
}: {
  gatedDownload: (downloadFn: () => void | Promise<void>, persistable?: { data: Blob | string; filename: string }) => Promise<void>;
  trackStarted: () => void;
}) {
  const [vttInput, setVttInput] = useState("");
  const [srtOutput, setSrtOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasTrackedStarted = useRef(false);

  const handleConvert = useCallback((input: string) => {
    setError(null);
    setSrtOutput("");

    const trimmed = input.trim();
    if (!trimmed) {
      setError("Please paste VTT content or upload a .vtt file.");
      return;
    }

    try {
      const result = convertVttToSrt(trimmed);
      if (!result.trim()) {
        setError("No valid subtitle cues found in the input.");
        return;
      }
      setSrtOutput(result);
    } catch {
      setError("Failed to parse VTT content. Please check the format.");
    }
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setVttInput(value);
      if (value.trim()) {
        handleConvert(value);
        if (!hasTrackedStarted.current) {
          trackStarted();
          hasTrackedStarted.current = true;
        }
      } else {
        setSrtOutput("");
        setError(null);
      }
    },
    [handleConvert, trackStarted],
  );

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        setVttInput(text);
        handleConvert(text);
        if (!hasTrackedStarted.current) {
          trackStarted();
          hasTrackedStarted.current = true;
        }
      };
      reader.readAsText(file);
    },
    [handleConvert, trackStarted],
  );

  const handleCopy = useCallback(async () => {
    if (!srtOutput) return;
    await gatedDownload(async () => {
      await navigator.clipboard.writeText(srtOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [srtOutput, gatedDownload]);

  const handleDownload = useCallback(async () => {
    if (!srtOutput) return;
    const baseName = fileName ? fileName.replace(/\.vtt$/i, "") : "subtitles";
    const downloadFilename = `${baseName}.srt`;
    await gatedDownload(() => {
      const blob = new Blob([srtOutput], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = downloadFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, { data: new Blob([srtOutput], { type: "text/plain;charset=utf-8" }), filename: downloadFilename });
  }, [srtOutput, fileName, gatedDownload]);

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
            VTT to SRT
            <br />
            <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Convert WebVTT subtitle files to SRT format. Upload a file or paste
            content directly — conversion happens instantly in your browser.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Upload button */}
          <div className="flex items-center gap-3 mb-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".vtt,text/vtt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 h-12 px-5 rounded-lg border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] font-[Inter] text-sm"
            >
              <Upload className="w-4 h-4" />
              Upload .vtt file
            </button>
            {fileName && (
              <span className="font-mono text-[11px] text-[#71717A]">
                {fileName}
              </span>
            )}
          </div>

          {/* Input / Output split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* VTT Input */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Subtitles className="w-4 h-4 text-primary" />
                <span className="text-sm font-[Syne] font-bold text-[#EDEDEF]">
                  VTT Input
                </span>
              </div>
              <textarea
                value={vttInput}
                onChange={handleInputChange}
                placeholder={`WEBVTT\n\n00:00:01.000 --> 00:00:04.000\nHello, world!\n\n00:00:05.000 --> 00:00:08.000\nThis is a subtitle.`}
                className="flex-1 min-h-[300px] p-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 placeholder:text-[#71717A]/40 font-mono text-sm resize-y"
                spellCheck={false}
              />
            </div>

            {/* SRT Output */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Subtitles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-[Syne] font-bold text-[#EDEDEF]">
                    SRT Output
                  </span>
                </div>
                {srtOutput && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 h-8 px-3 rounded-md border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors text-xs font-mono"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <ClipboardCopy className="w-3.5 h-3.5" />
                      )}
                      {copied ? "Copied" : "Copy"}
                    </button>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 h-8 px-3 rounded-md bg-[#2DD4BF] text-[#042F2E] text-xs font-mono font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download .srt
                    </button>
                  </div>
                )}
              </div>
              <textarea
                value={srtOutput}
                readOnly
                placeholder="SRT output will appear here..."
                className="flex-1 min-h-[300px] p-4 border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] rounded-lg font-mono text-sm resize-y placeholder:text-[#71717A]/40"
                spellCheck={false}
              />
            </div>
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
                title: "Paste or Upload",
                desc: "Paste VTT content or upload a .vtt subtitle file.",
              },
              {
                step: "02",
                title: "Instant Convert",
                desc: "Timestamps and cues are converted to SRT format automatically.",
              },
              {
                step: "03",
                title: "Download or Copy",
                desc: "Download as .srt or copy the output to your clipboard.",
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

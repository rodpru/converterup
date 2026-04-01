"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Download, ImageIcon, Link2, Loader2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";

const THUMBNAIL_QUALITIES = [
  { key: "maxresdefault", label: "Max Resolution", width: 1280, height: 720 },
  { key: "sddefault", label: "Standard", width: 640, height: 480 },
  { key: "hqdefault", label: "High Quality", width: 480, height: 360 },
  { key: "mqdefault", label: "Medium Quality", width: 320, height: 180 },
  { key: "default", label: "Default", width: 120, height: 90 },
] as const;

type ThumbnailResult = {
  key: string;
  label: string;
  width: number;
  height: number;
  url: string;
  exists: boolean;
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "YouTube Thumbnail Downloader",
  url: "https://converterup.com/tools/youtube-thumbnail-downloader",
  description:
    "Download YouTube video thumbnails in all available resolutions. Free, fast, and works entirely in your browser.",
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

function extractVideoId(url: string): string | null {
  const trimmed = url.trim();

  const patterns = [
    /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  return null;
}

async function checkImageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(img.naturalWidth > 120 || url.includes("/default."));
    };
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

async function downloadThumbnail(url: string, filename: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}

const ease = [0.16, 1, 0.3, 1] as const;

export function YouTubeThumbnailDownloader() {
  return (
    <ToolGate toolName="youtube-thumbnail-downloader">
      {({ gatedDownload, trackStarted }) => (
        <YouTubeThumbnailDownloaderContent
          gatedDownload={gatedDownload}
          trackStarted={trackStarted}
        />
      )}
    </ToolGate>
  );
}

function YouTubeThumbnailDownloaderContent({
  gatedDownload,
  trackStarted,
}: {
  gatedDownload: (downloadFn: () => void | Promise<void>) => Promise<void>;
  trackStarted: () => void;
}) {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<ThumbnailResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
  const hasTrackedStarted = useRef(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setThumbnails([]);

      const id = extractVideoId(url);
      if (!id) {
        setError(
          "Invalid YouTube URL. Please enter a valid YouTube video link.",
        );
        return;
      }

      setVideoId(id);
      setLoading(true);
      if (!hasTrackedStarted.current) {
        trackStarted();
        hasTrackedStarted.current = true;
      }

      const results: ThumbnailResult[] = [];

      await Promise.all(
        THUMBNAIL_QUALITIES.map(async (q) => {
          const thumbUrl = `https://img.youtube.com/vi/${id}/${q.key}.jpg`;
          const exists = await checkImageExists(thumbUrl);
          results.push({
            key: q.key,
            label: q.label,
            width: q.width,
            height: q.height,
            url: thumbUrl,
            exists,
          });
        }),
      );

      const ordered = THUMBNAIL_QUALITIES.map((q) =>
        results.find((r) => r.key === q.key),
      ).filter((r): r is ThumbnailResult => r !== undefined);

      setThumbnails(ordered);
      setLoading(false);
    },
    [url, trackStarted],
  );

  const handleDownload = useCallback(
    async (thumb: ThumbnailResult) => {
      setDownloadingKey(thumb.key);
      try {
        await gatedDownload(async () => {
          await downloadThumbnail(
            thumb.url,
            `yt-thumbnail-${videoId}-${thumb.key}.jpg`,
          );
        });
      } catch {
        setError("Failed to download thumbnail. Please try again.");
      }
      setDownloadingKey(null);
    },
    [videoId, gatedDownload],
  );

  const availableThumbnails = thumbnails.filter((t) => t.exists);

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
            YouTube Thumbnail
            <br />
            <span className="gradient-text">Downloader</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Download YouTube video thumbnails in all available resolutions.
            Paste a URL and grab any size you need, instantly.
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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL here..."
                className="w-full h-12 pl-11 pr-4 border border-[#2A2535] bg-[#1C1825] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 min-h-[44px] placeholder:text-[#71717A]/60 font-[Inter] text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="h-12 px-6 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] shrink-0"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading
                </span>
              ) : (
                "Get Thumbnails"
              )}
            </button>
          </form>

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

        <AnimatePresence>
          {availableThumbnails.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="max-w-5xl mx-auto mt-10 sm:mt-14"
            >
              <div className="flex items-center gap-2 mb-6">
                <ImageIcon className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
                  Available Thumbnails
                </h2>
                <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                  {availableThumbnails.length} found
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableThumbnails.map((thumb, i) => (
                  <motion.div
                    key={thumb.key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease, delay: i * 0.08 }}
                    className="group bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden hover:border-[#2DD4BF]/20 transition-colors duration-200"
                  >
                    <div className="relative aspect-video bg-[#0C0A12]">
                      {/* biome-ignore lint/performance/noImgElement: External YouTube URLs loaded dynamically from user input */}
                      <img
                        src={thumb.url}
                        alt={`${thumb.label} thumbnail`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-[Inter] font-medium text-[#EDEDEF]">
                          {thumb.label}
                        </p>
                        <p className="font-mono text-[11px] text-[#71717A]">
                          {thumb.width} x {thumb.height}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDownload(thumb)}
                        disabled={downloadingKey === thumb.key}
                        className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#EDEDEF] hover:border-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors min-h-[44px] min-w-[44px] disabled:opacity-50"
                        title={`Download ${thumb.label}`}
                      >
                        {downloadingKey === thumb.key ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {thumbnails.length > 0 &&
          availableThumbnails.length === 0 &&
          !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto mt-10 text-center"
            >
              <p className="text-[#71717A] text-sm font-[Inter]">
                No thumbnails found for this video. Please check the URL and try
                again.
              </p>
            </motion.div>
          )}
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
                title: "Paste URL",
                desc: "Copy any YouTube video link and paste it above.",
              },
              {
                step: "02",
                title: "Preview",
                desc: "See all available thumbnail resolutions instantly.",
              },
              {
                step: "03",
                title: "Download",
                desc: "Click the download button for any resolution you need.",
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

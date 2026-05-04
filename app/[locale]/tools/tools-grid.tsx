"use client";

import {
  AppWindow,
  Binary,
  Braces,
  Calculator,
  CaseSensitive,
  Clapperboard,
  FileCode,
  FileImage,
  FileSearch,
  Film,
  Fingerprint,
  Hash,
  ImageDown,
  Paintbrush,
  Palette,
  QrCode,
  Repeat,
  Scaling,
  Search,
  Subtitles,
  Table,
  Unlock,
  Youtube,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Suspense, useMemo, useState } from "react";
import { Link } from "@/i18n/routing";

export const tools = [
  {
    name: "Image Compressor",
    description: "Reduce image file size without losing quality.",
    href: "/tools/image-compressor",
    icon: ImageDown,
    tags: ["image", "compress", "reduce", "size", "png", "jpg", "webp"],
  },
  {
    name: "Image Resizer",
    description: "Resize images to exact dimensions or percentages.",
    href: "/tools/image-resizer",
    icon: Scaling,
    tags: ["image", "resize", "dimensions", "scale", "crop"],
  },
  {
    name: "Video to GIF",
    description: "Convert video clips into lightweight animated GIFs.",
    href: "/tools/video-to-gif",
    icon: Film,
    tags: ["video", "gif", "convert", "animation", "mp4"],
  },
  {
    name: "QR Code Generator",
    description: "Generate QR codes for URLs, text, or contact info.",
    href: "/tools/qr-code-generator",
    icon: QrCode,
    tags: ["qr", "code", "generate", "url", "barcode"],
  },
  {
    name: "YouTube Thumbnail Downloader",
    description: "Download YouTube thumbnails in all resolutions.",
    href: "/tools/youtube-thumbnail-downloader",
    icon: Youtube,
    tags: ["youtube", "thumbnail", "download", "video", "image"],
  },
  {
    name: "EXIF Viewer & Remover",
    description: "View and strip metadata from your photos.",
    href: "/tools/exif-viewer",
    icon: FileSearch,
    tags: ["exif", "metadata", "photo", "privacy", "gps", "camera"],
  },
  {
    name: "Color Palette Extractor",
    description: "Extract dominant colors from any image.",
    href: "/tools/color-palette",
    icon: Palette,
    tags: ["color", "palette", "extract", "image", "hex", "rgb"],
  },
  {
    name: "Favicon Generator",
    description: "Generate favicons in all sizes from a single image.",
    href: "/tools/favicon-generator",
    icon: AppWindow,
    tags: ["favicon", "icon", "generate", "website", "pwa"],
  },
  {
    name: "SVG to PNG",
    description: "Convert SVG vector files to PNG raster images.",
    href: "/tools/svg-to-png",
    icon: FileImage,
    tags: ["svg", "png", "convert", "vector", "raster"],
  },
  {
    name: "Image to Base64",
    description: "Encode images as Base64 data URIs for embedding.",
    href: "/tools/image-to-base64",
    icon: Binary,
    tags: ["image", "base64", "encode", "data uri", "embed"],
  },
  {
    name: "Video Frame Extractor",
    description: "Extract individual frames from video files.",
    href: "/tools/video-frame-extractor",
    icon: Clapperboard,
    tags: ["video", "frame", "screenshot", "extract", "capture"],
  },
  {
    name: "Stripe Fee Calculator",
    description: "Calculate Stripe processing fees for any amount.",
    href: "/tools/stripe-fee-calculator",
    icon: Calculator,
    tags: ["stripe", "fee", "calculator", "payment", "processing"],
  },
  {
    name: "Text Repeater",
    description: "Repeat any text multiple times with separators.",
    href: "/tools/text-repeater",
    icon: Repeat,
    tags: ["text", "repeat", "copy", "duplicate", "generate"],
  },
  {
    name: "VTT to SRT Converter",
    description: "Convert WebVTT subtitles to SRT format instantly.",
    href: "/tools/vtt-to-srt",
    icon: Subtitles,
    tags: ["vtt", "srt", "subtitle", "convert", "caption"],
  },
  {
    name: "JSON Viewer",
    description: "Format, validate, and explore JSON with syntax highlighting.",
    href: "/tools/json-viewer",
    icon: Braces,
    tags: ["json", "format", "validate", "viewer", "prettify"],
  },
  {
    name: "Hex to Decimal",
    description: "Convert between hex, decimal, binary, and octal.",
    href: "/tools/hex-to-decimal",
    icon: Hash,
    tags: ["hex", "decimal", "binary", "octal", "convert", "number"],
  },
  {
    name: "HTML Minifier",
    description: "Minify HTML code to reduce file size.",
    href: "/tools/html-minifier",
    icon: FileCode,
    tags: ["html", "minify", "compress", "code", "web"],
  },
  {
    name: "CSS Minifier",
    description: "Minify CSS stylesheets for faster loading.",
    href: "/tools/css-minifier",
    icon: Paintbrush,
    tags: ["css", "minify", "compress", "stylesheet", "web"],
  },
  {
    name: "UUID Generator",
    description: "Generate UUID v4 identifiers instantly.",
    href: "/tools/uuid-generator",
    icon: Fingerprint,
    tags: ["uuid", "guid", "generate", "random", "identifier"],
  },
  {
    name: "Base64 Decoder",
    description: "Decode Base64 strings to text or images.",
    href: "/tools/base64-decode",
    icon: Unlock,
    tags: ["base64", "decode", "text", "image", "data uri"],
  },
  {
    name: "Case Converter",
    description: "Convert text between camelCase, snake_case, and more.",
    href: "/tools/case-converter",
    icon: CaseSensitive,
    tags: ["case", "convert", "camel", "snake", "uppercase", "lowercase"],
  },
  {
    name: "CSV to JSON",
    description: "Convert CSV files to JSON format instantly.",
    href: "/tools/csv-to-json",
    icon: Table,
    tags: ["csv", "json", "convert", "data", "spreadsheet"],
  },
];

function ToolsGridInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const t = useTranslations("Tools");

  const filtered = useMemo(() => {
    if (!query.trim()) return tools;
    const q = query.toLowerCase();
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.includes(q)),
    );
  }, [query]);

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-20 sm:pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-primary mb-4">
            {t("badge")}
          </span>
          <h1 className="text-3xl sm:text-5xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
            {t("title1")} <span className="gradient-text">{t("title2")}</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto mb-6">
            {t("desc")}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2DD4BF]/20 bg-[#2DD4BF]/5 mb-8">
            <span className="text-[#2DD4BF] font-mono text-xs">
              {t("freeUses")}
            </span>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search")}
              className="w-full h-12 pl-11 pr-4 border border-[#2A2535] bg-[#16131E] text-[#EDEDEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-[#2DD4BF]/30 placeholder:text-[#71717A]/60 font-[Inter] text-sm min-h-[44px]"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-[#71717A] font-[Inter] py-12">
              {t("noResults")} &quot;{query}&quot;
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group bg-[#16131E] border border-[#2A2535] rounded-xl p-5 hover:border-[#2DD4BF]/20 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#2A2535] bg-[#0C0A12] text-[#2DD4BF] group-hover:border-[#2DD4BF]/30 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h2 className="text-base font-[Syne] font-bold text-[#EDEDEF] mb-1 group-hover:text-[#2DD4BF] transition-colors">
                      {tool.name}
                    </h2>
                    <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                      {tool.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function ToolsGrid() {
  return (
    <Suspense>
      <ToolsGridInner />
    </Suspense>
  );
}

"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";

const allTools = [
  { name: "Image Compressor", href: "/tools/image-compressor", category: "image" },
  { name: "Image Resizer", href: "/tools/image-resizer", category: "image" },
  { name: "Video to GIF", href: "/tools/video-to-gif", category: "video" },
  { name: "QR Code Generator", href: "/tools/qr-code-generator", category: "utility" },
  { name: "YouTube Thumbnails", href: "/tools/youtube-thumbnail-downloader", category: "video" },
  { name: "EXIF Viewer", href: "/tools/exif-viewer", category: "image" },
  { name: "Color Palette", href: "/tools/color-palette", category: "image" },
  { name: "Favicon Generator", href: "/tools/favicon-generator", category: "image" },
  { name: "SVG to PNG", href: "/tools/svg-to-png", category: "image" },
  { name: "Image to Base64", href: "/tools/image-to-base64", category: "image" },
  { name: "Frame Extractor", href: "/tools/video-frame-extractor", category: "video" },
  { name: "Stripe Fees", href: "/tools/stripe-fee-calculator", category: "utility" },
  { name: "Text Repeater", href: "/tools/text-repeater", category: "utility" },
  { name: "VTT to SRT", href: "/tools/vtt-to-srt", category: "utility" },
  { name: "JSON Viewer", href: "/tools/json-viewer", category: "code" },
  { name: "Hex to Decimal", href: "/tools/hex-to-decimal", category: "code" },
  { name: "HTML Minifier", href: "/tools/html-minifier", category: "code" },
  { name: "CSS Minifier", href: "/tools/css-minifier", category: "code" },
  { name: "UUID Generator", href: "/tools/uuid-generator", category: "code" },
  { name: "Base64 Decoder", href: "/tools/base64-decode", category: "code" },
  { name: "Case Converter", href: "/tools/case-converter", category: "utility" },
  { name: "CSV to JSON", href: "/tools/csv-to-json", category: "code" },
];

export function RelatedTools() {
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("Internal");
  const locale = (params?.locale as string) ?? "en";
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  if (pathname === "/tools" || pathname === `${localePrefix}/tools`) return null;

  const stripped = pathname.startsWith(localePrefix)
    ? pathname.slice(localePrefix.length) || "/"
    : pathname;

  const currentTool = allTools.find((tool) => tool.href === stripped);
  const category = currentTool?.category;

  const related = allTools
    .filter((tool) => tool.href !== stripped)
    .sort((a, b) => {
      if (!category) return 0;
      const aMatch = a.category === category ? -1 : 1;
      const bMatch = b.category === category ? -1 : 1;
      return aMatch - bMatch;
    })
    .slice(0, 4);

  return (
    <section className="container mx-auto px-4 sm:px-6 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
            {t("moreTools")}
          </h2>
          <Link
            href="/tools"
            className="flex items-center gap-1 text-xs font-mono text-[#2DD4BF] hover:text-[#EDEDEF] transition-colors uppercase tracking-wider"
          >
            {t("viewAll")}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {related.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="bg-[#16131E] border border-[#2A2535] rounded-lg p-3 hover:border-[#2DD4BF]/20 transition-colors text-center"
            >
              <span className="text-sm font-[Syne] font-semibold text-[#EDEDEF] group-hover:text-[#2DD4BF]">
                {tool.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

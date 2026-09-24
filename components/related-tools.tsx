"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

const allTools = [
  { href: "/tools/media-converter", category: "video" },
  { href: "/tools/image-compressor", category: "image" },
  { href: "/tools/image-resizer", category: "image" },
  { href: "/tools/video-to-gif", category: "video" },
  { href: "/tools/qr-code-generator", category: "utility" },
  { href: "/tools/youtube-thumbnail-downloader", category: "video" },
  { href: "/tools/exif-viewer", category: "image" },
  { href: "/tools/color-palette", category: "image" },
  { href: "/tools/favicon-generator", category: "image" },
  { href: "/tools/svg-to-png", category: "image" },
  { href: "/tools/image-to-base64", category: "image" },
  { href: "/tools/video-frame-extractor", category: "video" },
  { href: "/tools/stripe-fee-calculator", category: "utility" },
  { href: "/tools/text-repeater", category: "utility" },
  { href: "/tools/vtt-to-srt", category: "utility" },
  { href: "/tools/json-viewer", category: "code" },
  { href: "/tools/hex-to-decimal", category: "code" },
  { href: "/tools/html-minifier", category: "code" },
  { href: "/tools/css-minifier", category: "code" },
  { href: "/tools/uuid-generator", category: "code" },
  { href: "/tools/base64-decode", category: "code" },
  { href: "/tools/case-converter", category: "utility" },
  { href: "/tools/csv-to-json", category: "code" },
];

export function RelatedTools() {
  // Locale-less on server and client (see Breadcrumbs).
  const pathname = usePathname();
  const t = useTranslations("Internal");
  const tu = useTranslations("SharedUI.tools");

  if (pathname === "/tools") return null;

  const stripped = pathname;

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
                {tu(`${tool.href.replace("/tools/", "")}.name`)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

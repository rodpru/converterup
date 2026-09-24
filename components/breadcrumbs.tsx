"use client";

import { ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { JsonLd } from "@/components/json-ld";
import { Link, usePathname } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";

// Tool display names live in messages (SharedUI.tools.<slug>.name).
const toolSlugs = new Set([
  "image-compressor",
  "image-resizer",
  "video-to-gif",
  "qr-code-generator",
  "youtube-thumbnail-downloader",
  "exif-viewer",
  "color-palette",
  "favicon-generator",
  "svg-to-png",
  "image-to-base64",
  "video-frame-extractor",
  "stripe-fee-calculator",
  "text-repeater",
  "vtt-to-srt",
  "json-viewer",
  "hex-to-decimal",
  "html-minifier",
  "css-minifier",
  "uuid-generator",
  "base64-decode",
  "case-converter",
  "csv-to-json",
  "heic-to-jpg",
  "heic-to-pdf",
  "media-converter",
]);

export function Breadcrumbs() {
  // next-intl's usePathname is locale-less on both server and client. The
  // next/navigation one returns "/en/tools/x" during static generation but
  // "/tools/x" in the browser, which broke hydration.
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("SharedUI");

  // Only show on individual tool pages, not /tools index
  if (pathname === "/tools") return null;

  const slug = pathname.replace("/tools/", "");
  if (!toolSlugs.has(slug)) return null;
  const toolName = t(`tools.${slug}.name`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("home"),
        item: localizedUrl("", locale),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("toolsLabel"),
        item: localizedUrl("/tools", locale),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: toolName,
        item: localizedUrl(pathname, locale),
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav className="container mx-auto px-4 sm:px-6 pt-4">
        <ol className="flex items-center gap-1.5 font-mono text-[11px] text-[#71717A]">
          <li>
            <Link href="/" className="hover:text-[#EDEDEF] transition-colors">
              {t("home")}
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3 h-3" />
          </li>
          <li>
            <Link
              href="/tools"
              className="hover:text-[#EDEDEF] transition-colors"
            >
              {t("toolsLabel")}
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3 h-3" />
          </li>
          <li className="text-[#EDEDEF]">{toolName}</li>
        </ol>
      </nav>
    </>
  );
}

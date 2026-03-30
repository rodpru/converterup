"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";

const toolNames: Record<string, string> = {
  "image-compressor": "Image Compressor",
  "image-resizer": "Image Resizer",
  "video-to-gif": "Video to GIF",
  "qr-code-generator": "QR Code Generator",
  "youtube-thumbnail-downloader": "YouTube Thumbnail Downloader",
  "exif-viewer": "EXIF Viewer & Remover",
  "color-palette": "Color Palette Extractor",
  "favicon-generator": "Favicon Generator",
  "svg-to-png": "SVG to PNG",
  "image-to-base64": "Image to Base64",
  "video-frame-extractor": "Video Frame Extractor",
  "stripe-fee-calculator": "Stripe Fee Calculator",
  "text-repeater": "Text Repeater",
  "vtt-to-srt": "VTT to SRT Converter",
  "json-viewer": "JSON Viewer",
  "hex-to-decimal": "Hex to Decimal",
  "html-minifier": "HTML Minifier",
  "css-minifier": "CSS Minifier",
  "uuid-generator": "UUID Generator",
  "base64-decode": "Base64 Decoder",
  "case-converter": "Case Converter",
  "csv-to-json": "CSV to JSON",
};

export function Breadcrumbs() {
  const pathname = usePathname();

  // Only show on individual tool pages, not /tools index
  if (pathname === "/tools") return null;

  const slug = pathname.replace("/tools/", "");
  const toolName = toolNames[slug];
  if (!toolName) return null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://converterup.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://converterup.com/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: toolName,
        item: `https://converterup.com${pathname}`,
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
              Home
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
              Tools
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

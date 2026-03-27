"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

const allTools = [
  {
    name: "Image Compressor",
    href: "/tools/image-compressor",
    category: "image",
  },
  { name: "Image Resizer", href: "/tools/image-resizer", category: "image" },
  { name: "Video to GIF", href: "/tools/video-to-gif", category: "video" },
  {
    name: "QR Code Generator",
    href: "/tools/qr-code-generator",
    category: "utility",
  },
  {
    name: "YouTube Thumbnails",
    href: "/tools/youtube-thumbnail-downloader",
    category: "video",
  },
  { name: "EXIF Viewer", href: "/tools/exif-viewer", category: "image" },
  { name: "Color Palette", href: "/tools/color-palette", category: "image" },
  {
    name: "Favicon Generator",
    href: "/tools/favicon-generator",
    category: "image",
  },
  { name: "SVG to PNG", href: "/tools/svg-to-png", category: "image" },
  {
    name: "Image to Base64",
    href: "/tools/image-to-base64",
    category: "image",
  },
  {
    name: "Frame Extractor",
    href: "/tools/video-frame-extractor",
    category: "video",
  },
  {
    name: "Stripe Fees",
    href: "/tools/stripe-fee-calculator",
    category: "utility",
  },
  { name: "Text Repeater", href: "/tools/text-repeater", category: "utility" },
  { name: "VTT to SRT", href: "/tools/vtt-to-srt", category: "utility" },
  { name: "JSON Viewer", href: "/tools/json-viewer", category: "code" },
  { name: "Hex to Decimal", href: "/tools/hex-to-decimal", category: "code" },
];

export function RelatedTools() {
  const pathname = usePathname();

  // Don't show on the tools index page
  if (pathname === "/tools") return null;

  const currentTool = allTools.find((t) => t.href === pathname);
  const category = currentTool?.category;

  const related = allTools
    .filter((t) => t.href !== pathname)
    .sort((a, b) => {
      if (category) {
        const aMatch = a.category === category ? -1 : 1;
        const bMatch = b.category === category ? -1 : 1;
        return aMatch - bMatch;
      }
      return 0;
    })
    .slice(0, 4);

  return (
    <section className="container mx-auto px-4 sm:px-6 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
            More Tools
          </h2>
          <Link
            href="/tools"
            className="flex items-center gap-1 text-xs font-mono text-[#2DD4BF] hover:text-[#EDEDEF] transition-colors uppercase tracking-wider"
          >
            View All
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

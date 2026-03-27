import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import {
  ImageDown,
  Scaling,
  Film,
  QrCode,
  Youtube,
  FileSearch,
  Palette,
  AppWindow,
  FileImage,
  Binary,
  Clapperboard,
  Calculator,
  Repeat,
  Subtitles,
  Braces,
  Hash,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Online Tools | ConverterUp",
  description:
    "16 free browser-based tools for images, video, code, and more. 3 free uses per day. 100% private — files never leave your device.",
  alternates: {
    canonical: "https://converterup.com/tools",
  },
  openGraph: {
    title: "Free Online Tools | ConverterUp",
    description:
      "16 free browser-based tools for images, video, code, and more. 3 free uses per day.",
    url: "https://converterup.com/tools",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tools | ConverterUp",
    description:
      "16 free browser-based tools for images, video, code, and more. 3 free uses per day.",
  },
};

const tools = [
  {
    name: "Image Compressor",
    description: "Reduce image file size without losing quality.",
    href: "/tools/image-compressor",
    icon: ImageDown,
  },
  {
    name: "Image Resizer",
    description: "Resize images to exact dimensions or percentages.",
    href: "/tools/image-resizer",
    icon: Scaling,
  },
  {
    name: "Video to GIF",
    description: "Convert video clips into lightweight animated GIFs.",
    href: "/tools/video-to-gif",
    icon: Film,
  },
  {
    name: "QR Code Generator",
    description: "Generate QR codes for URLs, text, or contact info.",
    href: "/tools/qr-code-generator",
    icon: QrCode,
  },
  {
    name: "YouTube Thumbnail Downloader",
    description: "Download YouTube thumbnails in all resolutions.",
    href: "/tools/youtube-thumbnail-downloader",
    icon: Youtube,
  },
  {
    name: "EXIF Viewer & Remover",
    description: "View and strip metadata from your photos.",
    href: "/tools/exif-viewer",
    icon: FileSearch,
  },
  {
    name: "Color Palette Extractor",
    description: "Extract dominant colors from any image.",
    href: "/tools/color-palette",
    icon: Palette,
  },
  {
    name: "Favicon Generator",
    description: "Generate favicons in all sizes from a single image.",
    href: "/tools/favicon-generator",
    icon: AppWindow,
  },
  {
    name: "SVG to PNG",
    description: "Convert SVG vector files to PNG raster images.",
    href: "/tools/svg-to-png",
    icon: FileImage,
  },
  {
    name: "Image to Base64",
    description: "Encode images as Base64 data URIs for embedding.",
    href: "/tools/image-to-base64",
    icon: Binary,
  },
  {
    name: "Video Frame Extractor",
    description: "Extract individual frames from video files.",
    href: "/tools/video-frame-extractor",
    icon: Clapperboard,
  },
  {
    name: "Stripe Fee Calculator",
    description: "Calculate Stripe processing fees for any amount.",
    href: "/tools/stripe-fee-calculator",
    icon: Calculator,
  },
  {
    name: "Text Repeater",
    description: "Repeat any text multiple times with separators.",
    href: "/tools/text-repeater",
    icon: Repeat,
  },
  {
    name: "VTT to SRT Converter",
    description: "Convert WebVTT subtitles to SRT format instantly.",
    href: "/tools/vtt-to-srt",
    icon: Subtitles,
  },
  {
    name: "JSON Viewer",
    description: "Format, validate, and explore JSON with syntax highlighting.",
    href: "/tools/json-viewer",
    icon: Braces,
  },
  {
    name: "Hex to Decimal",
    description: "Convert between hex, decimal, binary, and octal.",
    href: "/tools/hex-to-decimal",
    icon: Hash,
  },
];

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "ConverterUp Free Online Tools",
          description:
            "16 free browser-based tools for images, video, code, and more.",
          numberOfItems: tools.length,
          itemListElement: tools.map((tool, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: tool.name,
            description: tool.description,
            url: `https://converterup.com${tool.href}`,
          })),
        }}
      />
      <section className="container mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-20 sm:pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-primary mb-4">
            All Tools
          </span>
          <h1 className="text-3xl sm:text-5xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
            Free Online <span className="gradient-text">Tools</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto mb-6">
            Browser-based utilities for images, video, code, and more. 100%
            private — your files never leave your device.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2DD4BF]/20 bg-[#2DD4BF]/5">
            <span className="text-[#2DD4BF] font-mono text-xs">
              3 free uses per day
            </span>
            <span className="text-[#71717A] font-mono text-xs">
              — sign up for free, or go unlimited for $5/mo
            </span>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool) => {
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
      </section>
    </>
  );
}

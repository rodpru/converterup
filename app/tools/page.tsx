import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ToolsGrid } from "./tools-grid";

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
          numberOfItems: 16,
          itemListElement: [
            {
              name: "Image Compressor",
              href: "/tools/image-compressor",
              description: "Reduce image file size without losing quality.",
            },
            {
              name: "Image Resizer",
              href: "/tools/image-resizer",
              description: "Resize images to exact dimensions or percentages.",
            },
            {
              name: "Video to GIF",
              href: "/tools/video-to-gif",
              description:
                "Convert video clips into lightweight animated GIFs.",
            },
            {
              name: "QR Code Generator",
              href: "/tools/qr-code-generator",
              description: "Generate QR codes for URLs, text, or contact info.",
            },
            {
              name: "YouTube Thumbnail Downloader",
              href: "/tools/youtube-thumbnail-downloader",
              description: "Download YouTube thumbnails in all resolutions.",
            },
            {
              name: "EXIF Viewer & Remover",
              href: "/tools/exif-viewer",
              description: "View and strip metadata from your photos.",
            },
            {
              name: "Color Palette Extractor",
              href: "/tools/color-palette",
              description: "Extract dominant colors from any image.",
            },
            {
              name: "Favicon Generator",
              href: "/tools/favicon-generator",
              description:
                "Generate favicons in all sizes from a single image.",
            },
            {
              name: "SVG to PNG",
              href: "/tools/svg-to-png",
              description: "Convert SVG vector files to PNG raster images.",
            },
            {
              name: "Image to Base64",
              href: "/tools/image-to-base64",
              description: "Encode images as Base64 data URIs for embedding.",
            },
            {
              name: "Video Frame Extractor",
              href: "/tools/video-frame-extractor",
              description: "Extract individual frames from video files.",
            },
            {
              name: "Stripe Fee Calculator",
              href: "/tools/stripe-fee-calculator",
              description: "Calculate Stripe processing fees for any amount.",
            },
            {
              name: "Text Repeater",
              href: "/tools/text-repeater",
              description: "Repeat any text multiple times with separators.",
            },
            {
              name: "VTT to SRT Converter",
              href: "/tools/vtt-to-srt",
              description: "Convert WebVTT subtitles to SRT format instantly.",
            },
            {
              name: "JSON Viewer",
              href: "/tools/json-viewer",
              description:
                "Format, validate, and explore JSON with syntax highlighting.",
            },
            {
              name: "Hex to Decimal",
              href: "/tools/hex-to-decimal",
              description: "Convert between hex, decimal, binary, and octal.",
            },
          ].map((tool, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: tool.name,
            description: tool.description,
            url: `https://converterup.com${tool.href}`,
          })),
        }}
      />
      <ToolsGrid />
    </>
  );
}

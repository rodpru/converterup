import type { Metadata } from "next";
import { SvgToPngConverter } from "./converter";
import { RelatedGuides } from "@/components/related-guides";

export const metadata: Metadata = {
  title: "Free SVG to PNG Converter — Convert SVG Files Online | ConverterUp",
  description:
    "Convert SVG files to PNG images with custom scale and background options. Free, fast, and 100% browser-based. No uploads required.",
  alternates: {
    canonical: "https://converterup.com/tools/svg-to-png",
  },
  openGraph: {
    title: "Free SVG to PNG Converter — Convert SVG Files Online",
    description:
      "Convert SVG files to PNG with custom resolution and background. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/svg-to-png",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free SVG to PNG Converter — Convert SVG Files Online",
    description:
      "Convert SVG files to PNG with custom resolution and background. Free, fast, and works entirely in your browser.",
  },
};

export default function SvgToPngPage() {
  return (
    <>
      <SvgToPngConverter />
      <RelatedGuides toolHref="/tools/svg-to-png" />
    </>
  );
}

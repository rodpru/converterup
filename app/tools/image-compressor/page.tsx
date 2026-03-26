import type { Metadata } from "next";
import { ImageCompressor } from "./compressor";

export const metadata: Metadata = {
  title: "Free Image Compressor — Reduce File Size Online | ConverterUp",
  description:
    "Compress PNG, JPG, WebP, and AVIF images directly in your browser. Adjust quality, preview results, and download smaller files instantly. No uploads, 100% client-side.",
  alternates: {
    canonical: "https://converterup.com/tools/image-compressor",
  },
  openGraph: {
    title: "Free Image Compressor — Reduce File Size Online",
    description:
      "Compress images directly in your browser. Adjust quality, preview results, and download smaller files instantly. No uploads required.",
    url: "https://converterup.com/tools/image-compressor",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Compressor — Reduce File Size Online",
    description:
      "Compress images directly in your browser. Adjust quality, preview results, and download smaller files instantly.",
  },
};

export default function ImageCompressorPage() {
  return <ImageCompressor />;
}

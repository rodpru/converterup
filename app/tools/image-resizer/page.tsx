import type { Metadata } from "next";
import { ImageResizer } from "./resizer";

export const metadata: Metadata = {
  title: "Free Image Resizer — Resize Images Online | ConverterUp",
  description:
    "Resize PNG, JPG, WebP, GIF, and AVIF images directly in your browser. Lock aspect ratio, use presets, preview results, and download instantly. No uploads, 100% client-side.",
  alternates: {
    canonical: "https://converterup.com/tools/image-resizer",
  },
  openGraph: {
    title: "Free Image Resizer — Resize Images Online",
    description:
      "Resize images directly in your browser. Lock aspect ratio, use presets, preview results, and download instantly. No uploads required.",
    url: "https://converterup.com/tools/image-resizer",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Resizer — Resize Images Online",
    description:
      "Resize images directly in your browser. Lock aspect ratio, use presets, and download instantly.",
  },
};

export default function ImageResizerPage() {
  return <ImageResizer />;
}

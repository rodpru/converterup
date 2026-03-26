import type { Metadata } from "next";
import { ColorPaletteExtractor } from "./extractor";

export const metadata: Metadata = {
  title:
    "Free Color Palette Extractor — Extract Colors from Images | ConverterUp",
  description:
    "Extract dominant colors from any image. Upload PNG, JPG, or WebP files and get a beautiful color palette with HEX, RGB, and HSL values. 100% browser-based.",
  alternates: {
    canonical: "https://converterup.com/tools/color-palette",
  },
  openGraph: {
    title: "Free Color Palette Extractor — Extract Colors from Images",
    description:
      "Extract dominant colors from any image. Get HEX, RGB, and HSL values instantly. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/color-palette",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Color Palette Extractor — Extract Colors from Images",
    description:
      "Extract dominant colors from any image. Get HEX, RGB, and HSL values instantly. Free, fast, and works entirely in your browser.",
  },
};

export default function ColorPalettePage() {
  return <ColorPaletteExtractor />;
}

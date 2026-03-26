import type { Metadata } from "next";
import { FaviconGenerator } from "./generator";

export const metadata: Metadata = {
  title: "Free Favicon Generator — Create Favicons from Images | ConverterUp",
  description:
    "Generate favicons in all standard sizes from any PNG, JPG, WebP, or SVG image. Download individually or as a ZIP. 100% browser-based, free, no sign-up required.",
  alternates: {
    canonical: "https://converterup.com/tools/favicon-generator",
  },
  openGraph: {
    title: "Free Favicon Generator — Create Favicons from Images",
    description:
      "Generate favicons in all standard sizes from any image. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/favicon-generator",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Favicon Generator — Create Favicons from Images",
    description:
      "Generate favicons in all standard sizes from any image. Free, fast, and works entirely in your browser.",
  },
};

export default function FaviconGeneratorPage() {
  return <FaviconGenerator />;
}

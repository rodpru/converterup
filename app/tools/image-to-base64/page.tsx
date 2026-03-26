import type { Metadata } from "next";
import { ImageToBase64Encoder } from "./encoder";

export const metadata: Metadata = {
  title:
    "Free Image to Base64 Encoder — Convert Images to Base64 | ConverterUp",
  description:
    "Convert images (PNG, JPG, WebP, GIF, SVG) to Base64 strings instantly. Copy Base64 or Data URI with one click. Free, fast, and 100% browser-based.",
  alternates: {
    canonical: "https://converterup.com/tools/image-to-base64",
  },
  openGraph: {
    title: "Free Image to Base64 Encoder — Convert Images to Base64",
    description:
      "Convert images to Base64 strings instantly. Copy Base64 or Data URI with one click. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/image-to-base64",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image to Base64 Encoder — Convert Images to Base64",
    description:
      "Convert images to Base64 strings instantly. Copy Base64 or Data URI with one click. Free, fast, and works entirely in your browser.",
  },
};

export default function ImageToBase64Page() {
  return <ImageToBase64Encoder />;
}

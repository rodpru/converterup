import type { Metadata } from "next";
import { Base64Decoder } from "./decoder";
import { RelatedGuides } from "@/components/related-guides";

export const metadata: Metadata = {
  title: "Free Base64 Decoder — Decode Base64 Online | ConverterUp",
  description:
    "Decode Base64 strings to text or images instantly. Supports data URIs and plain Base64. Free, fast, and 100% browser-based.",
  alternates: {
    canonical: "https://converterup.com/tools/base64-decode",
  },
  openGraph: {
    title: "Free Base64 Decoder — Decode Base64 Online",
    description:
      "Decode Base64 strings to text or images instantly. Supports data URIs and plain Base64. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/base64-decode",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Base64 Decoder — Decode Base64 Online",
    description:
      "Decode Base64 strings to text or images instantly. Supports data URIs and plain Base64. Free, fast, and works entirely in your browser.",
  },
};

export default function Base64DecodePage() {
  return (
    <>
      <Base64Decoder />
      <RelatedGuides toolHref="/tools/base64-decode" />
    </>
  );
}

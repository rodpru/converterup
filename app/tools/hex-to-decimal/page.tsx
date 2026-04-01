import type { Metadata } from "next";
import { HexToDecimalConverter } from "./converter";
import { RelatedGuides } from "@/components/related-guides";

export const metadata: Metadata = {
  title: "Free Hex to Decimal Converter — Number Base Converter | ConverterUp",
  description:
    "Convert between hexadecimal, decimal, binary, and octal instantly. Supports color hex codes with RGB conversion. Free, fast, and 100% browser-based.",
  alternates: {
    canonical: "https://converterup.com/tools/hex-to-decimal",
  },
  openGraph: {
    title: "Free Hex to Decimal Converter — Number Base Converter",
    description:
      "Convert between hexadecimal, decimal, binary, and octal instantly. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/hex-to-decimal",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Hex to Decimal Converter — Number Base Converter",
    description:
      "Convert between hexadecimal, decimal, binary, and octal instantly. Free, fast, and works entirely in your browser.",
  },
};

export default function HexToDecimalPage() {
  return (
    <>
      <HexToDecimalConverter />
      <RelatedGuides toolHref="/tools/hex-to-decimal" />
    </>
  );
}

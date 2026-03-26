import type { Metadata } from "next";
import { QRCodeGenerator } from "./generator";

export const metadata: Metadata = {
  title: "Free QR Code Generator — Custom Colors & Sizes | ConverterUp",
  description:
    "Generate custom QR codes with custom colors, sizes, and error correction levels. Download as PNG instantly. Free, fast, and 100% browser-based.",
  alternates: {
    canonical: "https://converterup.com/tools/qr-code-generator",
  },
  openGraph: {
    title: "Free QR Code Generator — Custom Colors & Sizes",
    description:
      "Generate custom QR codes with custom colors, sizes, and error correction levels. Download as PNG instantly.",
    url: "https://converterup.com/tools/qr-code-generator",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator — Custom Colors & Sizes",
    description:
      "Generate custom QR codes with custom colors, sizes, and error correction levels. Download as PNG instantly.",
  },
};

export default function QRCodeGeneratorPage() {
  return <QRCodeGenerator />;
}

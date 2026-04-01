import type { Metadata } from "next";
import { UuidGenerator } from "./generator";
import { RelatedGuides } from "@/components/related-guides";

export const metadata: Metadata = {
  title: "Free UUID Generator — Generate UUIDs Online | ConverterUp",
  description:
    "Generate UUID v4 identifiers instantly. Single or bulk generation with format options. Free, fast, and 100% browser-based.",
  alternates: {
    canonical: "https://converterup.com/tools/uuid-generator",
  },
  openGraph: {
    title: "Free UUID Generator — Generate UUIDs Online",
    description:
      "Generate UUID v4 identifiers instantly. Single or bulk generation with format options. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/uuid-generator",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free UUID Generator — Generate UUIDs Online",
    description:
      "Generate UUID v4 identifiers instantly. Single or bulk generation with format options. Free, fast, and works entirely in your browser.",
  },
};

export default function UuidGeneratorPage() {
  return (
    <>
      <UuidGenerator />
      <RelatedGuides toolHref="/tools/uuid-generator" />
    </>
  );
}

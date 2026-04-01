import type { Metadata } from "next";
import { TextRepeater } from "./repeater";
import { RelatedGuides } from "@/components/related-guides";

export const metadata: Metadata = {
  title: "Free Text Repeater — Repeat Text Online | ConverterUp",
  description:
    "Repeat any text multiple times with custom separators. Free, fast, and 100% browser-based. No sign-up required.",
  alternates: {
    canonical: "https://converterup.com/tools/text-repeater",
  },
  openGraph: {
    title: "Free Text Repeater — Repeat Text Online",
    description:
      "Repeat any text multiple times with custom separators. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/text-repeater",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Text Repeater — Repeat Text Online",
    description:
      "Repeat any text multiple times with custom separators. Free, fast, and works entirely in your browser.",
  },
};

export default function TextRepeaterPage() {
  return (
    <>
      <TextRepeater />
      <RelatedGuides toolHref="/tools/text-repeater" />
    </>
  );
}

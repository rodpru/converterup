import type { Metadata } from "next";
import { CaseConverter } from "./converter";
import { RelatedGuides } from "@/components/related-guides";

export const metadata: Metadata = {
  title: "Free Case Converter — Convert Text Case Online | ConverterUp",
  description:
    "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and more. Free, fast, and 100% browser-based.",
  alternates: {
    canonical: "https://converterup.com/tools/case-converter",
  },
  openGraph: {
    title: "Free Case Converter — Convert Text Case Online",
    description:
      "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and more. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/case-converter",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Case Converter — Convert Text Case Online",
    description:
      "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and more. Free, fast, and works entirely in your browser.",
  },
};

export default function CaseConverterPage() {
  return (
    <>
      <CaseConverter />
      <RelatedGuides toolHref="/tools/case-converter" />
    </>
  );
}

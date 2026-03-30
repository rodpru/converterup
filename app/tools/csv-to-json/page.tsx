import type { Metadata } from "next";
import { CsvToJsonConverter } from "./converter";

export const metadata: Metadata = {
  title: "Free CSV to JSON Converter — Convert CSV Online | ConverterUp",
  description:
    "Convert CSV data to JSON instantly. Supports custom delimiters, quoted fields, and header rows. Free, fast, and 100% browser-based.",
  alternates: {
    canonical: "https://converterup.com/tools/csv-to-json",
  },
  openGraph: {
    title: "Free CSV to JSON Converter — Convert CSV Online",
    description:
      "Convert CSV data to JSON instantly. Supports custom delimiters, quoted fields, and header rows. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/csv-to-json",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free CSV to JSON Converter — Convert CSV Online",
    description:
      "Convert CSV data to JSON instantly. Supports custom delimiters, quoted fields, and header rows. Free, fast, and works entirely in your browser.",
  },
};

export default function CsvToJsonPage() {
  return <CsvToJsonConverter />;
}

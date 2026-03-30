import type { Metadata } from "next";
import { HtmlMinifier } from "./minifier";

export const metadata: Metadata = {
  title: "Free HTML Minifier — Minify HTML Online | ConverterUp",
  description:
    "Minify HTML code instantly. Remove comments, collapse whitespace, and reduce file size. Free, fast, and 100% browser-based.",
  alternates: {
    canonical: "https://converterup.com/tools/html-minifier",
  },
  openGraph: {
    title: "Free HTML Minifier — Minify HTML Online",
    description:
      "Minify HTML code instantly. Remove comments, collapse whitespace, and reduce file size. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/html-minifier",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free HTML Minifier — Minify HTML Online",
    description:
      "Minify HTML code instantly. Remove comments, collapse whitespace, and reduce file size. Free, fast, and works entirely in your browser.",
  },
};

export default function HtmlMinifierPage() {
  return <HtmlMinifier />;
}

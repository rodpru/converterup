import type { Metadata } from "next";
import { CssMinifier } from "./minifier";

export const metadata: Metadata = {
  title: "Free CSS Minifier — Minify CSS Online | ConverterUp",
  description:
    "Minify CSS code instantly. Remove comments, collapse whitespace, and reduce file size. Free, fast, and 100% browser-based.",
  alternates: {
    canonical: "https://converterup.com/tools/css-minifier",
  },
  openGraph: {
    title: "Free CSS Minifier — Minify CSS Online",
    description:
      "Minify CSS code instantly. Remove comments, collapse whitespace, and reduce file size. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/css-minifier",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free CSS Minifier — Minify CSS Online",
    description:
      "Minify CSS code instantly. Remove comments, collapse whitespace, and reduce file size. Free, fast, and works entirely in your browser.",
  },
};

export default function CssMinifierPage() {
  return <CssMinifier />;
}

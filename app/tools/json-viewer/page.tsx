import type { Metadata } from "next";
import { JsonViewer } from "./viewer";

export const metadata: Metadata = {
  title: "Free JSON Viewer & Formatter — Format JSON Online | ConverterUp",
  description:
    "Format, validate, and explore JSON with syntax highlighting. Prettify or minify JSON instantly. Free, fast, and 100% browser-based.",
  alternates: {
    canonical: "https://converterup.com/tools/json-viewer",
  },
  openGraph: {
    title: "Free JSON Viewer & Formatter — Format JSON Online",
    description:
      "Format, validate, and explore JSON with syntax highlighting. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/json-viewer",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JSON Viewer & Formatter — Format JSON Online",
    description:
      "Format, validate, and explore JSON with syntax highlighting. Free, fast, and works entirely in your browser.",
  },
};

export default function JsonViewerPage() {
  return <JsonViewer />;
}

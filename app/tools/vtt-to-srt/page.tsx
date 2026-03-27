import type { Metadata } from "next";
import { VttToSrtConverter } from "./converter";

export const metadata: Metadata = {
  title: "Free VTT to SRT Converter — Convert Subtitles Online | ConverterUp",
  description:
    "Convert WebVTT (.vtt) subtitle files to SRT format instantly. Upload a file or paste VTT content. Free, fast, and 100% browser-based.",
  alternates: {
    canonical: "https://converterup.com/tools/vtt-to-srt",
  },
  openGraph: {
    title: "Free VTT to SRT Converter — Convert Subtitles Online",
    description:
      "Convert WebVTT (.vtt) subtitle files to SRT format instantly. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/vtt-to-srt",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free VTT to SRT Converter — Convert Subtitles Online",
    description:
      "Convert WebVTT (.vtt) subtitle files to SRT format instantly. Free, fast, and works entirely in your browser.",
  },
};

export default function VttToSrtPage() {
  return <VttToSrtConverter />;
}

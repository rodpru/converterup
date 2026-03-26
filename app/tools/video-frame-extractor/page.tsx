import type { Metadata } from "next";
import { VideoFrameExtractor } from "./extractor";

export const metadata: Metadata = {
  title:
    "Free Video Frame Extractor — Capture Screenshots from Videos | ConverterUp",
  description:
    "Extract frames and screenshots from any video file. Supports MP4, WebM, and MOV. Capture, preview, and download frames as PNG or JPG. Free, fast, and 100% browser-based.",
  alternates: {
    canonical: "https://converterup.com/tools/video-frame-extractor",
  },
  openGraph: {
    title: "Free Video Frame Extractor — Capture Screenshots from Videos",
    description:
      "Extract frames and screenshots from any video file. Supports MP4, WebM, and MOV. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/video-frame-extractor",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Video Frame Extractor — Capture Screenshots from Videos",
    description:
      "Extract frames and screenshots from any video file. Supports MP4, WebM, and MOV. Free, fast, and works entirely in your browser.",
  },
};

export default function VideoFrameExtractorPage() {
  return <VideoFrameExtractor />;
}

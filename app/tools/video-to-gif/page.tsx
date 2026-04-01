import type { Metadata } from "next";
import { VideoToGifConverter } from "./converter";
import { RelatedGuides } from "@/components/related-guides";

export const metadata: Metadata = {
  title:
    "Free Video to GIF Converter — Convert MP4 to GIF Online | ConverterUp",
  description:
    "Convert MP4, WebM, MOV, and AVI videos to high-quality GIF animations. Adjust frame rate and size. Free, fast, and 100% browser-based — no uploads required.",
  alternates: {
    canonical: "https://converterup.com/tools/video-to-gif",
  },
  openGraph: {
    title: "Free Video to GIF Converter — Convert MP4 to GIF Online",
    description:
      "Convert videos to high-quality GIF animations right in your browser. No uploads, no servers.",
    url: "https://converterup.com/tools/video-to-gif",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Video to GIF Converter — Convert MP4 to GIF Online",
    description:
      "Convert videos to high-quality GIF animations right in your browser. No uploads, no servers.",
  },
};

export default function VideoToGifPage() {
  return (
    <>
      <VideoToGifConverter />
      <RelatedGuides toolHref="/tools/video-to-gif" />
    </>
  );
}

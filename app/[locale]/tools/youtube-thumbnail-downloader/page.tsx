import type { Metadata } from "next";
import { YouTubeThumbnailDownloader } from "./thumbnail-downloader";
import { RelatedGuides } from "@/components/related-guides";

export const metadata: Metadata = {
  title: "YouTube Thumbnail Downloader - Free HD Thumbnails | ConverterUp",
  description:
    "Download YouTube video thumbnails in all resolutions (HD, SD, HQ, MQ). Free, fast, and 100% browser-based. No sign-up required.",
  alternates: {
    canonical: "https://converterup.com/tools/youtube-thumbnail-downloader",
  },
  openGraph: {
    title: "YouTube Thumbnail Downloader - Free HD Thumbnails",
    description:
      "Download YouTube video thumbnails in all resolutions. Free, fast, and works entirely in your browser.",
    url: "https://converterup.com/tools/youtube-thumbnail-downloader",
    siteName: "ConverterUp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Thumbnail Downloader - Free HD Thumbnails",
    description:
      "Download YouTube video thumbnails in all resolutions. Free, fast, and works entirely in your browser.",
  },
};

export default function YouTubeThumbnailDownloaderPage() {
  return (
    <>
      <YouTubeThumbnailDownloader />
      <RelatedGuides toolHref="/tools/youtube-thumbnail-downloader" />
    </>
  );
}

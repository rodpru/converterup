import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "YouTube Thumbnail Downloader — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
  return generateOgImage({
    title: "YouTube Thumbnail Downloader",
    badge: "Video",
  });
}

import { generateOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Media Converter — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
  return generateOgImage({
    title: "Media Converter",
    badge: "Video",
  });
}

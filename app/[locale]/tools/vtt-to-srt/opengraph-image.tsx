import { generateOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "VTT to SRT Converter — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
  return generateOgImage({
    title: "VTT to SRT Converter",
    badge: "Video",
  });
}

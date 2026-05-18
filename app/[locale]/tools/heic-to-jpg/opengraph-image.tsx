import { generateOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "HEIC to JPG Converter — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
  return generateOgImage({
    title: "HEIC to JPG Converter",
    badge: "Image",
  });
}

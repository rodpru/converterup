import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Color Palette Extractor — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
  return generateOgImage({
    title: "Color Palette Extractor",
    badge: "Image",
  });
}

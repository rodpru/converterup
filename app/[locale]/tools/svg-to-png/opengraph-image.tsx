import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "SVG to PNG Converter — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
  return generateOgImage({
    title: "SVG to PNG Converter",
    badge: "Image",
  });
}

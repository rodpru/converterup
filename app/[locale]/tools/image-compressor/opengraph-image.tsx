import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Image Compressor — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
  return generateOgImage({
    title: "Image Compressor",
    badge: "Image",
  });
}

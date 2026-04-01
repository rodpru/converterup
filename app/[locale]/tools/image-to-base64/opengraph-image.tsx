import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Image to Base64 Encoder — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
  return generateOgImage({
    title: "Image to Base64 Encoder",
    badge: "Image",
  });
}

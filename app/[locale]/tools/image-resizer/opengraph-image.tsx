import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Image Resizer — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
  return generateOgImage({
    title: "Image Resizer",
    badge: "Image",
  });
}

import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "HTML Minifier — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
  return generateOgImage({
    title: "HTML Minifier",
    badge: "Developer",
  });
}

import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "JSON Viewer & Formatter — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
  return generateOgImage({
    title: "JSON Viewer & Formatter",
    badge: "Developer",
  });
}

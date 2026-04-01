import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Case Converter — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
  return generateOgImage({
    title: "Case Converter",
    badge: "Utility",
  });
}

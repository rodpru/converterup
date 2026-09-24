import { conversions, getConversion } from "@/data/conversions";
import { generateOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "ConverterUp file converter";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  const locales = ["en", "pt", "es"];
  return locales.flatMap((locale) =>
    conversions.map((c) => ({ locale, slug: c.slug })),
  );
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const conversion = getConversion(slug);

  return generateOgImage({
    title: conversion
      ? `${conversion.fromFormat} to ${conversion.toFormat}`
      : "ConverterUp",
    badge: conversion?.category.toUpperCase() ?? "CONVERT",
  });
}

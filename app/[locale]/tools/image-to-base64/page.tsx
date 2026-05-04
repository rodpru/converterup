import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { generateAlternates } from "@/lib/seo";
import { ImageToBase64Encoder } from "./encoder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  const alternates = generateAlternates("/tools/image-to-base64", locale);
  const title = t("image-to-base64-title");
  const description = t("image-to-base64-desc");

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: "ConverterUp",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ImageToBase64Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <ToolJsonLd slug="image-to-base64" locale={locale} />
      <ImageToBase64Encoder />
      <ToolSeoContent slug="image-to-base64" locale={locale} />
      <RelatedGuides toolHref="/tools/image-to-base64" locale={locale} />
      <RelatedConversions toolSlug="image-to-base64" locale={locale} />
    </>
  );
}

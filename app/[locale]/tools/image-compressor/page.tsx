import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { ImageCompressor } from "./compressor";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/image-compressor",
    title: t("image-compressor-title"),
    description: t("image-compressor-desc"),
  });
}

export default async function ImageCompressorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="image-compressor" locale={locale} />
      <ImageCompressor />
      <ToolSeoContent slug="image-compressor" locale={locale} />
      <RelatedGuides toolHref="/tools/image-compressor" locale={locale} />
      <RelatedConversions toolSlug="image-compressor" locale={locale} />
    </>
  );
}

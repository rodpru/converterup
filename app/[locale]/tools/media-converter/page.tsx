import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { MediaConverter } from "./converter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/media-converter",
    title: t("media-converter-title"),
    description: t("media-converter-desc"),
  });
}

export default async function MediaConverterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="media-converter" locale={locale} />
      <MediaConverter />
      <ToolSeoContent slug="media-converter" locale={locale} />
      <RelatedGuides toolHref="/tools/media-converter" locale={locale} />
      <RelatedConversions toolSlug="media-converter" locale={locale} />
    </>
  );
}

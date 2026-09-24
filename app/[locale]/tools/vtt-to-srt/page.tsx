import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { VttToSrtConverter } from "./converter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/vtt-to-srt",
    title: t("vtt-to-srt-title"),
    description: t("vtt-to-srt-desc"),
  });
}

export default async function VttToSrtPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="vtt-to-srt" locale={locale} />
      <VttToSrtConverter />
      <ToolSeoContent slug="vtt-to-srt" locale={locale} />
      <RelatedGuides toolHref="/tools/vtt-to-srt" locale={locale} />
      <RelatedConversions toolSlug="vtt-to-srt" locale={locale} />
    </>
  );
}

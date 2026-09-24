import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { TextRepeater } from "./repeater";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/text-repeater",
    title: t("text-repeater-title"),
    description: t("text-repeater-desc"),
  });
}

export default async function TextRepeaterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="text-repeater" locale={locale} />
      <TextRepeater />
      <ToolSeoContent slug="text-repeater" locale={locale} />
      <RelatedGuides toolHref="/tools/text-repeater" locale={locale} />
      <RelatedConversions toolSlug="text-repeater" locale={locale} />
    </>
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { SvgToPngConverter } from "./converter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/svg-to-png",
    title: t("svg-to-png-title"),
    description: t("svg-to-png-desc"),
  });
}

export default async function SvgToPngPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="svg-to-png" locale={locale} />
      <SvgToPngConverter />
      <ToolSeoContent slug="svg-to-png" locale={locale} />
      <RelatedGuides toolHref="/tools/svg-to-png" locale={locale} />
      <RelatedConversions toolSlug="svg-to-png" locale={locale} />
    </>
  );
}

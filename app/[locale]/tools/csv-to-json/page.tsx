import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { CsvToJsonConverter } from "./converter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/csv-to-json",
    title: t("csv-to-json-title"),
    description: t("csv-to-json-desc"),
  });
}

export default async function CsvToJsonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="csv-to-json" locale={locale} />
      <CsvToJsonConverter />
      <ToolSeoContent slug="csv-to-json" locale={locale} />
      <RelatedGuides toolHref="/tools/csv-to-json" locale={locale} />
      <RelatedConversions toolSlug="csv-to-json" locale={locale} />
    </>
  );
}

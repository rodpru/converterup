import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { CaseConverter } from "./converter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/case-converter",
    title: t("case-converter-title"),
    description: t("case-converter-desc"),
  });
}

export default async function CaseConverterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="case-converter" locale={locale} />
      <CaseConverter />
      <ToolSeoContent slug="case-converter" locale={locale} />
      <RelatedGuides toolHref="/tools/case-converter" locale={locale} />
      <RelatedConversions toolSlug="case-converter" locale={locale} />
    </>
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { FaviconGenerator } from "./generator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/favicon-generator",
    title: t("favicon-generator-title"),
    description: t("favicon-generator-desc"),
  });
}

export default async function FaviconGeneratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="favicon-generator" locale={locale} />
      <FaviconGenerator />
      <ToolSeoContent slug="favicon-generator" locale={locale} />
      <RelatedGuides toolHref="/tools/favicon-generator" locale={locale} />
      <RelatedConversions toolSlug="favicon-generator" locale={locale} />
    </>
  );
}

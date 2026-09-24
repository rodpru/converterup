import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { HtmlMinifier } from "./minifier";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/html-minifier",
    title: t("html-minifier-title"),
    description: t("html-minifier-desc"),
  });
}

export default async function HtmlMinifierPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="html-minifier" locale={locale} />
      <HtmlMinifier />
      <ToolSeoContent slug="html-minifier" locale={locale} />
      <RelatedGuides toolHref="/tools/html-minifier" locale={locale} />
      <RelatedConversions toolSlug="html-minifier" locale={locale} />
    </>
  );
}

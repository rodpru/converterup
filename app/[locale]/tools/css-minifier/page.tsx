import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { CssMinifier } from "./minifier";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/css-minifier",
    title: t("css-minifier-title"),
    description: t("css-minifier-desc"),
  });
}

export default async function CssMinifierPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="css-minifier" locale={locale} />
      <CssMinifier />
      <ToolSeoContent slug="css-minifier" locale={locale} />
      <RelatedGuides toolHref="/tools/css-minifier" locale={locale} />
      <RelatedConversions toolSlug="css-minifier" locale={locale} />
    </>
  );
}

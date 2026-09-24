import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { HexToDecimalConverter } from "./converter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/hex-to-decimal",
    title: t("hex-to-decimal-title"),
    description: t("hex-to-decimal-desc"),
  });
}

export default async function HexToDecimalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="hex-to-decimal" locale={locale} />
      <HexToDecimalConverter />
      <ToolSeoContent slug="hex-to-decimal" locale={locale} />
      <RelatedGuides toolHref="/tools/hex-to-decimal" locale={locale} />
      <RelatedConversions toolSlug="hex-to-decimal" locale={locale} />
    </>
  );
}

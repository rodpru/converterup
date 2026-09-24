import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { Base64Decoder } from "./decoder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/base64-decode",
    title: t("base64-decode-title"),
    description: t("base64-decode-desc"),
  });
}

export default async function Base64DecodePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="base64-decode" locale={locale} />
      <Base64Decoder />
      <ToolSeoContent slug="base64-decode" locale={locale} />
      <RelatedGuides toolHref="/tools/base64-decode" locale={locale} />
      <RelatedConversions toolSlug="base64-decode" locale={locale} />
    </>
  );
}

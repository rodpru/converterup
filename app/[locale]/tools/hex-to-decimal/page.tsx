import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { generateAlternates } from "@/lib/seo";
import { HexToDecimalConverter } from "./converter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  const alternates = generateAlternates("/tools/hex-to-decimal", locale);
  const title = t("hex-to-decimal-title");
  const description = t("hex-to-decimal-desc");

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: "ConverterUp",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function HexToDecimalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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

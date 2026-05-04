import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { generateAlternates } from "@/lib/seo";
import { CaseConverter } from "./converter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  const alternates = generateAlternates("/tools/case-converter", locale);
  const title = t("case-converter-title");
  const description = t("case-converter-desc");

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

export default async function CaseConverterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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

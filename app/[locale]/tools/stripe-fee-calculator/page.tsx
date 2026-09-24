import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { StripeFeeCalculator } from "./calculator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/stripe-fee-calculator",
    title: t("stripe-fee-calculator-title"),
    description: t("stripe-fee-calculator-desc"),
  });
}

export default async function StripeFeeCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="stripe-fee-calculator" locale={locale} />
      <StripeFeeCalculator />
      <ToolSeoContent slug="stripe-fee-calculator" locale={locale} />
      <RelatedGuides toolHref="/tools/stripe-fee-calculator" locale={locale} />
      <RelatedConversions toolSlug="stripe-fee-calculator" locale={locale} />
    </>
  );
}

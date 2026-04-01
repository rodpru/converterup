import type { Metadata } from "next";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { generateAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { StripeFeeCalculator } from "./calculator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  const alternates = generateAlternates("/tools/stripe-fee-calculator", locale);
  const title = t("stripe-fee-calculator-title");
  const description = t("stripe-fee-calculator-desc");

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

export default function StripeFeeCalculatorPage() {
  return (
    <>
      <ToolJsonLd slug="stripe-fee-calculator" />
      <StripeFeeCalculator />
      <RelatedGuides toolHref="/tools/stripe-fee-calculator" />
    </>
  );
}

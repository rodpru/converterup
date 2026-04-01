import type { Metadata } from "next";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { generateAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
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

export default function CaseConverterPage() {
  return (
    <>
      <ToolJsonLd slug="case-converter" />
      <CaseConverter />
      <RelatedGuides toolHref="/tools/case-converter" />
    </>
  );
}

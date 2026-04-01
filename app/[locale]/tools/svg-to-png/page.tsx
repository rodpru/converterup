import type { Metadata } from "next";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { generateAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { SvgToPngConverter } from "./converter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  const alternates = generateAlternates("/tools/svg-to-png", locale);
  const title = t("svg-to-png-title");
  const description = t("svg-to-png-desc");

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

export default function SvgToPngPage() {
  return (
    <>
      <ToolJsonLd slug="svg-to-png" />
      <SvgToPngConverter />
      <RelatedGuides toolHref="/tools/svg-to-png" />
    </>
  );
}

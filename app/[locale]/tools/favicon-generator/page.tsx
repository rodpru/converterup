import type { Metadata } from "next";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { generateAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { FaviconGenerator } from "./generator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  const alternates = generateAlternates("/tools/favicon-generator", locale);
  const title = t("favicon-generator-title");
  const description = t("favicon-generator-desc");

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

export default function FaviconGeneratorPage() {
  return (
    <>
      <ToolJsonLd slug="favicon-generator" />
      <FaviconGenerator />
      <RelatedGuides toolHref="/tools/favicon-generator" />
    </>
  );
}

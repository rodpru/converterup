import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { UuidGenerator } from "./generator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/uuid-generator",
    title: t("uuid-generator-title"),
    description: t("uuid-generator-desc"),
  });
}

export default async function UuidGeneratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="uuid-generator" locale={locale} />
      <UuidGenerator />
      <ToolSeoContent slug="uuid-generator" locale={locale} />
      <RelatedGuides toolHref="/tools/uuid-generator" locale={locale} />
      <RelatedConversions toolSlug="uuid-generator" locale={locale} />
    </>
  );
}

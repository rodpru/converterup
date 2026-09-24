import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { HeicToPdfConverter } from "./converter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/heic-to-pdf",
    title: t("heic-to-pdf-title"),
    description: t("heic-to-pdf-desc"),
  });
}

export default async function HeicToPdfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="heic-to-pdf" locale={locale} />
      <HeicToPdfConverter />
      <ToolSeoContent slug="heic-to-pdf" locale={locale} />
      <RelatedGuides toolHref="/tools/heic-to-pdf" locale={locale} />
      <RelatedConversions toolSlug="heic-to-pdf" locale={locale} />
    </>
  );
}

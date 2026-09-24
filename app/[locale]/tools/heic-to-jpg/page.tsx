import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { HeicToJpgConverter } from "./converter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/heic-to-jpg",
    title: t("heic-to-jpg-title"),
    description: t("heic-to-jpg-desc"),
  });
}

export default async function HeicToJpgPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="heic-to-jpg" locale={locale} />
      <HeicToJpgConverter />
      <ToolSeoContent slug="heic-to-jpg" locale={locale} />
      <RelatedGuides toolHref="/tools/heic-to-jpg" locale={locale} />
      <RelatedConversions toolSlug="heic-to-jpg" locale={locale} />
    </>
  );
}

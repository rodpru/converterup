import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { VideoToGifConverter } from "./converter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/video-to-gif",
    title: t("video-to-gif-title"),
    description: t("video-to-gif-desc"),
  });
}

export default async function VideoToGifPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="video-to-gif" locale={locale} />
      <VideoToGifConverter />
      <ToolSeoContent slug="video-to-gif" locale={locale} />
      <RelatedGuides toolHref="/tools/video-to-gif" locale={locale} />
      <RelatedConversions toolSlug="video-to-gif" locale={locale} />
    </>
  );
}

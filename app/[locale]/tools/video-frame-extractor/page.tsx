import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { VideoFrameExtractor } from "./extractor";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/video-frame-extractor",
    title: t("video-frame-extractor-title"),
    description: t("video-frame-extractor-desc"),
  });
}

export default async function VideoFrameExtractorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="video-frame-extractor" locale={locale} />
      <VideoFrameExtractor />
      <ToolSeoContent slug="video-frame-extractor" locale={locale} />
      <RelatedGuides toolHref="/tools/video-frame-extractor" locale={locale} />
      <RelatedConversions toolSlug="video-frame-extractor" locale={locale} />
    </>
  );
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { generateAlternates } from "@/lib/seo";
import { VideoFrameExtractor } from "./extractor";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  const alternates = generateAlternates("/tools/video-frame-extractor", locale);
  const title = t("video-frame-extractor-title");
  const description = t("video-frame-extractor-desc");

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

export default async function VideoFrameExtractorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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

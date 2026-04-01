import type { Metadata } from "next";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { generateAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
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

export default function VideoFrameExtractorPage() {
  return (
    <>
      <ToolJsonLd slug="video-frame-extractor" />
      <VideoFrameExtractor />
      <RelatedGuides toolHref="/tools/video-frame-extractor" />
    </>
  );
}

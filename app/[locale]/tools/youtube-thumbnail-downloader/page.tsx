import type { Metadata } from "next";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { generateAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { YouTubeThumbnailDownloader } from "./thumbnail-downloader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  const alternates = generateAlternates(
    "/tools/youtube-thumbnail-downloader",
    locale,
  );
  const title = t("youtube-thumbnail-downloader-title");
  const description = t("youtube-thumbnail-downloader-desc");

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

export default function YouTubeThumbnailDownloaderPage() {
  return (
    <>
      <ToolJsonLd slug="youtube-thumbnail-downloader" />
      <YouTubeThumbnailDownloader />
      <RelatedGuides toolHref="/tools/youtube-thumbnail-downloader" />
    </>
  );
}

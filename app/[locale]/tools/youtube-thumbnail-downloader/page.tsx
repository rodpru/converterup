import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { YouTubeThumbnailDownloader } from "./thumbnail-downloader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/youtube-thumbnail-downloader",
    title: t("youtube-thumbnail-downloader-title"),
    description: t("youtube-thumbnail-downloader-desc"),
  });
}

export default async function YouTubeThumbnailDownloaderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="youtube-thumbnail-downloader" locale={locale} />
      <YouTubeThumbnailDownloader />
      <ToolSeoContent slug="youtube-thumbnail-downloader" locale={locale} />
      <RelatedGuides
        toolHref="/tools/youtube-thumbnail-downloader"
        locale={locale}
      />
      <RelatedConversions
        toolSlug="youtube-thumbnail-downloader"
        locale={locale}
      />
    </>
  );
}

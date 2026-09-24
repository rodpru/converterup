import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { ExifViewer } from "./viewer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/exif-viewer",
    title: t("exif-viewer-title"),
    description: t("exif-viewer-desc"),
  });
}

export default async function ExifViewerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="exif-viewer" locale={locale} />
      <ExifViewer />
      <ToolSeoContent slug="exif-viewer" locale={locale} />
      <RelatedGuides toolHref="/tools/exif-viewer" locale={locale} />
      <RelatedConversions toolSlug="exif-viewer" locale={locale} />
    </>
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { ImageResizer } from "./resizer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/image-resizer",
    title: t("image-resizer-title"),
    description: t("image-resizer-desc"),
  });
}

export default async function ImageResizerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="image-resizer" locale={locale} />
      <ImageResizer />
      <ToolSeoContent slug="image-resizer" locale={locale} />
      <RelatedGuides toolHref="/tools/image-resizer" locale={locale} />
      <RelatedConversions toolSlug="image-resizer" locale={locale} />
    </>
  );
}

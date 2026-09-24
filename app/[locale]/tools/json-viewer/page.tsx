import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { JsonViewer } from "./viewer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/json-viewer",
    title: t("json-viewer-title"),
    description: t("json-viewer-desc"),
  });
}

export default async function JsonViewerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="json-viewer" locale={locale} />
      <JsonViewer />
      <ToolSeoContent slug="json-viewer" locale={locale} />
      <RelatedGuides toolHref="/tools/json-viewer" locale={locale} />
      <RelatedConversions toolSlug="json-viewer" locale={locale} />
    </>
  );
}

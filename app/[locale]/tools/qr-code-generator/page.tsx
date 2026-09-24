import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RelatedConversions } from "@/components/related-conversions";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolSeoContent } from "@/components/tool-seo-content";
import { pageMetadata } from "@/lib/seo";
import { QRCodeGenerator } from "./generator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    locale,
    path: "/tools/qr-code-generator",
    title: t("qr-code-generator-title"),
    description: t("qr-code-generator-desc"),
  });
}

export default async function QRCodeGeneratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ToolJsonLd slug="qr-code-generator" locale={locale} />
      <QRCodeGenerator />
      <ToolSeoContent slug="qr-code-generator" locale={locale} />
      <RelatedGuides toolHref="/tools/qr-code-generator" locale={locale} />
      <RelatedConversions toolSlug="qr-code-generator" locale={locale} />
    </>
  );
}

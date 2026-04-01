import type { Metadata } from "next";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { generateAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { VttToSrtConverter } from "./converter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  const alternates = generateAlternates("/tools/vtt-to-srt", locale);
  const title = t("vtt-to-srt-title");
  const description = t("vtt-to-srt-desc");

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

export default function VttToSrtPage() {
  return (
    <>
      <ToolJsonLd slug="vtt-to-srt" />
      <VttToSrtConverter />
      <RelatedGuides toolHref="/tools/vtt-to-srt" />
    </>
  );
}

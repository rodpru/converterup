import type { Metadata } from "next";
import { RelatedGuides } from "@/components/related-guides";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { generateAlternates } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { ImageToBase64Encoder } from "./encoder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  const alternates = generateAlternates("/tools/image-to-base64", locale);
  const title = t("image-to-base64-title");
  const description = t("image-to-base64-desc");

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

export default function ImageToBase64Page() {
  return (
    <>
      <ToolJsonLd slug="image-to-base64" />
      <ImageToBase64Encoder />
      <RelatedGuides toolHref="/tools/image-to-base64" />
    </>
  );
}

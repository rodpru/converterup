import { getArticleBySlug, getArticleSlugs } from "@/lib/blog";
import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "ConverterUp Blog";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  return generateOgImage({
    title: article?.title ?? "ConverterUp Blog",
    badge: `${article?.category?.toUpperCase() ?? "BLOG"} · ${article?.lang?.toUpperCase() ?? "EN"}`,
  });
}

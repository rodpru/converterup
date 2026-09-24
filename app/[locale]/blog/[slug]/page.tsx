import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArticlePageContent } from "@/components/blog/article-page-content";
import { JsonLd } from "@/components/json-ld";
import { RelatedConversions } from "@/components/related-conversions";
import { extractFaqItems, getAllArticles, getArticleBySlug } from "@/lib/blog";
import { AUTHOR, BASE_URL, localizedUrl, pageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    locale: article.lang,
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || article.lang !== locale) return {};

  return pageMetadata({
    locale,
    path: `/blog/${article.slug}`,
    title: article.title,
    description: article.description,
    type: "article",
    hreflang: false,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  // Slugs are language-specific — an article only lives under its own locale.
  if (article.lang !== locale) {
    permanentRedirect(localizedUrl(`/blog/${article.slug}`, article.lang));
  }
  setRequestLocale(locale);

  const faqItems = extractFaqItems(article);
  const url = localizedUrl(`/blog/${article.slug}`, locale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt ?? article.publishedAt,
          author: AUTHOR,
          publisher: {
            "@type": "Organization",
            name: "ConverterUp",
            url: BASE_URL,
            logo: `${BASE_URL}/icon-512x512.png`,
          },
          image: `${url}/opengraph-image`,
          mainEntityOfPage: url,
          inLanguage: article.lang,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: BASE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: localizedUrl("/blog", locale),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: article.title,
              item: url,
            },
          ],
        }}
      />
      {faqItems.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }}
        />
      )}
      <ArticlePageContent slug={slug} locale={locale} />
      {article.toolHref.startsWith("/tools/") && (
        <RelatedConversions
          toolSlug={article.toolHref.replace("/tools/", "")}
          locale={locale}
          limit={4}
        />
      )}
    </>
  );
}

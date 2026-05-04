import articlesData from "@/data/articles.json";
import type { Article, ArticleLang, FaqBlock } from "./blog-types";

const articles: Article[] = articlesData as Article[];

export function getAllArticles(lang?: ArticleLang): Article[] {
  const filtered = lang ? articles.filter((a) => a.lang === lang) : articles;
  return filtered.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticleSlugs(): string[] {
  return articles.map((a) => a.slug);
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  return articles
    .filter((a) => a.slug !== slug && a.lang === current.lang)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? -1 : 1;
      const bMatch = b.category === current.category ? -1 : 1;
      return aMatch - bMatch;
    })
    .slice(0, limit);
}

export function extractFaqItems(
  article: Article,
): Array<{ question: string; answer: string }> {
  const faqBlock = article.body.find((b) => b.type === "faq") as
    | FaqBlock
    | undefined;
  return faqBlock?.items ?? [];
}

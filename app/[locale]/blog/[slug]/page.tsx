import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
	getArticleBySlug,
	getArticleSlugs,
	extractFaqItems,
} from "@/lib/blog";
import { JsonLd } from "@/components/json-ld";
import { ArticlePageContent } from "@/components/blog/article-page-content";

interface Props {
	params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
	return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	const article = getArticleBySlug(slug);
	if (!article) return {};

	const localePrefix = locale === "en" ? "" : `/${locale}`;
	const url = `https://converterup.com${localePrefix}/blog/${article.slug}`;

	return {
		title: article.title,
		description: article.description,
		alternates: { canonical: url },
		openGraph: {
			title: article.title,
			description: article.description,
			url,
			siteName: "ConverterUp",
			type: "article",
		},
		twitter: {
			card: "summary_large_image",
			title: article.title,
			description: article.description,
		},
	};
}

export default async function ArticlePage({ params }: Props) {
	const { locale, slug } = await params;
	const article = getArticleBySlug(slug);
	if (!article) notFound();

	const faqItems = extractFaqItems(article);
	const localePrefix = locale === "en" ? "" : `/${locale}`;
	const url = `https://converterup.com${localePrefix}/blog/${article.slug}`;

	return (
		<>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "Article",
					headline: article.title,
					description: article.description,
					datePublished: article.publishedAt,
					author: { "@type": "Organization", name: "ConverterUp" },
					publisher: {
						"@type": "Organization",
						name: "ConverterUp",
						url: "https://converterup.com",
					},
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
							item: "https://converterup.com",
						},
						{
							"@type": "ListItem",
							position: 2,
							name: "Blog",
							item: "https://converterup.com/blog",
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
			<ArticlePageContent slug={slug} />
		</>
	);
}

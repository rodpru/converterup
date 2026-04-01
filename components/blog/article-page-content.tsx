"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { getArticleBySlug, getRelatedArticles } from "@/lib/blog";
import { ArticleRenderer } from "./article-renderer";

const CATEGORY_LABELS: Record<string, string> = {
	image: "Image",
	video: "Video",
	developer: "Developer",
	utility: "Utility",
};

function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

export function ArticlePageContent({ slug, locale }: { slug: string; locale: string }) {
	const article = getArticleBySlug(slug);
	if (!article) return null;

	const related = getRelatedArticles(slug);
	const prefix = locale === "en" ? "" : `/${locale}`;

	return (
		<motion.article
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24"
		>
			<div className="max-w-3xl mx-auto">
				{/* Breadcrumb */}
				<nav className="flex items-center gap-1.5 text-sm font-[Inter] text-[#71717A] mb-8 pt-8">
					<Link href={`${prefix}/`} className="hover:text-[#EDEDEF] transition-colors">
						Home
					</Link>
					<ChevronRight className="w-3.5 h-3.5" />
					<Link
						href={`${prefix}/blog`}
						className="hover:text-[#EDEDEF] transition-colors"
					>
						Blog
					</Link>
					<ChevronRight className="w-3.5 h-3.5" />
					<span className="text-[#EDEDEF]">{article.title}</span>
				</nav>

				{/* Header */}
				<header className="mb-12">
					<div className="flex items-center gap-3 mb-4">
						<span className="font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF]">
							{CATEGORY_LABELS[article.category] ?? article.category}
						</span>
						<span className="text-[#71717A]">/</span>
						<time
							dateTime={article.publishedAt}
							className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]"
						>
							{formatDate(article.publishedAt)}
						</time>
					</div>
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-[Syne] font-bold text-[#EDEDEF] leading-tight mb-4">
						{article.title}
					</h1>
					<p className="text-lg text-[#71717A] font-[Inter] leading-relaxed">
						{article.description}
					</p>
				</header>

				{/* Article Body */}
				<ArticleRenderer blocks={article.body} />

				{/* Related Articles */}
				{related.length > 0 && (
					<section className="mt-16">
						<h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-6">
							Related Articles
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
							{related.map((post) => (
								<Link
									key={post.slug}
									href={`${prefix}/blog/${post.slug}`}
									className="group bg-[#16131E] border border-[#2A2535] rounded-xl p-5 hover:border-[#2DD4BF]/20 transition-colors"
								>
									<span className="font-mono text-[10px] uppercase tracking-wider text-[#2DD4BF]">
										{CATEGORY_LABELS[post.category] ?? post.category}
									</span>
									<h3 className="text-sm font-[Syne] font-semibold text-[#EDEDEF] mt-2 group-hover:text-[#2DD4BF] transition-colors">
										{post.title}
									</h3>
								</Link>
							))}
						</div>
					</section>
				)}
			</div>
		</motion.article>
	);
}

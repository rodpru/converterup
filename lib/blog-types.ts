export interface ParagraphBlock {
	type: "paragraph";
	text: string;
}

export interface HeadingBlock {
	type: "heading";
	level: 2 | 3;
	text: string;
}

export interface ListBlock {
	type: "list";
	ordered: boolean;
	items: string[];
}

export interface TableBlock {
	type: "table";
	headers: string[];
	rows: string[][];
}

export interface CodeBlock {
	type: "code";
	content: string;
	language?: string;
}

export interface CtaBlock {
	type: "cta";
	title: string;
	description: string;
	buttonText: string;
	href: string;
}

export interface FaqBlock {
	type: "faq";
	items: Array<{ question: string; answer: string }>;
}

export interface QuoteBlock {
	type: "quote";
	text: string;
	attribution?: string;
}

export interface CalloutBlock {
	type: "callout";
	icon: string;
	title: string;
	text: string;
}

export type ContentBlock =
	| ParagraphBlock
	| HeadingBlock
	| ListBlock
	| TableBlock
	| CodeBlock
	| CtaBlock
	| FaqBlock
	| QuoteBlock
	| CalloutBlock;

export type ArticleLang = "en" | "pt" | "es";

export type ArticleCategory = "image" | "video" | "developer" | "utility";

export interface Article {
	articleId: string;
	slug: string;
	title: string;
	description: string;
	keyword: string;
	toolHref: string;
	toolName: string;
	category: ArticleCategory;
	publishedAt: string;
	lang: ArticleLang;
	body: ContentBlock[];
}

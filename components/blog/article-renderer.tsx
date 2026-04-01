"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ContentBlock } from "@/lib/blog-types";

function RichText({ html }: { html: string }) {
	return (
		<span
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}

function renderBlock(block: ContentBlock, index: number) {
	switch (block.type) {
		case "paragraph":
			return (
				<p key={index}>
					<RichText html={block.text} />
				</p>
			);

		case "heading":
			if (block.level === 2) {
				return (
					<h2
						key={index}
						className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4"
					>
						{block.text}
					</h2>
				);
			}
			return (
				<h3
					key={index}
					className="text-xl font-[Syne] font-semibold text-[#EDEDEF] mt-8 mb-3"
				>
					{block.text}
				</h3>
			);

		case "list":
			if (block.ordered) {
				return (
					<ol key={index} className="list-decimal pl-6 space-y-3">
						{block.items.map((item, i) => (
							<li key={i}>
								<RichText html={item} />
							</li>
						))}
					</ol>
				);
			}
			return (
				<ul key={index} className="list-disc pl-6 space-y-2">
					{block.items.map((item, i) => (
						<li key={i}>
							<RichText html={item} />
						</li>
					))}
				</ul>
			);

		case "table":
			return (
				<div key={index} className="overflow-x-auto my-6">
					<table className="w-full text-sm border border-[#2A2535] rounded-xl overflow-hidden">
						<thead>
							<tr className="bg-[#16131E]">
								{block.headers.map((header, i) => (
									<th
										key={i}
										className="text-left p-3 text-[#EDEDEF] font-[Syne] font-semibold"
									>
										{header}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="divide-y divide-[#2A2535]">
							{block.rows.map((row, i) => (
								<tr key={i}>
									{row.map((cell, j) => (
										<td
											key={j}
											className={
												j === 0
													? "p-3 font-mono text-[#2DD4BF]"
													: "p-3"
											}
										>
											<RichText html={cell} />
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			);

		case "code":
			return (
				<div
					key={index}
					className="bg-[#16131E] border border-[#2A2535] rounded-lg p-4 font-mono text-sm overflow-x-auto"
				>
					<pre className="text-[#C4C4C6] whitespace-pre-wrap">
						{block.content}
					</pre>
				</div>
			);

		case "cta":
			return (
				<div key={index} className="my-12 relative rounded-xl overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF]/20 to-[#7C3AED]/20 rounded-xl" />
					<div className="relative bg-[#16131E] m-[1px] rounded-xl p-6 sm:p-8">
						<h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
							{block.title}
						</h3>
						<p className="text-[#71717A] font-[Inter] text-sm mb-4">
							{block.description}
						</p>
						<Link
							href={block.href}
							className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-[Inter] font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-[#5EEAD4] transition-colors"
						>
							{block.buttonText}
							<ArrowRight className="w-4 h-4" />
						</Link>
					</div>
				</div>
			);

		case "faq":
			return (
				<section key={index} className="mt-16">
					<h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-8">
						Frequently Asked Questions
					</h2>
					<div className="space-y-6">
						{block.items.map((item, i) => (
							<div
								key={i}
								className="border border-[#2A2535] rounded-xl p-6"
							>
								<h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
									{item.question}
								</h3>
								<p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
									{item.answer}
								</p>
							</div>
						))}
					</div>
				</section>
			);

		case "quote":
			return (
				<blockquote
					key={index}
					className="border-l-2 border-[#2DD4BF] pl-4 italic text-[#71717A]"
				>
					<p>{block.text}</p>
					{block.attribution && (
						<cite className="text-sm text-[#71717A] not-italic mt-2 block">
							— {block.attribution}
						</cite>
					)}
				</blockquote>
			);

		case "callout":
			return (
				<div
					key={index}
					className="bg-[#16131E] border border-[#2A2535] rounded-xl p-6"
				>
					<p className="font-[Syne] font-semibold text-[#EDEDEF] mb-1">
						{block.icon} {block.title}
					</p>
					<p className="text-sm text-[#71717A] font-[Inter]">{block.text}</p>
				</div>
			);

		default:
			return null;
	}
}

export function ArticleRenderer({ blocks }: { blocks: ContentBlock[] }) {
	return (
		<div className="article-body prose prose-invert max-w-none font-[Inter] text-[#B4B4B4] leading-relaxed space-y-6">
			{blocks.map((block, index) => renderBlock(block, index))}
		</div>
	);
}

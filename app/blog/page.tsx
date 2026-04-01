import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/blog";
import { ArrowRight } from "lucide-react";

const LANG_LABELS: Record<string, string> = {
	en: "EN",
	pt: "PT",
	es: "ES",
};

export const metadata: Metadata = {
  title: "Blog | ConverterUp",
  description:
    "Guides, tutorials, and tips for image optimization, video conversion, and web development tools.",
  alternates: {
    canonical: "https://converterup.com/blog",
  },
  openGraph: {
    title: "Blog | ConverterUp",
    description:
      "Guides, tutorials, and tips for image optimization, video conversion, and web development tools.",
    url: "https://converterup.com/blog",
    siteName: "ConverterUp",
    type: "website",
  },
};

export default function BlogIndex() {
  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-20 sm:pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-primary mb-4">
            Blog
          </span>
          <h1 className="text-3xl sm:text-5xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
            Guides & <span className="gradient-text">Tutorials</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Learn how to optimize images, convert videos, and make the most of
            our free online tools.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
          {getAllArticles().map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[#16131E] border border-[#2A2535] rounded-xl p-6 hover:border-[#2DD4BF]/20 transition-colors duration-200 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block font-mono text-[10px] uppercase tracking-wider text-[#2DD4BF]">
                    {post.category}
                  </span>
                  <span className="inline-block font-mono text-[10px] uppercase tracking-wider text-[#71717A] border border-[#2A2535] rounded px-1.5 py-0.5">
                    {LANG_LABELS[post.lang] ?? post.lang.toUpperCase()}
                  </span>
                </div>
                <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF] mb-2 group-hover:text-[#2DD4BF] transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  {post.description}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#71717A] group-hover:text-[#2DD4BF] transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

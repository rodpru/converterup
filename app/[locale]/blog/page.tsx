import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { getAllArticles } from "@/lib/blog";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const title = `${t("badge")} | ConverterUp`;
  const description = t("desc");
  const canonical =
    locale === routing.defaultLocale
      ? "https://converterup.com/blog"
      : `https://converterup.com/${locale}/blog`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "ConverterUp",
      type: "website",
      locale,
    },
  };
}

export default async function BlogIndex({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const articles = getAllArticles().filter(post => post.lang === locale);

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-20 sm:pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-primary mb-4">
            {t("badge")}
          </span>
          <h1 className="text-3xl sm:text-5xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
            {t("title")} <span className="gradient-text">{t("titleGradient")}</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            {t("desc")}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
          {articles.map((post) => (
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
          
          {articles.length === 0 && (
            <div className="text-center py-12 text-[#71717A]">
              {t("noArticles")}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

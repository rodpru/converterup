import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllArticles } from "@/lib/blog";

export async function RelatedGuides({
  toolHref,
  locale,
}: {
  toolHref: string;
  locale: string;
}) {
  const articles = getAllArticles().filter(
    (a) => a.toolHref === toolHref && a.lang === locale,
  );

  if (articles.length === 0) return null;

  const t = await getTranslations({ locale, namespace: "Internal" });

  return (
    <section className="border-t border-[#2A2535] mt-12 pt-10 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="font-[Syne] text-xl font-bold text-[#EDEDEF] mb-6">
          {t("relatedGuides")}
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex items-center justify-between gap-4 bg-[#16131E] border border-[#2A2535] rounded-xl p-5 hover:border-[#2DD4BF]/20 transition-colors duration-200"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#2DD4BF]">
                    {article.category}
                  </span>
                </div>
                <p className="text-sm font-medium text-[#EDEDEF] group-hover:text-[#2DD4BF] transition-colors truncate">
                  {article.title}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#71717A] group-hover:text-[#2DD4BF] transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

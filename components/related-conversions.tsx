import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { conversions } from "@/data/conversions";
import { Link } from "@/i18n/routing";

export async function RelatedConversions({
  toolSlug,
  locale,
  limit = 6,
}: {
  toolSlug: string;
  locale: string;
  limit?: number;
}) {
  const matches = conversions.filter((c) => c.toolSlug === toolSlug);
  if (matches.length === 0) return null;

  const t = await getTranslations({ locale, namespace: "Internal" });
  const items = matches.slice(0, limit);

  return (
    <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 border-t border-[#2A2535]/50 pt-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF] mb-4">
          {t("popularConversions")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map((c) => (
            <Link
              key={c.slug}
              href={`/convert/${c.slug}`}
              className="flex items-center justify-between gap-2 p-3 rounded-lg border border-[#2A2535] bg-[#16131E] hover:border-[#2DD4BF]/30 transition-colors"
            >
              <span className="text-sm font-[Inter] text-[#EDEDEF]">
                {c.fromFormat} → {c.toFormat}
              </span>
              <ArrowRight className="w-4 h-4 text-[#71717A]" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

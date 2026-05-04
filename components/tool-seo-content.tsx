import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/json-ld";

export async function ToolSeoContent({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  let t: Awaited<ReturnType<typeof getTranslations>>;
  try {
    t = await getTranslations({ locale, namespace: `ToolSeo.${slug}` });
  } catch {
    return null;
  }

  let intro: string;
  let faqHeading: string;
  const faqs: { q: string; a: string }[] = [];

  try {
    intro = t("intro");
    faqHeading = t("faqHeading");
    for (const i of [1, 2, 3, 4] as const) {
      faqs.push({ q: t(`q${i}`), a: t(`a${i}`) });
    }
  } catch {
    return null;
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />

      <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#A1A1AA] font-[Inter] text-base leading-relaxed">
            {intro}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-[Syne] font-bold text-[#EDEDEF] mb-8">
            {faqHeading}
          </h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="border-l-2 border-[#2DD4BF]/40 pl-5 sm:pl-6"
              >
                <h3 className="text-base sm:text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  {f.q}
                </h3>
                <p className="text-[#A1A1AA] font-[Inter] text-sm sm:text-base leading-relaxed">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

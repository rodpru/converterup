import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/json-ld";

const MAX_SECTIONS = 5;
const MAX_FAQS = 8;

function tryGet(
  t: Awaited<ReturnType<typeof getTranslations>>,
  key: string,
): string | null {
  try {
    const v = t(key);
    return v && v !== key ? v : null;
  } catch {
    return null;
  }
}

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

  const intro = tryGet(t, "intro");
  const faqHeading = tryGet(t, "faqHeading");
  if (!intro || !faqHeading) return null;

  const sections: { heading: string; body: string[] }[] = [];
  for (let i = 1; i <= MAX_SECTIONS; i++) {
    const heading = tryGet(t, `section${i}.heading`);
    if (!heading) break;
    const body: string[] = [];
    for (let j = 1; j <= 5; j++) {
      const para = tryGet(t, `section${i}.p${j}`);
      if (!para) break;
      body.push(para);
    }
    if (body.length > 0) sections.push({ heading, body });
  }

  const faqs: { q: string; a: string }[] = [];
  for (let i = 1; i <= MAX_FAQS; i++) {
    const q = tryGet(t, `q${i}`);
    const a = tryGet(t, `a${i}`);
    if (!q || !a) break;
    faqs.push({ q, a });
  }
  if (faqs.length === 0) return null;

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

      <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#A1A1AA] font-[Inter] text-base leading-relaxed">
            {intro}
          </p>
        </div>
      </section>

      {sections.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="max-w-3xl mx-auto space-y-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-xl sm:text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
                  {s.heading}
                </h2>
                <div className="space-y-4">
                  {s.body.map((para) => (
                    <p
                      key={para.slice(0, 60)}
                      className="text-[#A1A1AA] font-[Inter] text-base leading-relaxed"
                      // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted translation content with inline tags
                      dangerouslySetInnerHTML={{ __html: para }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

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

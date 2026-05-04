import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/json-ld";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import {
  conversions,
  getConversion,
  getRelatedConversions,
} from "@/data/conversions";
import { Link } from "@/i18n/routing";
import { generateAlternates } from "@/lib/seo";
import { ArrowRight, Check } from "lucide-react";

export function generateStaticParams() {
  return conversions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const conversion = getConversion(slug);
  if (!conversion) return {};

  const t = await getTranslations({ locale, namespace: "Convert" });
  const title = t("metaTitle", {
    from: conversion.fromFormat,
    to: conversion.toFormat,
  });
  const description = t("metaDescription", {
    from: conversion.fromFormat,
    to: conversion.toFormat,
  });

  const alternates = generateAlternates(`/convert/${slug}`, locale);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: "ConverterUp",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ConvertPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const conversion = getConversion(slug);
  if (!conversion) notFound();

  const t = await getTranslations({ locale, namespace: "Convert" });
  const tn = await getTranslations({ locale, namespace: "Navigation" });
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const baseUrl = "https://converterup.com";

  const args = {
    from: conversion.fromFormat,
    to: conversion.toFormat,
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t("h1", args),
    description: t("intro", args),
    totalTime: "PT30S",
    tool: {
      "@type": "HowToTool",
      name: `ConverterUp ${conversion.fromFormat} to ${conversion.toFormat}`,
    },
    step: [1, 2, 3].map((i) => ({
      "@type": "HowToStep",
      position: i,
      name: t(`step${i}Title`, args),
      text: t(`step${i}Text`, args),
      url: `${baseUrl}${localePrefix}/convert/${slug}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [1, 2, 3].map((i) => ({
      "@type": "Question",
      name: t(`q${i}`, args),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`a${i}`, args),
      },
    })),
  };

  const related = getRelatedConversions(slug, 4);

  return (
    <main className="min-h-screen bg-[#0C0A12] text-[#EDEDEF]">
      <JsonLd data={howToSchema} />
      <JsonLd data={faqSchema} />
      <Navbar />

      <section className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF] mb-4">
            {t("badge")}
          </span>
          <h1 className="text-3xl sm:text-5xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
            {t("h1", args)}
          </h1>
          <p className="text-[#A1A1AA] font-[Inter] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("intro", args)}
          </p>
          <Link
            href={`/tools/${conversion.toolSlug}`}
            className="inline-flex items-center gap-2 mt-8 h-12 px-6 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all min-h-[44px]"
          >
            {t("cta", args)}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-[Syne] font-bold text-[#EDEDEF] mb-8 text-center">
            {t("howToHeading", args)}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#16131E] border border-[#2A2535] rounded-xl p-5"
              >
                <span className="font-mono text-[11px] text-[#2DD4BF] uppercase tracking-wider">
                  {t("stepLabel")} {String(i).padStart(2, "0")}
                </span>
                <h3 className="text-base font-[Syne] font-bold text-[#EDEDEF] mt-2 mb-1">
                  {t(`step${i}Title`, args)}
                </h3>
                <p className="text-sm text-[#A1A1AA] font-[Inter]">
                  {t(`step${i}Text`, args)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-[#2A2535]/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-[Syne] font-bold text-[#EDEDEF] mb-8">
            {t("faqHeading")}
          </h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-l-2 border-[#2DD4BF]/40 pl-5 sm:pl-6"
              >
                <h3 className="text-base sm:text-lg font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  {t(`q${i}`, args)}
                </h3>
                <p className="text-[#A1A1AA] font-[Inter] text-sm sm:text-base leading-relaxed">
                  {t(`a${i}`, args)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-[#2A2535]/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-6">
              {t("relatedHeading")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((c) => (
                <Link
                  key={c.slug}
                  href={`/convert/${c.slug}`}
                  className="flex items-center justify-between gap-3 p-4 rounded-xl border border-[#2A2535] bg-[#16131E] hover:border-[#2DD4BF]/30 transition-colors"
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
      )}

      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-[#2A2535]/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
            {t("ctaHeading", args)}
          </h2>
          <p className="text-[#A1A1AA] font-[Inter] mb-6 max-w-xl mx-auto">
            {t("ctaDesc")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/tools/${conversion.toolSlug}`}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-sm uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all min-h-[44px]"
            >
              {t("cta", args)}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border border-[#2A2535] text-[#EDEDEF] font-mono text-sm uppercase tracking-wider hover:border-[#2DD4BF]/30 transition-colors min-h-[44px]"
            >
              {tn("tools")}
            </Link>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-8 text-xs text-[#71717A] font-mono uppercase tracking-wider">
            {[t("trust1"), t("trust2"), t("trust3"), t("trust4")].map((it) => (
              <li key={it} className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#2DD4BF]" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}

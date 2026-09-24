import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  faqPageSchema,
  JsonLd,
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "@/components/json-ld";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LiveDemo } from "@/components/landing/live-demo";
import { LogoBar } from "@/components/landing/logo-bar";
import { Navbar } from "@/components/landing/navbar";
import { PopularTools } from "@/components/landing/popular-tools";
import { SmoothScroll } from "@/components/smooth-scroll";
import { pageMetadata } from "@/lib/seo";

// Below-the-fold sections — code-split so their JS (framer-motion etc)
// loads after the critical path. Still SSR'd for SEO.
const Comparison = dynamic(() =>
  import("@/components/landing/comparison").then((m) => ({
    default: m.Comparison,
  })),
);
const Pricing = dynamic(() =>
  import("@/components/landing/pricing").then((m) => ({ default: m.Pricing })),
);
const Testimonials = dynamic(() =>
  import("@/components/landing/testimonials").then((m) => ({
    default: m.Testimonials,
  })),
);
const FAQ = dynamic(() =>
  import("@/components/landing/faq").then((m) => ({ default: m.FAQ })),
);
const CTA = dynamic(() =>
  import("@/components/landing/cta").then((m) => ({ default: m.CTA })),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ToolMeta" });
  return pageMetadata({
    fallbackImage: true,
    locale,
    path: "",
    title: t("home-title"),
    description: t("home-desc"),
    absoluteTitle: true,
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareApplicationSchema} />
      <JsonLd data={faqPageSchema} />
      <SmoothScroll />
      <Navbar />
      <Hero />
      <LogoBar />
      <Features />
      <HowItWorks />
      <LiveDemo />
      <PopularTools locale={locale} />
      <Comparison />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

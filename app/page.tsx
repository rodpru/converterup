import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { LogoBar } from "@/components/landing/logo-bar";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LiveDemo } from "@/components/landing/live-demo";
import { Comparison } from "@/components/landing/comparison";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import {
  JsonLd,
  websiteSchema,
  organizationSchema,
  softwareApplicationSchema,
  faqPageSchema,
} from "@/components/json-ld";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://converterup.com",
  },
};

export default function Home() {
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
      <Comparison />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

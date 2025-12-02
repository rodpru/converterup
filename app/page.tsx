import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900">
      <Navbar />
      <Hero />
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

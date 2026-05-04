import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#0C0A12] text-[#EDEDEF]">
      <Navbar />
      <article className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-16 max-w-3xl">
        <div className="prose prose-invert prose-sm sm:prose-base prose-headings:font-[Syne] prose-headings:text-[#EDEDEF] prose-p:text-[#A1A1AA] prose-li:text-[#A1A1AA] prose-a:text-[#2DD4BF] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#EDEDEF]">
          {children}
        </div>
      </article>
      <Footer />
    </main>
  );
}

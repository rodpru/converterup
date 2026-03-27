import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { RelatedTools } from "@/components/related-tools";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <div className="pt-20">{children}</div>
      <RelatedTools />
      <Footer />
    </main>
  );
}

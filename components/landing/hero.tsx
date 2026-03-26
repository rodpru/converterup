import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroReveal, FormatMorphCard, FloatingFormats } from "./hero-animations";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-16">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-[#0D9488]/[0.07] rounded-full blur-[150px]" />
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-[#7C3AED]/[0.05] rounded-full blur-[130px]" />
        <div className="absolute bottom-[10%] left-[40%] w-[300px] h-[300px] bg-[#F43F5E]/[0.04] rounded-full blur-[120px]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #EDEDEF 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Text */}
          <div className="lg:col-span-7">
            <HeroReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2A2535] bg-[#1C1825]/50 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Your files never leave your device
                </span>
              </div>
            </HeroReveal>

            <HeroReveal delay={0.1}>
              <h1 className="font-[Syne] font-extrabold tracking-tight leading-[0.95] mb-8" style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}>
                Convert anything.
                <br />
                <span className="gradient-text">Upload nothing.</span>
              </h1>
            </HeroReveal>

            <HeroReveal delay={0.2}>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed mb-10">
                Images, videos, audio — transformed in{" "}
                <span className="font-mono text-foreground">under 2s</span>.
                100% browser-native. No servers. No tracking. No compromises.
              </p>
            </HeroReveal>

            <HeroReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center justify-center h-12 px-7 bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wider rounded-lg hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] transition-all duration-300 min-h-[44px]"
                >
                  Start Converting
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center h-12 px-7 border border-[#2A2535] text-foreground font-medium text-sm uppercase tracking-wider rounded-lg hover:bg-[#1C1825] hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 min-h-[44px]"
                >
                  See How It Works
                </Link>
              </div>
            </HeroReveal>

            {/* Format pills */}
            <HeroReveal delay={0.5}>
              <div className="flex flex-wrap gap-2 mt-10">
                {["PNG", "JPG", "WEBP", "MP4", "GIF", "AVIF", "WEBM", "MOV"].map((fmt) => (
                  <span
                    key={fmt}
                    className="px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider text-muted-foreground border border-[#2A2535] hover:border-primary/30 hover:text-primary transition-colors duration-200"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </HeroReveal>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center min-h-[480px]">
            <FormatMorphCard />
            <FloatingFormats />
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2A2535] to-transparent" />
    </section>
  );
}

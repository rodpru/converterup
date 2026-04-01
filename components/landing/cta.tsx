"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const ease = [0.16, 1, 0.3, 1] as const;

export function CTA() {
  const t = useTranslations("CTA");
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#0C0A12]">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="relative overflow-hidden bg-[#16131E] rounded-2xl px-6 sm:px-12 md:px-24 py-16 sm:py-20 md:py-32 text-center border border-[#2A2535]"
        >
          {/* Animated gradient accent line at top */}
          <div className="absolute top-0 left-0 w-full h-[2px]">
            <motion.div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(90deg, #0D9488, #7C3AED, #F43F5E, #0D9488)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </div>

          {/* Mesh gradient blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-[#0D9488]/[0.07] blur-[120px]" />
            <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/[0.07] blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[Syne] font-bold text-[#EDEDEF] mb-6 sm:mb-8 leading-[0.95]"
            >
              {t("title")} <br className="hidden sm:block" />
              <span className="gradient-text">{t("titleGradient")}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="text-base sm:text-lg md:text-xl text-[#71717A] font-[Inter] max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-2"
            >
              {t("desc")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
            >
              <Button
                size="lg"
                className="group glow rounded-xl h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 text-base sm:text-lg bg-[#2DD4BF] text-[#0C0A12] font-semibold hover:bg-[#2DD4BF]/90 transition-all duration-300 hover:-translate-y-0.5 border-0 min-h-[44px]"
                asChild
              >
                <Link href="/dashboard">
                  {t("button")}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

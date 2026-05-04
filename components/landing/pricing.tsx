"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const ease = [0.16, 1, 0.3, 1] as const;

export function Pricing() {
  const t = useTranslations("Pricing");

  const features = [
    t("freeFeature1"),
    t("freeFeature2"),
    t("freeFeature3"),
    t("freeFeature4"),
    t("freeFeature5"),
  ];

  return (
    <section
      id="pricing"
      className="py-20 sm:py-28 md:py-36 border-t border-[#2A2535]/50"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14 sm:mb-20"
        >
          <h2
            className="font-[Syne] font-bold text-foreground mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {t("title")}{" "}
            <span className="gradient-text">{t("titleGradient")}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
            {t("desc")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="relative max-w-md mx-auto p-8 sm:p-10 rounded-2xl border border-primary/20 bg-card hover:border-primary/40 hover:shadow-[0_0_40px_rgba(45,212,191,0.08)] transition-all duration-300"
        >
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-[#0D9488] via-[#7C3AED] to-[#F43F5E] rounded-full" />

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {t("freeName")}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="font-mono text-5xl sm:text-6xl font-bold text-foreground">
                {t("freePrice")}
              </span>
              <span className="font-mono text-sm text-muted-foreground">
                / {t("freePeriod")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("freeDescription")}
            </p>
          </div>

          <ul className="space-y-3 mb-10">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary/70" />
                <span className="text-sm text-foreground/70">{f}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/tools"
            className="flex items-center justify-center w-full h-12 rounded-lg font-medium text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]"
          >
            {t("freeCta")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

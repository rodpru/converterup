"use client";

import { motion } from "framer-motion";
import { Upload, SlidersHorizontal, Download } from "lucide-react";
import { useTranslations } from "next-intl";

const ease = [0.16, 1, 0.3, 1] as const;

const stepIcons = [Upload, SlidersHorizontal, Download];

export function HowItWorks() {
  const t = useTranslations("HowItWorks");

  const steps = [
    {
      number: "01",
      title: t("step1Title"),
      description: t("step1Desc"),
      icon: stepIcons[0],
    },
    {
      number: "02",
      title: t("step2Title"),
      description: t("step2Desc"),
      icon: stepIcons[1],
    },
    {
      number: "03",
      title: t("step3Title"),
      description: t("step3Desc"),
      icon: stepIcons[2],
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-24 md:py-32 bg-[#0C0A12] border-t border-[#2A2535]/50"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-12 sm:mb-16 md:mb-24"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
            {t("title")}{" "}
            <span className="gradient-text">{t("titleGradient")}</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#71717A] font-[Inter] max-w-lg mx-auto">
            {t("desc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-px bg-[#2A2535]" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease }}
              className="relative text-center px-6 sm:px-8 py-8 sm:py-12 group"
            >
              {/* Watermark number */}
              <div className="font-[Syne] text-8xl text-[#EDEDEF]/[0.03] absolute top-0 left-1/2 -translate-x-1/2 select-none pointer-events-none leading-none font-bold">
                {step.number}
              </div>

              {/* Icon in bordered rounded-xl square */}
              <div className="relative inline-flex items-center justify-center w-14 h-14 border border-[#2A2535] rounded-xl bg-[#16131E] mb-6 z-10 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                <step.icon className="w-5 h-5 stroke-[1.5] text-[#71717A]" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-[Syne] font-semibold text-[#EDEDEF] mb-3">
                {step.title}
              </h3>
              <p className="text-[#71717A] font-[Inter] leading-relaxed max-w-xs mx-auto text-sm sm:text-base">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

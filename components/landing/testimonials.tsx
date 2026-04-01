"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const ease = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  const t = useTranslations("Testimonials");

  const testimonials = [
    { quote: t("quote1"), name: t("name1"), role: t("role1") },
    { quote: t("quote2"), name: t("name2"), role: t("role2") },
    { quote: t("quote3"), name: t("name3"), role: t("role3") },
    { quote: t("quote4"), name: t("name4"), role: t("role4") },
  ];

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-[#0C0A12] border-t border-[#2A2535]/50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
            {t("title")} <span className="gradient-text">{t("titleGradient")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px max-w-4xl mx-auto bg-[#2A2535]/50 border border-[#2A2535]/50 rounded-2xl overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease }}
              className="relative bg-[#0C0A12] p-6 sm:p-8 md:p-10 group hover:bg-[#16131E] transition-colors duration-300"
            >
              {/* Bottom gradient accent line on hover */}
              <div className="absolute bottom-0 left-0 w-full h-px gradient-line scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <blockquote className="font-[Syne] font-semibold text-xl sm:text-2xl leading-relaxed mb-6 text-[#EDEDEF]">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#EDEDEF]">
                  {testimonial.name}
                </p>
                <p className="font-mono text-[11px] text-[#71717A] mt-0.5">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

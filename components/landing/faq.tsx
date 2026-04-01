"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ease = [0.16, 1, 0.3, 1] as const;

const faqKeys = ["1", "2", "3", "4", "5", "6"] as const;

export function FAQ() {
  const t = useTranslations("FAQ");

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-[#0C0A12] border-t border-[#2A2535]/50">
      <div className="container px-4 sm:px-6 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
            {t("title")}{" "}
            <span className="gradient-text">{t("titleGradient")}</span>
          </h2>
          <p className="text-lg text-[#71717A] font-[Inter]">{t("desc")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqKeys.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06, ease }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-[#2A2535]/50"
                >
                  <AccordionTrigger className="text-left text-base sm:text-lg font-[Syne] font-semibold text-[#EDEDEF] hover:no-underline hover:text-[#2DD4BF] transition-colors duration-200 py-5">
                    {t(`q${key}`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#71717A] font-[Inter] text-sm sm:text-base leading-relaxed pb-5">
                    {t(`a${key}`)}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

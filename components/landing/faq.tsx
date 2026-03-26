"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ease = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. All file processing happens entirely in your browser using WebAssembly (FFmpeg.wasm). Your files are never uploaded to any server. They stay on your device at all times.",
  },
  {
    question: "What formats are supported?",
    answer:
      "Images: PNG, JPG, WebP, AVIF, GIF, TIFF, BMP. Videos: MP4, WebM, MKV, AVI, MOV. Audio extraction: MP3, AAC, WAV, OGG. We're constantly adding more formats.",
  },
  {
    question: "How do credits work?",
    answer:
      "Free users get 5 image conversions and 1 video conversion per day, resetting at midnight. If you need more, you can purchase credit packs (one-time, no subscription). Paid credits never expire.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "Since processing happens in your browser, the limit depends on your device's memory. Most modern devices handle files up to 500MB for images and 1-2GB for videos without issues.",
  },
  {
    question: "Can I use it on mobile?",
    answer:
      "Yes! ConverterUp is fully responsive and optimized for mobile devices. All conversion features work on smartphones and tablets, though very large files may perform better on desktop.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "You can use ConverterUp without an account for basic conversions. Creating a free account unlocks daily credits tracking and the ability to purchase additional credits.",
  },
];

export function FAQ() {
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
            Questions &{" "}
            <span className="gradient-text">answers.</span>
          </h2>
          <p className="text-lg text-[#71717A] font-[Inter]">
            Everything you need to know about ConverterUp.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
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
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#71717A] font-[Inter] text-sm sm:text-base leading-relaxed pb-5">
                    {faq.answer}
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

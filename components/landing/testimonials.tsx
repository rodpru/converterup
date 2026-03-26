"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    quote:
      "Finally a converter that doesn't upload my files to some random server. Fast, private, and the UI is beautiful.",
    name: "Sarah Chen",
    role: "Product Designer",
  },
  {
    quote:
      "I convert dozens of images daily for my blog. Recast saves me time and the quality is consistently excellent.",
    name: "Marcus Rivera",
    role: "Content Creator",
  },
  {
    quote:
      "The video conversion blew me away. Everything happens in the browser, no waiting for server queues. Game changer.",
    name: "Aisha Patel",
    role: "Video Editor",
  },
  {
    quote:
      "Clean, minimal, does exactly what it says. No ads, no dark patterns, no upsells. Just works.",
    name: "Tom Andersen",
    role: "Developer",
  },
];

export function Testimonials() {
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
            Loved by <span className="gradient-text">creators.</span>
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

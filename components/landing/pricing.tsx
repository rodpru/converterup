"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For casual use",
    features: [
      "3 conversions per day",
      "All formats supported",
      "Full quality control",
      "No watermarks",
      "No ads, ever",
    ],
    cta: "Get Started",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Unlimited",
    price: "$5",
    period: "month",
    description: "For creators & professionals",
    features: [
      "Unlimited conversions",
      "All formats supported",
      "Full quality control",
      "Priority support",
      "Cancel anytime",
    ],
    cta: "Go Unlimited",
    href: "/signup",
    highlighted: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 md:py-36 border-t border-[#2A2535]/50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14 sm:mb-20"
        >
          <h2 className="font-[Syne] font-bold text-foreground mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Simple <span className="gradient-text">pricing.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
            No credits. No tiers. No confusion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              className={`relative p-8 sm:p-10 rounded-2xl border transition-all duration-300 ${
                plan.highlighted
                  ? "border-primary/20 bg-card hover:border-primary/40 hover:shadow-[0_0_40px_rgba(45,212,191,0.08)]"
                  : "border-[#2A2535] bg-card hover:border-[#2A2535]/80"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-[#0D9488] via-[#7C3AED] to-[#F43F5E] rounded-full" />
              )}

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {plan.name}
                  </span>
                  {plan.highlighted && <Sparkles className="w-3.5 h-3.5 text-primary" />}
                </div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="font-mono text-5xl sm:text-6xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="font-mono text-sm text-muted-foreground">
                    / {plan.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-10">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary/70" />
                    <span className="text-sm text-foreground/70">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`flex items-center justify-center w-full h-12 rounded-lg font-medium text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 min-h-[44px] ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]"
                    : "border border-[#2A2535] text-foreground hover:bg-[#1C1825] hover:border-primary/20"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

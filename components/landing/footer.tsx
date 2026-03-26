"use client";

import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/logo";

const ease = [0.16, 1, 0.3, 1] as const;

const marqueeText = "RECAST \u2014 Transform Your Media";
const marqueeItems = Array.from({ length: 12 }, () => marqueeText);

export function Footer() {
  return (
    <footer className="bg-[#0C0A12] border-t border-[#2A2535]">
      {/* Marquee */}
      <div className="overflow-hidden border-b border-[#2A2535] py-3">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {marqueeItems.map((text, i) => (
            <span
              key={i}
              className="font-mono text-[11px] uppercase tracking-wider text-[#EDEDEF]/[0.15] mx-6 shrink-0"
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
        >
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo className="w-8 h-8" />
              <span className="text-xl font-[Syne] font-bold tracking-tight text-[#EDEDEF]">
                Recast
              </span>
            </div>
            <p className="text-[#71717A] font-[Inter] max-w-xs text-sm leading-relaxed">
              Convert images and videos instantly in your browser. Private,
              fast, and beautifully simple.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-[#71717A]/50 mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-[#71717A] hover:text-[#EDEDEF] transition-colors duration-200 text-sm font-[Inter]"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-[#71717A] hover:text-[#EDEDEF] transition-colors duration-200 text-sm font-[Inter]"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-[#71717A] hover:text-[#EDEDEF] transition-colors duration-200 text-sm font-[Inter]"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-[#71717A]/50 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-[#71717A] hover:text-[#EDEDEF] transition-colors duration-200 text-sm font-[Inter]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[#71717A] hover:text-[#EDEDEF] transition-colors duration-200 text-sm font-[Inter]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#71717A] hover:text-[#EDEDEF] transition-colors duration-200 text-sm font-[Inter]"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#2A2535]">
          <p className="text-sm text-[#71717A]/50 mb-4 md:mb-0 font-[Inter]">
            &copy; {new Date().getFullYear()} Recast. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-[#71717A] hover:text-[#EDEDEF] transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-[#71717A] hover:text-[#EDEDEF] transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/logo";
import { Link } from "@/i18n/routing";

const ease = [0.16, 1, 0.3, 1] as const;

// marqueeItems built inside Footer using translations

const tools = [
  { name: "Image Compressor", href: "/tools/image-compressor" },
  { name: "Image Resizer", href: "/tools/image-resizer" },
  { name: "Video to GIF", href: "/tools/video-to-gif" },
  { name: "QR Code Generator", href: "/tools/qr-code-generator" },
  { name: "YouTube Thumbnails", href: "/tools/youtube-thumbnail-downloader" },
  { name: "EXIF Viewer", href: "/tools/exif-viewer" },
  { name: "Color Palette", href: "/tools/color-palette" },
  { name: "Favicon Generator", href: "/tools/favicon-generator" },
  { name: "SVG to PNG", href: "/tools/svg-to-png" },
  { name: "Image to Base64", href: "/tools/image-to-base64" },
  { name: "Frame Extractor", href: "/tools/video-frame-extractor" },
  { name: "Stripe Fees", href: "/tools/stripe-fee-calculator" },
  { name: "Text Repeater", href: "/tools/text-repeater" },
  { name: "VTT to SRT", href: "/tools/vtt-to-srt" },
  { name: "JSON Viewer", href: "/tools/json-viewer" },
  { name: "Hex to Decimal", href: "/tools/hex-to-decimal" },
  { name: "HTML Minifier", href: "/tools/html-minifier" },
  { name: "CSS Minifier", href: "/tools/css-minifier" },
  { name: "UUID Generator", href: "/tools/uuid-generator" },
  { name: "Base64 Decoder", href: "/tools/base64-decode" },
  { name: "Case Converter", href: "/tools/case-converter" },
  { name: "CSV to JSON", href: "/tools/csv-to-json" },
];

export function Footer() {
  const tNav = useTranslations("Navigation");
  const tFooter = useTranslations("Footer");
  const marqueeItems = Array.from({ length: 12 }, () => tFooter("marquee"));

  return (
    <footer className="bg-[#0C0A12] border-t border-[#2A2535]">
      {/* Marquee */}
      <div className="overflow-hidden border-b border-[#2A2535] py-3">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
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

      <div className="container mx-auto px-4 sm:px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          {/* Top: Brand + Nav */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <Logo className="w-7 h-7" />
                <span className="text-lg font-[Syne] font-bold tracking-tight text-[#EDEDEF]">
                  ConverterUp
                </span>
              </div>
              <p className="text-[#71717A] font-[Inter] text-sm leading-relaxed">
                {tFooter("desc")}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-[Inter]">
              <Link
                href="/#features"
                className="text-[#71717A] hover:text-[#EDEDEF] transition-colors"
              >
                {tNav("features")}
              </Link>
              <Link
                href="/#how-it-works"
                className="text-[#71717A] hover:text-[#EDEDEF] transition-colors"
              >
                {tNav("howItWorks")}
              </Link>
              <Link
                href="/tools"
                className="text-[#71717A] hover:text-[#EDEDEF] transition-colors"
              >
                {tNav("tools")}
              </Link>
              <Link
                href="/blog"
                className="text-[#71717A] hover:text-[#EDEDEF] transition-colors"
              >
                {tNav("blog")}
              </Link>
              <Link
                href="/about"
                className="text-[#71717A] hover:text-[#EDEDEF] transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-[#71717A] hover:text-[#EDEDEF] transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-[#71717A] hover:text-[#EDEDEF] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-[#71717A] hover:text-[#EDEDEF] transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>

          {/* Tools grid */}
          <div className="border-t border-[#2A2535] pt-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono text-[10px] uppercase tracking-wider text-[#71717A]/50">
                {tNav("tools")}
              </h3>
              <Link
                href="/tools"
                className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[#2DD4BF] hover:text-[#EDEDEF] transition-colors"
              >
                {tFooter("viewAll")}
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="px-3 py-1.5 rounded-md border border-[#2A2535] text-[#71717A] hover:text-[#EDEDEF] hover:border-[#2DD4BF]/20 transition-colors text-xs font-[Inter]"
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-[#2A2535] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#71717A]/40 font-[Inter]">
              &copy; {new Date().getFullYear()} ConverterUp. {tFooter("rights")}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

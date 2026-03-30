"use client";

import { ImageIcon, Video, Minimize2, Crop, Music, Lock } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    icon: ImageIcon,
    title: "Image Conversion",
    description:
      "PNG, JPG, WebP, AVIF, GIF, TIFF, BMP. Convert between any image format instantly in your browser.",
    span: "sm:col-span-2 sm:row-span-2",
    large: true,
  },
  {
    icon: Video,
    title: "Video Conversion",
    description: "MP4, WebM, MKV, AVI, MOV. Transform formats client-side.",
    span: "",
    large: false,
  },
  {
    icon: Minimize2,
    title: "Smart Compression",
    description: "Reduce file sizes up to 80% with quality preservation.",
    span: "",
    large: false,
  },
  {
    icon: Crop,
    title: "Resize & Crop",
    description: "Precise dimension control. Lock or override aspect ratios.",
    span: "",
    large: false,
  },
  {
    icon: Music,
    title: "Audio Extraction",
    description: "Pull audio from any video. MP3, AAC, WAV, OGG.",
    span: "",
    large: false,
  },
  {
    icon: Lock,
    title: "100% Private",
    description:
      "WebAssembly processing. Files never leave your device. No server, no tracking.",
    span: "",
    large: false,
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function Features() {
  return (
    <section
      id="features"
      className="py-20 sm:py-28 md:py-36 border-t border-[#2A2535]/50"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 mb-14 sm:mb-20">
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="font-[Syne] font-bold text-foreground leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Powerful
              <br />
              <span className="gradient-text">conversions.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-7 flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              A complete media toolkit powered by WebAssembly. No servers, no
              uploads, no compromises.
            </motion.p>
          </div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#2A2535]/50 rounded-2xl overflow-hidden border border-[#2A2535]"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={item}
              className={`group relative bg-[#0C0A12] ${f.large ? "p-8 sm:p-10" : "p-6 sm:p-8"} hover:bg-card transition-all duration-500 ${f.span}`}
            >
              <div
                className={`flex justify-between items-start ${f.large ? "mb-12 sm:mb-16" : "mb-8 sm:mb-10"}`}
              >
                <span className="font-mono text-[11px] tracking-widest text-muted-foreground/30">
                  0{i + 1}
                </span>
                <f.icon
                  className={`${f.large ? "w-6 h-6" : "w-5 h-5"} stroke-[1.5] text-primary/60`}
                />
              </div>

              <h3
                className={`font-[Syne] font-bold text-foreground mb-3 group-hover:translate-x-1 transition-transform duration-300 ${f.large ? "text-xl sm:text-2xl" : "text-lg"}`}
              >
                {f.title}
              </h3>
              <p
                className={`text-muted-foreground leading-relaxed ${f.large ? "text-sm sm:text-base" : "text-sm"}`}
              >
                {f.description}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-[#7C3AED] to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

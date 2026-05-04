"use client";

import { motion } from "framer-motion";
import { Crop, ImageIcon, Lock, Minimize2, Music, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const ease = [0.16, 1, 0.3, 1] as const;

const featureIcons = [ImageIcon, Video, Minimize2, Crop, Music, Lock];
const featureKeys = [
  {
    title: "imageConversion",
    desc: "imageConversionDesc",
    span: "sm:col-span-2 sm:row-span-2",
    large: true,
    href: "/tools/svg-to-png",
  },
  {
    title: "videoConversion",
    desc: "videoConversionDesc",
    span: "",
    large: false,
    href: "/tools/video-to-gif",
  },
  {
    title: "smartCompression",
    desc: "smartCompressionDesc",
    span: "",
    large: false,
    href: "/tools/image-compressor",
  },
  {
    title: "resizeCrop",
    desc: "resizeCropDesc",
    span: "",
    large: false,
    href: "/tools/image-resizer",
  },
  {
    title: "audioExtraction",
    desc: "audioExtractionDesc",
    span: "",
    large: false,
    href: "/tools/video-frame-extractor",
  },
  { title: "privacy", desc: "privacyDesc", span: "", large: false, href: null },
] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

function FeatureCard({
  icon: Icon,
  title,
  description,
  large,
  span,
  href,
  index,
}: {
  icon: (typeof featureIcons)[number];
  title: string;
  description: string;
  large: boolean;
  span: string;
  href: string | null;
  index: number;
}) {
  return (
    <motion.div
      variants={item}
      className={`group relative h-full bg-[#0C0A12] ${large ? "p-8 sm:p-10" : "p-6 sm:p-8"} hover:bg-card transition-all duration-500 ${href ? "" : span}`}
    >
      <div
        className={`flex justify-between items-start ${large ? "mb-12 sm:mb-16" : "mb-8 sm:mb-10"}`}
      >
        <span className="font-mono text-[11px] tracking-widest text-muted-foreground/30">
          0{index + 1}
        </span>
        <Icon
          className={`${large ? "w-6 h-6" : "w-5 h-5"} stroke-[1.5] text-primary/60`}
        />
      </div>

      <h3
        className={`font-[Syne] font-bold text-foreground mb-3 group-hover:translate-x-1 transition-transform duration-300 ${large ? "text-xl sm:text-2xl" : "text-lg"}`}
      >
        {title}
      </h3>
      <p
        className={`text-muted-foreground leading-relaxed ${large ? "text-sm sm:text-base" : "text-sm"}`}
      >
        {description}
      </p>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-[#7C3AED] to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}

export function Features() {
  const t = useTranslations("Features");

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
              {t("title")}
              <br />
              <span className="gradient-text">{t("titleGradient")}</span>
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
              {t("desc")}
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
          {featureKeys.map((f, i) => {
            const title = t(f.title);
            const description = t(f.desc);
            const Icon = featureIcons[i];

            return f.href ? (
              <Link key={f.title} href={f.href} className={`block ${f.span}`}>
                <FeatureCard
                  icon={Icon}
                  title={title}
                  description={description}
                  large={f.large}
                  span={f.span}
                  href={f.href}
                  index={i}
                />
              </Link>
            ) : (
              <FeatureCard
                key={f.title}
                icon={Icon}
                title={title}
                description={description}
                large={f.large}
                span={f.span}
                href={f.href}
                index={i}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

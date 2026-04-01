"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";

const ease = [0.16, 1, 0.3, 1] as const;

const featureKeys = [
  "clientSide",
  "noUpload",
  "freeTier",
  "videoSupport",
  "noAds",
  "private",
  "noInstall",
  "modernUI",
] as const;

const featureData: Record<
  string,
  {
    converterup: boolean;
    cloudconvert: boolean;
    zamzar: boolean;
    handbrake: boolean;
  }
> = {
  clientSide: {
    converterup: true,
    cloudconvert: false,
    zamzar: false,
    handbrake: true,
  },
  noUpload: {
    converterup: true,
    cloudconvert: false,
    zamzar: false,
    handbrake: true,
  },
  freeTier: {
    converterup: true,
    cloudconvert: true,
    zamzar: true,
    handbrake: true,
  },
  videoSupport: {
    converterup: true,
    cloudconvert: true,
    zamzar: true,
    handbrake: true,
  },
  noAds: {
    converterup: true,
    cloudconvert: true,
    zamzar: false,
    handbrake: true,
  },
  private: {
    converterup: true,
    cloudconvert: false,
    zamzar: false,
    handbrake: true,
  },
  noInstall: {
    converterup: true,
    cloudconvert: true,
    zamzar: true,
    handbrake: false,
  },
  modernUI: {
    converterup: true,
    cloudconvert: true,
    zamzar: false,
    handbrake: false,
  },
};

function BoolCell({
  value,
  highlighted,
}: {
  value: boolean;
  highlighted?: boolean;
}) {
  return value ? (
    <Check
      className={`w-4 h-4 mx-auto ${highlighted ? "text-[#2DD4BF]" : "text-[#2DD4BF]"}`}
    />
  ) : (
    <X className="w-4 h-4 text-[#71717A]/20 mx-auto" />
  );
}

export function Comparison() {
  const t = useTranslations("Comparison");

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
            {t("title")}{" "}
            <span className="gradient-text">{t("titleGradient")}</span>
          </h2>
          <p className="text-lg text-[#71717A] font-[Inter] max-w-lg mx-auto">
            {t("desc")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <motion.tr
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="border-b border-[#2A2535]/50"
              >
                <th className="text-left py-4 px-3 font-mono uppercase text-[11px] tracking-wider text-[#71717A]">
                  {t("feature")}
                </th>
                <th className="py-4 px-3 font-mono uppercase text-[11px] tracking-wider text-[#EDEDEF] bg-[#2DD4BF]/5">
                  ConverterUp
                </th>
                <th className="py-4 px-3 font-mono uppercase text-[11px] tracking-wider text-[#71717A]">
                  CloudConvert
                </th>
                <th className="py-4 px-3 font-mono uppercase text-[11px] tracking-wider text-[#71717A] hidden sm:table-cell">
                  Zamzar
                </th>
                <th className="py-4 px-3 font-mono uppercase text-[11px] tracking-wider text-[#71717A] hidden sm:table-cell">
                  HandBrake
                </th>
              </motion.tr>
            </thead>
            <tbody>
              {featureKeys.map((key, index) => {
                const data = featureData[key];
                return (
                  <motion.tr
                    key={key}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease }}
                    className="border-b border-[#2A2535]/50 hover:bg-[#16131E] transition-colors duration-200"
                  >
                    <td className="py-3.5 px-3 font-[Inter] text-sm sm:text-base text-[#EDEDEF]">
                      {t(key)}
                    </td>
                    <td className="py-3.5 px-3 text-center bg-[#2DD4BF]/5">
                      <BoolCell value={data.converterup} highlighted />
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <BoolCell value={data.cloudconvert} />
                    </td>
                    <td className="py-3.5 px-3 text-center hidden sm:table-cell">
                      <BoolCell value={data.zamzar} />
                    </td>
                    <td className="py-3.5 px-3 text-center hidden sm:table-cell">
                      <BoolCell value={data.handbrake} />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

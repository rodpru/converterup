"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    name: "Client-side processing",
    converterup: true,
    cloudconvert: false,
    zamzar: false,
    handbrake: true,
  },
  {
    name: "No file upload",
    converterup: true,
    cloudconvert: false,
    zamzar: false,
    handbrake: true,
  },
  {
    name: "Free tier",
    converterup: true,
    cloudconvert: true,
    zamzar: true,
    handbrake: true,
  },
  {
    name: "Video support",
    converterup: true,
    cloudconvert: true,
    zamzar: true,
    handbrake: true,
  },
  {
    name: "No ads",
    converterup: true,
    cloudconvert: true,
    zamzar: false,
    handbrake: true,
  },
  {
    name: "100% private",
    converterup: true,
    cloudconvert: false,
    zamzar: false,
    handbrake: true,
  },
  {
    name: "No install required",
    converterup: true,
    cloudconvert: true,
    zamzar: true,
    handbrake: false,
  },
  {
    name: "Modern UI",
    converterup: true,
    cloudconvert: true,
    zamzar: false,
    handbrake: false,
  },
];

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
            Why <span className="gradient-text">ConverterUp?</span>
          </h2>
          <p className="text-lg text-[#71717A] font-[Inter] max-w-lg mx-auto">
            The only converter that combines privacy, speed, and modern design.
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
                  Feature
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
              {features.map((feature, index) => (
                <motion.tr
                  key={feature.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease }}
                  className="border-b border-[#2A2535]/50 hover:bg-[#16131E] transition-colors duration-200"
                >
                  <td className="py-3.5 px-3 font-[Inter] text-sm sm:text-base text-[#EDEDEF]">
                    {feature.name}
                  </td>
                  <td className="py-3.5 px-3 text-center bg-[#2DD4BF]/5">
                    <BoolCell value={feature.converterup} highlighted />
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <BoolCell value={feature.cloudconvert} />
                  </td>
                  <td className="py-3.5 px-3 text-center hidden sm:table-cell">
                    <BoolCell value={feature.zamzar} />
                  </td>
                  <td className="py-3.5 px-3 text-center hidden sm:table-cell">
                    <BoolCell value={feature.handbrake} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

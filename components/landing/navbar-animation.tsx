"use client";

import { motion } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";

export function NavbarAnimation({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[#0C0A12]/80 border-b border-[#2A2535]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {children}
    </motion.nav>
  );
}

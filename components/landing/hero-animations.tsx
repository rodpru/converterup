"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function HeroTextAnimation({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}

export function HeroVisualAnimation({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] bg-card border border-foreground p-8 editorial-shadow rotate-3 hover:rotate-0 transition-transform duration-700 ease-out"
        >
            {children}
        </motion.div>
    );
}


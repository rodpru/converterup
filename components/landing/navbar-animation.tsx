"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function NavbarAnimation({ children }: { children: ReactNode }) {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-foreground"
        >
            {children}
        </motion.nav>
    );
}


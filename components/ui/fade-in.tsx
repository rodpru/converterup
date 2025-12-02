"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    fullWidth?: boolean;
}

export function FadeIn({
    children,
    delay = 0,
    duration = 0.5,
    direction = "up",
    fullWidth = false,
    className,
    ...props
}: FadeInProps) {
    const directions = {
        up: { y: 20, x: 0 },
        down: { y: -20, x: 0 },
        left: { x: 20, y: 0 },
        right: { x: -20, y: 0 },
        none: { x: 0, y: 0 },
    };

    const initial = { opacity: 0, ...directions[direction] };

    return (
        <motion.div
            initial={initial}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
            style={{ width: fullWidth ? "100%" : "auto" }}
            {...props}
        >
            {children}
        </motion.div>
    );
}


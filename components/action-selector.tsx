"use client";

import { motion } from "framer-motion";
import { FileText, PenTool, Layers, Highlighter } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerHapticFeedback } from "@/lib/mobile-utils";

export type ActionMode = "edit" | "sign" | "organize" | "annotate";

interface ActionSelectorProps {
    onSelect: (mode: ActionMode) => void;
}

const actions = [
    {
        id: "edit",
        title: "Edit Text",
        description: "Modify content directly.",
        icon: FileText,
        color: "bg-primary text-white",
        hover: "hover:bg-primary/90"
    },
    {
        id: "sign",
        title: "Sign Document",
        description: "Add your signature.",
        icon: PenTool,
        color: "bg-accent text-white",
        hover: "hover:bg-accent/90"
    },
    {
        id: "organize",
        title: "Organize Pages",
        description: "Rearrange or delete.",
        icon: Layers,
        color: "bg-secondary text-foreground",
        hover: "hover:bg-secondary/80"
    },
    {
        id: "annotate",
        title: "Annotate",
        description: "Highlight and comment.",
        icon: Highlighter,
        color: "bg-muted text-foreground",
        hover: "hover:bg-muted/80"
    }
];

export function ActionSelector({ onSelect }: ActionSelectorProps) {
    const handleSelect = (mode: ActionMode) => {
        triggerHapticFeedback("light");
        onSelect(mode);
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 sm:mb-12 md:mb-16"
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-foreground mb-3 sm:mb-4 px-4">
                    Select your tool.
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground px-4">
                    Precision instruments for your document.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-foreground">
                {actions.map((action, index) => (
                    <motion.button
                        key={action.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleSelect(action.id as ActionMode)}
                        aria-label={`${action.title} - ${action.description}`}
                        className={cn(
                            "group relative p-6 sm:p-8 md:p-12 text-left transition-all duration-300 border-b border-r border-foreground last:border-b-0 md:last:border-r-0 md:nth-last-child-2:border-b-0",
                            "hover:bg-foreground hover:text-background active:scale-[0.98]",
                            "min-h-[120px] sm:min-h-[160px]",
                            index % 2 === 0 ? "md:border-r" : "border-r-0"
                        )}
                    >
                        <div className="flex flex-col h-full justify-between gap-6 sm:gap-8">
                            <div className="flex justify-between items-start">
                                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest opacity-50 group-hover:opacity-100">
                                    0{index + 1}
                                </span>
                                <action.icon className="w-6 h-6 sm:w-8 sm:h-8 stroke-1" />
                            </div>

                            <div>
                                <h3 className="text-2xl sm:text-3xl font-serif mb-2 group-hover:translate-x-2 transition-transform duration-300">
                                    {action.title}
                                </h3>
                                <p className="text-xs sm:text-sm opacity-60 max-w-[200px] group-hover:opacity-80">
                                    {action.description}
                                </p>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

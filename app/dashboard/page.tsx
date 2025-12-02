"use client";

import { FileUploader } from "@/components/file-uploader";
import { ActionSelector, type ActionMode } from "@/components/action-selector";
import { Navbar } from "@/components/landing/navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/lib/mobile-utils";

const PDFViewer = dynamic(
    () => import("@/components/pdf-viewer").then((mod) => mod.default),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center h-screen font-mono text-muted-foreground">
                Loading PDF Viewer...
            </div>
        ),
    }
);

export default function DashboardPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [mode, setMode] = useState<ActionMode | null>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
    };

    const handleModeSelect = (selectedMode: ActionMode) => {
        setMode(selectedMode);
    };

    const handleBack = () => {
        if (mode) {
            setMode(null);
        } else {
            setSelectedFile(null);
        }
    };

    // Animation variants with reduced motion support
    const fadeInUp = prefersReducedMotion
        ? {}
        : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

    const fadeIn = prefersReducedMotion
        ? {}
        : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
            <Navbar />

            <div className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
                <AnimatePresence mode="wait">
                    {!selectedFile ? (
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                key="upload"
                                {...fadeInUp}
                                transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
                                className="text-center mb-8 sm:mb-12"
                            >
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4 sm:mb-6 px-4">
                                    Upload your Document
                                </h1>
                                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-xl mx-auto px-4">
                                    Get started by uploading a PDF file to edit, split, or merge.
                                </p>
                            </motion.div>

                            <motion.div
                                {...fadeInUp}
                                transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.1 }}
                            >
                                <FileUploader onFileSelect={handleFileSelect} />
                            </motion.div>
                        </div>
                    ) : !mode ? (
                        <motion.div
                            key="action-selector"
                            {...fadeIn}
                        >
                            <div className="mb-6 sm:mb-8 container max-w-5xl mx-auto px-4">
                                <button
                                    onClick={handleBack}
                                    className="text-xs sm:text-sm font-mono uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2 min-h-[44px]"
                                    aria-label="Change file"
                                >
                                    <span>←</span> Change File
                                </button>
                            </div>
                            <ActionSelector onSelect={handleModeSelect} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="viewer"
                            {...fadeIn}
                            className="fixed inset-0 z-50 bg-background"
                        >
                            <PDFViewer file={selectedFile} mode={mode} onBack={handleBack} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}

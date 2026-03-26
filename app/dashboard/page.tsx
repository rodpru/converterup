"use client";

import { useState, useCallback } from "react";
import { Navbar } from "@/components/landing/navbar";
import { FileUploader } from "@/components/file-uploader";
import { ConversionOptions } from "@/components/conversion-options";
import { ConversionProgress } from "@/components/conversion-progress";
import { ConversionResult } from "@/components/conversion-result";
import { ConversionError } from "@/components/conversion-error";
import { CreditBadge } from "@/components/credit-badge";
import { UpgradeModal } from "@/components/upgrade-modal";
import { convertMedia, type ConversionResult as ConversionResultType } from "@/lib/conversion";
import { getFileCategory } from "@/lib/media-utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/mobile-utils";

type DashboardStep = "upload" | "configure" | "converting" | "result" | "error";

export default function DashboardPage() {
  const [step, setStep] = useState<DashboardStep>("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<ConversionResultType | null>(null);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [conversionOptions, setConversionOptions] = useState<Record<string, unknown> | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const fadeInUp = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setStep("configure");
  };

  const handleConvert = useCallback(
    async (options: {
      outputFormat: string;
      quality: number;
      width?: number;
      height?: number;
      maintainAspect: boolean;
      extractAudio?: boolean;
      audioFormat?: "mp3" | "aac" | "wav" | "ogg";
    }) => {
      if (!selectedFile) return;

      setConversionOptions(options as unknown as Record<string, unknown>);
      setStep("converting");
      setProgress(0);

      try {
        // Deduct credit
        const category = getFileCategory(selectedFile);
        const creditRes = await fetch("/api/credits/deduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: category }),
        });

        if (!creditRes.ok) {
          const data = await creditRes.json();
          if (data.error === "insufficient_credits") {
            setErrorMessage("No credits remaining. Upgrade to unlimited for $5/mo.");
            setStep("error");
            return;
          }
        }

        const conversionResult = await convertMedia(
          {
            inputFile: selectedFile,
            outputFormat: options.outputFormat,
            quality: options.quality,
            width: options.width,
            height: options.height,
            maintainAspect: options.maintainAspect,
            extractAudio: options.extractAudio,
            audioFormat: options.audioFormat,
          },
          setProgress,
        );

        setResult(conversionResult);
        setStep("result");
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : "An unexpected error occurred",
        );
        setStep("error");
      }
    },
    [selectedFile],
  );

  const handleRetry = () => {
    if (conversionOptions && selectedFile) {
      handleConvert(conversionOptions as Parameters<typeof handleConvert>[0]);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResult(null);
    setProgress(0);
    setErrorMessage("");
    setConversionOptions(null);
    setStep("upload");
  };

  return (
    <main className="min-h-screen bg-[#0C0A12] text-[#EDEDEF] selection:bg-[#2DD4BF]/20 selection:text-[#2DD4BF]">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
        {/* Credit Badge */}
        <div className="flex justify-end mb-6">
          <CreditBadge onUpgradeClick={() => setShowUpgrade(true)} />
        </div>

        <AnimatePresence mode="wait">
          {step === "upload" && (
            <motion.div key="upload" {...fadeInUp} transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}>
              <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-[Syne] font-bold text-[#EDEDEF] mb-4 sm:mb-6">
                  Upload your media
                </h1>
                <p className="text-lg sm:text-xl text-[#71717A] font-light max-w-xl mx-auto">
                  Drop an image or video to get started.
                </p>
              </div>
              <FileUploader onFileSelect={handleFileSelect} />
            </motion.div>
          )}

          {step === "configure" && selectedFile && (
            <motion.div key="configure" {...fadeInUp} transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}>
              <ConversionOptions
                file={selectedFile}
                onConvert={handleConvert}
                onBack={handleReset}
              />
            </motion.div>
          )}

          {step === "converting" && (
            <motion.div key="converting" {...fadeInUp} transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}>
              <ConversionProgress progress={progress} onCancel={handleReset} />
            </motion.div>
          )}

          {step === "result" && selectedFile && result && (
            <motion.div key="result" {...fadeInUp} transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}>
              <ConversionResult
                originalFile={selectedFile}
                result={result}
                onConvertAnother={handleReset}
              />
            </motion.div>
          )}

          {step === "error" && (
            <motion.div key="error" {...fadeInUp} transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}>
              <ConversionError
                message={errorMessage}
                onRetry={handleRetry}
                onBack={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </main>
  );
}

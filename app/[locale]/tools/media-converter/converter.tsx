"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { ConversionError } from "@/components/conversion-error";
import { ConversionOptions } from "@/components/conversion-options";
import { ConversionProgress } from "@/components/conversion-progress";
import { ConversionResult } from "@/components/conversion-result";
import { FileUploader } from "@/components/file-uploader";
import {
  type ConversionResult as ConversionResultType,
  convertMedia,
} from "@/lib/conversion";
import { usePrefersReducedMotion } from "@/lib/mobile-utils";
import { useQueryParam } from "@/lib/use-query-param";

type ConverterStep = "upload" | "configure" | "converting" | "result" | "error";

type ConvertOptions = {
  outputFormat: string;
  quality: number;
  width?: number;
  height?: number;
  maintainAspect: boolean;
  extractAudio?: boolean;
  audioFormat?: "mp3" | "aac" | "wav" | "ogg";
};

export function MediaConverter() {
  const t = useTranslations("MediaConverter");
  const preferredFormat = useQueryParam("to")?.toLowerCase() ?? undefined;

  const [step, setStep] = useState<ConverterStep>("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<ConversionResultType | null>(null);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [conversionOptions, setConversionOptions] =
    useState<ConvertOptions | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const fadeInUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
      };
  const transition = { duration: prefersReducedMotion ? 0 : 0.5 };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setStep("configure");
  };

  const handleConvert = useCallback(
    async (options: ConvertOptions) => {
      if (!selectedFile) return;

      setConversionOptions(options);
      setStep("converting");
      setProgress(0);

      try {
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
        console.error("[Conversion Error]", err);
        setErrorMessage(
          err instanceof Error ? err.message : t("unexpectedError"),
        );
        setStep("error");
      }
    },
    [selectedFile, t],
  );

  const handleRetry = () => {
    if (conversionOptions && selectedFile) {
      handleConvert(conversionOptions);
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
    <>
      <section className="container mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-20 sm:pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-primary mb-4">
            {t("badge")}
          </span>
          <h1 className="text-3xl sm:text-5xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
            {t("h1")}
            <br />
            <span className="gradient-text">{t("h1Gradient")}</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <AnimatePresence mode="wait">
          {step === "upload" && (
            <motion.div key="upload" {...fadeInUp} transition={transition}>
              <FileUploader onFileSelect={handleFileSelect} />
            </motion.div>
          )}

          {step === "configure" && selectedFile && (
            <motion.div key="configure" {...fadeInUp} transition={transition}>
              <ConversionOptions
                file={selectedFile}
                preferredFormat={preferredFormat}
                onConvert={handleConvert}
                onBack={handleReset}
              />
            </motion.div>
          )}

          {step === "converting" && (
            <motion.div key="converting" {...fadeInUp} transition={transition}>
              <ConversionProgress progress={progress} onCancel={handleReset} />
            </motion.div>
          )}

          {step === "result" && selectedFile && result && (
            <motion.div key="result" {...fadeInUp} transition={transition}>
              <ConversionResult
                originalFile={selectedFile}
                result={result}
                onConvertAnother={handleReset}
              />
            </motion.div>
          )}

          {step === "error" && (
            <motion.div key="error" {...fadeInUp} transition={transition}>
              <ConversionError
                message={errorMessage}
                onRetry={handleRetry}
                onBack={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

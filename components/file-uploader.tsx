"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon, Upload, Video, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FormatBadge } from "@/components/format-badge";
import {
  createPreviewUrl,
  formatFileSize,
  getAcceptedFileTypes,
  getFileCategory,
  getFileExtension,
} from "@/lib/media-utils";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export function FileUploader({ onFileSelect }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const acceptedTypes = useMemo(() => getAcceptedFileTypes(), []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        const category = getFileCategory(selectedFile);
        if (category === "unknown") {
          setError("Unsupported file format. Please upload an image or video.");
          return;
        }
        setFile(selectedFile);
        onFileSelect(selectedFile);
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxFiles: 1,
    multiple: false,
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setError(null);
  };

  const previewUrl = useMemo(() => {
    if (file && getFileCategory(file) === "image") {
      return createPreviewUrl(file);
    }
    return null;
  }, [file]);

  const category = file ? getFileCategory(file) : null;
  const ext = file ? getFileExtension(file) : "";

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <div
        {...getRootProps()}
        className={cn(
          "relative group cursor-pointer flex flex-col items-center justify-center w-full h-64 sm:h-72 md:h-80 border border-[#2A2535] rounded-2xl transition-all duration-300 ease-out bg-[#16131E]",
          isDragActive &&
            "border-[#2DD4BF]/30 shadow-[0_0_20px_rgba(45,212,191,0.15)] scale-[1.01]",
          !isDragActive &&
            "hover:border-[#2DD4BF]/30 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]",
          error && "border-[#FB7185]/50 bg-[#FB7185]/5",
        )}
      >
        <input {...getInputProps()} />

        <AnimatePresence mode="wait">
          {file ? (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center text-center p-6 sm:p-8 w-full"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-[#2A2535] mb-4"
                />
              ) : (
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1C1825] border border-[#2A2535] rounded-xl text-[#EDEDEF] flex items-center justify-center mb-4">
                  {category === "video" ? (
                    <Video className="w-6 h-6 sm:w-8 sm:h-8" />
                  ) : (
                    <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 mb-2">
                <FormatBadge
                  format={ext}
                  type={category as "image" | "video"}
                  size="sm"
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-1 max-w-[280px] sm:max-w-md truncate px-4">
                {file.name}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#71717A] mb-6">
                {formatFileSize(file.size)}
              </p>

              <button
                type="button"
                onClick={removeFile}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2A2535] text-[#EDEDEF] text-sm hover:border-[#FB7185]/50 hover:text-[#FB7185] transition-colors min-h-[44px]"
              >
                <X className="w-4 h-4" />
                Remove File
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center p-6 sm:p-8"
            >
              <div
                className={cn(
                  "w-12 h-12 sm:w-16 sm:h-16 border border-[#2A2535] rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 text-[#71717A]",
                  isDragActive
                    ? "scale-110 rotate-3 text-[#2DD4BF]"
                    : "group-hover:-translate-y-1 group-hover:text-[#2DD4BF]",
                )}
              >
                <Upload className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-[Syne] font-bold text-[#EDEDEF] mb-2 sm:mb-3 px-4">
                {isDragActive ? "Drop it here." : "Upload Media"}
              </h3>
              <p className="text-[#71717A] max-w-xs mx-auto font-mono text-xs sm:text-sm px-4">
                Images (PNG, JPG, WebP, GIF...) or Videos (MP4, WebM, MOV...)
              </p>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#FB7185] mt-4 font-medium text-sm"
                >
                  {error}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

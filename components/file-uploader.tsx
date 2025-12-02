"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File as FileIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
    onFileSelect: (file: File) => void;
}

export function FileUploader({ onFileSelect }: FileUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setError(null);
        if (acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0];
            if (selectedFile.type === "application/pdf") {
                setFile(selectedFile);
                onFileSelect(selectedFile);
            } else {
                setError("Please upload a valid PDF file.");
            }
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        },
        maxFiles: 1,
        multiple: false
    });

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
        setError(null);
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
            <div
                {...getRootProps()}
                className={cn(
                    "relative group cursor-pointer flex flex-col items-center justify-center w-full h-64 sm:h-72 md:h-80 border border-foreground transition-all duration-300 ease-out bg-background",
                    isDragActive
                        ? "bg-secondary/50 scale-[1.01]"
                        : "hover:bg-secondary/20",
                    error && "border-destructive bg-destructive/5"
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
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-foreground text-background flex items-center justify-center mb-4 sm:mb-6">
                                <FileIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                            </div>

                            <h3 className="text-xl sm:text-2xl font-serif mb-2 max-w-[280px] sm:max-w-md truncate px-4">
                                {file.name}
                            </h3>
                            <p className="text-xs sm:text-sm font-mono text-muted-foreground mb-6 sm:mb-8">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={removeFile}
                                className="rounded-none border-foreground hover:bg-destructive hover:text-white hover:border-destructive transition-colors min-h-[44px] px-6"
                                aria-label="Remove selected file"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Remove File
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="upload-prompt"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center text-center p-6 sm:p-8"
                        >
                            <div className={cn(
                                "w-12 h-12 sm:w-16 sm:h-16 border border-foreground flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300",
                                isDragActive ? "scale-110 rotate-3" : "group-hover:-translate-y-1"
                            )}>
                                <Upload className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-serif mb-2 sm:mb-3 px-4">
                                {isDragActive ? "Drop it here." : "Upload Document"}
                            </h3>
                            <p className="text-muted-foreground max-w-xs mx-auto font-mono text-xs sm:text-sm px-4">
                                Drag and drop your PDF, or click to browse.
                            </p>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-destructive mt-4 font-medium"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-foreground -mt-px -ml-px" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-foreground -mt-px -mr-px" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-foreground -mb-px -ml-px" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-foreground -mb-px -mr-px" />
            </div>
        </div>
    );
}

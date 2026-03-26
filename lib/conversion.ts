"use client";

import { fetchFile } from "@ffmpeg/util";
import { loadFFmpeg } from "./ffmpeg";

export interface ConversionOptions {
  inputFile: File;
  outputFormat: string;
  quality?: number;
  width?: number;
  height?: number;
  maintainAspect?: boolean;
  startTime?: number;
  endTime?: number;
  extractAudio?: boolean;
  audioFormat?: "mp3" | "aac" | "wav" | "ogg";
}

export interface ConversionResult {
  blob: Blob;
  filename: string;
  size: number;
  duration?: number;
}

function getInputExtension(file: File): string {
  const parts = file.name.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
}

function getMimeType(format: string): string {
  const mimeMap: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    avif: "image/avif",
    gif: "image/gif",
    tiff: "image/tiff",
    bmp: "image/bmp",
    mp4: "video/mp4",
    webm: "video/webm",
    mkv: "video/x-matroska",
    avi: "video/x-msvideo",
    mov: "video/quicktime",
    mp3: "audio/mpeg",
    aac: "audio/aac",
    wav: "audio/wav",
    ogg: "audio/ogg",
  };
  return mimeMap[format] || "application/octet-stream";
}

function buildImageArgs(
  inputName: string,
  outputName: string,
  options: ConversionOptions,
): string[] {
  const args = ["-i", inputName];

  // Quality
  if (options.quality !== undefined) {
    const q = Math.max(
      1,
      Math.min(31, Math.round(31 - (options.quality / 100) * 30)),
    );
    args.push("-q:v", q.toString());
  }

  // Resize
  if (options.width || options.height) {
    const w = options.width || -1;
    const h = options.height || -1;
    if (options.maintainAspect !== false) {
      args.push("-vf", `scale=${w}:${h}:force_original_aspect_ratio=decrease`);
    } else {
      args.push("-vf", `scale=${w}:${h}`);
    }
  }

  args.push("-y", outputName);
  return args;
}

function buildVideoArgs(
  inputName: string,
  outputName: string,
  options: ConversionOptions,
): string[] {
  const args = ["-i", inputName];

  // Trim
  if (options.startTime !== undefined) {
    args.push("-ss", options.startTime.toString());
  }
  if (options.endTime !== undefined) {
    args.push("-to", options.endTime.toString());
  }

  // Quality (CRF for video)
  if (options.quality !== undefined) {
    const crf = Math.round(51 - (options.quality / 100) * 51);
    args.push("-crf", crf.toString());
  }

  // Resize
  if (options.width || options.height) {
    const w = options.width || -2;
    const h = options.height || -2;
    args.push("-vf", `scale=${w}:${h}`);
  }

  args.push("-y", outputName);
  return args;
}

function buildAudioExtractionArgs(
  inputName: string,
  outputName: string,
  options: ConversionOptions,
): string[] {
  const args = ["-i", inputName, "-vn"];

  if (options.audioFormat === "mp3") {
    args.push("-acodec", "libmp3lame", "-q:a", "2");
  } else if (options.audioFormat === "aac") {
    args.push("-acodec", "aac", "-b:a", "192k");
  } else if (options.audioFormat === "wav") {
    args.push("-acodec", "pcm_s16le");
  } else if (options.audioFormat === "ogg") {
    args.push("-acodec", "libvorbis", "-q:a", "5");
  }

  args.push("-y", outputName);
  return args;
}

export async function convertMedia(
  options: ConversionOptions,
  onProgress?: (progress: number) => void,
): Promise<ConversionResult> {
  const startTime = Date.now();
  const ffmpeg = await loadFFmpeg(onProgress);

  const inputExt = getInputExtension(options.inputFile);
  const inputName = `input.${inputExt}`;

  let outputExt: string;
  let args: string[];

  if (options.extractAudio && options.audioFormat) {
    outputExt = options.audioFormat;
    const outputName = `output.${outputExt}`;
    await ffmpeg.writeFile(inputName, await fetchFile(options.inputFile));
    args = buildAudioExtractionArgs(inputName, outputName, options);
    await ffmpeg.exec(args);
    const data = await ffmpeg.readFile(outputName);
    const uint8 = data as Uint8Array;
    const blob = new Blob([new Uint8Array(uint8)], {
      type: getMimeType(outputExt),
    });
    const baseName = options.inputFile.name.replace(/\.[^.]+$/, "");

    // Cleanup
    await ffmpeg.deleteFile(inputName);
    await ffmpeg.deleteFile(outputName);

    return {
      blob,
      filename: `${baseName}.${outputExt}`,
      size: blob.size,
      duration: Date.now() - startTime,
    };
  }

  outputExt = options.outputFormat;
  const outputName = `output.${outputExt}`;
  await ffmpeg.writeFile(inputName, await fetchFile(options.inputFile));

  const isImage = [
    "png",
    "jpg",
    "jpeg",
    "webp",
    "avif",
    "gif",
    "tiff",
    "bmp",
  ].includes(outputExt);

  if (isImage) {
    args = buildImageArgs(inputName, outputName, options);
  } else {
    args = buildVideoArgs(inputName, outputName, options);
  }

  await ffmpeg.exec(args);
  const data = await ffmpeg.readFile(outputName);
  const uint8 = data as Uint8Array;
  const blob = new Blob([new Uint8Array(uint8)], {
    type: getMimeType(outputExt),
  });
  const baseName = options.inputFile.name.replace(/\.[^.]+$/, "");

  // Cleanup
  await ffmpeg.deleteFile(inputName);
  await ffmpeg.deleteFile(outputName);

  return {
    blob,
    filename: `${baseName}.${outputExt}`,
    size: blob.size,
    duration: Date.now() - startTime,
  };
}

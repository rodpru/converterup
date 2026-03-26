"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

let ffmpeg: FFmpeg | null = null;
let loading = false;
let loaded = false;

export async function loadFFmpeg(
  onProgress?: (progress: number) => void,
): Promise<FFmpeg> {
  if (loaded && ffmpeg) return ffmpeg;
  if (loading) {
    // Wait for existing load to finish
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (loaded && ffmpeg) {
          clearInterval(interval);
          resolve(ffmpeg);
        }
      }, 100);
    });
  }

  loading = true;
  ffmpeg = new FFmpeg();

  ffmpeg.on("log", ({ message }) => {
    console.debug("[FFmpeg]", message);
  });

  if (onProgress) {
    ffmpeg.on("progress", ({ progress }) => {
      onProgress(Math.round(progress * 100));
    });
  }

  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });

  loaded = true;
  loading = false;
  return ffmpeg;
}

export function isFFmpegLoaded(): boolean {
  return loaded;
}

export function getFFmpeg(): FFmpeg | null {
  return ffmpeg;
}

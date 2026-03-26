"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

let ffmpeg: FFmpeg | null = null;
let loading = false;
let loaded = false;
let currentProgressHandler:
  | (({ progress }: { progress: number }) => void)
  | null = null;

function registerProgressHandler(
  ff: FFmpeg,
  onProgress: (progress: number) => void,
) {
  if (currentProgressHandler) {
    ff.off("progress", currentProgressHandler);
  }
  currentProgressHandler = ({ progress }) => {
    onProgress(Math.round(progress * 100));
  };
  ff.on("progress", currentProgressHandler);
}

export async function loadFFmpeg(
  onProgress?: (progress: number) => void,
): Promise<FFmpeg> {
  if (loaded && ffmpeg) {
    // Re-register progress callback for subsequent conversions
    if (onProgress) {
      registerProgressHandler(ffmpeg, onProgress);
    }
    return ffmpeg;
  }
  if (loading) {
    // Wait for existing load to finish
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (loaded && ffmpeg) {
          clearInterval(interval);
          if (onProgress) {
            registerProgressHandler(ffmpeg, onProgress);
          }
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
    registerProgressHandler(ffmpeg, onProgress);
  }

  const useMultiThread = typeof SharedArrayBuffer !== "undefined";
  console.log(
    "[FFmpeg] SharedArrayBuffer:",
    useMultiThread ? "available (multi-thread)" : "unavailable (single-thread)",
  );
  const cdn = "https://cdn.jsdelivr.net/npm";
  const pkg = useMultiThread ? "@ffmpeg/core-mt@0.12.6" : "@ffmpeg/core@0.12.6";
  const baseURL = `${cdn}/${pkg}/dist/umd`;

  const loadConfig: Parameters<typeof ffmpeg.load>[0] = {
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  };

  if (useMultiThread) {
    loadConfig.workerURL = await toBlobURL(
      `${baseURL}/ffmpeg-core.worker.js`,
      "text/javascript",
    );
  }

  await ffmpeg.load(loadConfig);

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

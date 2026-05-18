"use client";

declare global {
  interface Window {
    libheif?: (() => unknown | Promise<unknown>) | unknown;
  }
}

interface HeifImage {
  get_width(): number;
  get_height(): number;
  display(
    imageData: ImageData,
    cb: (display: ImageData | null) => void,
  ): void;
  free?: () => void;
}

interface HeifDecoderClass {
  new (): { decode(buffer: ArrayBuffer): HeifImage[] };
}

interface LibheifModule {
  HeifDecoder: HeifDecoderClass;
}

const CDN_URL =
  "https://cdn.jsdelivr.net/npm/libheif-js@1.19.8/libheif-wasm/libheif.js";

let libheifModule: LibheifModule | null = null;
let loadingPromise: Promise<LibheifModule> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.dataset.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

export async function loadHeifDecoder(): Promise<LibheifModule> {
  if (libheifModule) return libheifModule;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    await loadScript(CDN_URL);
    const factory = window.libheif;
    if (!factory) {
      throw new Error("libheif global not available after script load");
    }
    const maybeModule =
      typeof factory === "function"
        ? await (factory as () => unknown | Promise<unknown>)()
        : factory;
    const module = maybeModule as LibheifModule;
    if (!module?.HeifDecoder) {
      throw new Error("libheif module missing HeifDecoder constructor");
    }
    libheifModule = module;
    return module;
  })();

  return loadingPromise;
}

export function isHeicFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    file.type === "image/heic-sequence" ||
    file.type === "image/heif-sequence" ||
    name.endsWith(".heic") ||
    name.endsWith(".heif")
  );
}

export async function decodeHeic(
  file: File,
): Promise<{ canvas: HTMLCanvasElement; width: number; height: number }> {
  const module = await loadHeifDecoder();
  const buffer = await file.arrayBuffer();
  const decoder = new module.HeifDecoder();
  const images = decoder.decode(buffer);
  if (!images || images.length === 0) {
    throw new Error("No images found in HEIC file");
  }

  const img = images[0];
  const width = img.get_width();
  const height = img.get_height();
  const imageData = new ImageData(width, height);

  await new Promise<void>((resolve, reject) => {
    img.display(imageData, (display) => {
      if (!display) {
        reject(new Error("Failed to render HEIC frame"));
      } else {
        resolve();
      }
    });
  });

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context not available");
  ctx.putImageData(imageData, 0, 0);

  if (typeof img.free === "function") img.free();

  return { canvas, width, height };
}

export type HeicOutputFormat = "image/jpeg" | "image/png" | "image/webp";

export async function convertHeicToBlob(
  file: File,
  outputFormat: HeicOutputFormat = "image/jpeg",
  quality = 0.92,
): Promise<{ blob: Blob; width: number; height: number }> {
  const { canvas, width, height } = await decodeHeic(file);
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, outputFormat, quality);
  });
  if (!blob) throw new Error("Failed to encode output blob");
  return { blob, width, height };
}

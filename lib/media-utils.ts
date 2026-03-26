export type FileCategory = "image" | "video" | "unknown";

export function getFileCategory(file: File): FileCategory {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";

  // Fallback to extension
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const imageExts = ["png", "jpg", "jpeg", "webp", "avif", "gif", "svg", "tiff", "bmp"];
  const videoExts = ["mp4", "mkv", "avi", "webm", "mov"];

  if (imageExts.includes(ext)) return "image";
  if (videoExts.includes(ext)) return "video";
  return "unknown";
}

export function getAvailableOutputFormats(inputFormat: string): string[] {
  const imageFormats = ["png", "jpg", "webp", "avif", "gif", "tiff", "bmp"];
  const videoFormats = ["mp4", "webm", "mkv", "avi", "mov"];

  const ext = inputFormat.toLowerCase().replace("jpeg", "jpg");

  if (imageFormats.includes(ext)) {
    return imageFormats.filter((f) => f !== ext);
  }
  if (videoFormats.includes(ext)) {
    return videoFormats.filter((f) => f !== ext);
  }
  return [];
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / 1024 ** i;
  return `${size.toFixed(i === 0 ? 0 : 2)} ${units[i]}`;
}

export function createPreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function getAcceptedFileTypes(): Record<string, string[]> {
  return {
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/webp": [".webp"],
    "image/avif": [".avif"],
    "image/gif": [".gif"],
    "image/tiff": [".tiff"],
    "image/bmp": [".bmp"],
    "video/mp4": [".mp4"],
    "video/webm": [".webm"],
    "video/x-matroska": [".mkv"],
    "video/x-msvideo": [".avi"],
    "video/quicktime": [".mov"],
  };
}

export function getFileExtension(file: File): string {
  return file.name.split(".").pop()?.toLowerCase() ?? "";
}

export function getFormatColor(category: FileCategory): string {
  if (category === "image") return "primary";
  if (category === "video") return "accent";
  return "muted-foreground";
}

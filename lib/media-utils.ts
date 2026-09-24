export type FileCategory = "image" | "video" | "unknown";

export function getFileCategory(file: File): FileCategory {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";

  // Fallback to extension
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const imageExts = [
    "png",
    "jpg",
    "jpeg",
    "jfif",
    "webp",
    "avif",
    "gif",
    "svg",
    "tiff",
    "tif",
    "bmp",
  ];
  const videoExts = [
    "mp4",
    "mkv",
    "avi",
    "webm",
    "mov",
    "flv",
    "3gp",
    "ts",
    "m4v",
    "wmv",
  ];

  if (imageExts.includes(ext)) return "image";
  if (videoExts.includes(ext)) return "video";
  return "unknown";
}

export function getAvailableOutputFormats(inputFormat: string): string[] {
  const imageFormats = ["png", "jpg", "webp", "avif", "gif", "tiff", "bmp"];
  const videoFormats = ["mp4", "webm", "mkv", "avi", "mov"];
  const videoInputs = [...videoFormats, "flv", "3gp", "ts", "m4v", "wmv"];

  const ext = normalizeExtension(inputFormat);
  // JFIF is JPEG data, but users still want a plain .jpg out of it.
  const exclude = inputFormat.toLowerCase() === "jfif" ? "" : ext;

  // Animated GIFs can also become a (much smaller) video.
  if (ext === "gif") {
    return [...imageFormats.filter((f) => f !== ext), "mp4", "webm"];
  }
  if (imageFormats.includes(ext)) {
    return imageFormats.filter((f) => f !== exclude);
  }
  if (videoInputs.includes(ext)) {
    return videoFormats.filter((f) => f !== ext);
  }
  return [];
}

/** Map extension aliases (jpeg, jfif, tif) to the canonical format name. */
export function normalizeExtension(ext: string): string {
  const lower = ext.toLowerCase();
  if (lower === "jpeg" || lower === "jfif") return "jpg";
  if (lower === "tif") return "tiff";
  return lower;
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
    "image/jpeg": [".jpg", ".jpeg", ".jfif"],
    "image/webp": [".webp"],
    "image/avif": [".avif"],
    "image/gif": [".gif"],
    "image/tiff": [".tiff", ".tif"],
    "image/bmp": [".bmp"],
    "video/mp4": [".mp4"],
    "video/webm": [".webm"],
    "video/x-matroska": [".mkv"],
    "video/x-msvideo": [".avi"],
    "video/quicktime": [".mov"],
    "video/x-flv": [".flv"],
    "video/3gpp": [".3gp"],
    "video/mp2t": [".ts"],
    "video/x-m4v": [".m4v"],
    "video/x-ms-wmv": [".wmv"],
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

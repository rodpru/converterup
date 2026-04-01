import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSiteUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  return "http://localhost:3000";
}

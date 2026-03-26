"use client";

import { useState, useEffect } from "react";

/**
 * Detects if the current device is a mobile device
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

/**
 * Custom hook for media queries
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Create listener
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [query]);

  return matches;
}

/**
 * Hook to detect if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Hook to detect device orientation
 */
export function useOrientation(): "portrait" | "landscape" {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    typeof window !== "undefined" && window.innerWidth > window.innerHeight
      ? "landscape"
      : "portrait",
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(
        window.innerWidth > window.innerHeight ? "landscape" : "portrait",
      );
    };

    window.addEventListener("resize", handleOrientationChange);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return orientation;
}

/**
 * Share file using native share API
 */
export async function shareFile(file: File): Promise<boolean> {
  if (!navigator.share) {
    console.warn("Web Share API not supported");
    return false;
  }

  try {
    await navigator.share({
      title: file.name,
      text: `Sharing ${file.name}`,
      files: [file],
    });
    return true;
  } catch (error) {
    if ((error as Error).name !== "AbortError") {
      console.error("Error sharing file:", error);
    }
    return false;
  }
}

/**
 * Download file with mobile-optimized UX
 */
export function downloadFile(file: File, filename?: string): void {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || file.name;

  // Append to body for iOS compatibility
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Trigger haptic feedback on supported devices
 */
export function triggerHapticFeedback(
  type: "light" | "medium" | "heavy" = "light",
): void {
  if (!("vibrate" in navigator)) return;

  const patterns = {
    light: 10,
    medium: 20,
    heavy: 30,
  };

  navigator.vibrate(patterns[type]);
}

/**
 * Check if device supports native share
 */
export function canShare(): boolean {
  return typeof navigator !== "undefined" && "share" in navigator;
}

/**
 * Hook to detect if device is in standalone mode (PWA)
 */
export function useIsStandalone(): boolean {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkStandalone = () => {
      // @ts-ignore - standalone is not in TypeScript types
      const standalone = window.navigator.standalone;
      const matchMedia = window.matchMedia(
        "(display-mode: standalone)",
      ).matches;
      setIsStandalone(standalone || matchMedia);
    };

    checkStandalone();
  }, []);

  return isStandalone;
}

/**
 * Hook for mobile-specific behavior
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return isMobile;
}

"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * True when the device supports real hover (mouse / trackpad).
 * Prefer this over viewport breakpoints for tertiary hover effects.
 */
export function useCanHover(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

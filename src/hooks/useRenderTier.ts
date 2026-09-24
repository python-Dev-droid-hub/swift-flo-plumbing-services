"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * Device render tier for 3D / scroll complexity.
 * high   ≥1024 — cinematic
 * medium 768–1023 — reduced
 * low    <768 — mobile performance + conversion
 */
export type RenderTier = "high" | "medium" | "low";

export function useRenderTier(): RenderTier {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  if (isDesktop) return "high";
  if (isTablet) return "medium";
  return "low";
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

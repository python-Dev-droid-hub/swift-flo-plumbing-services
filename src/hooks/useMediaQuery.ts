"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tracks a CSS media query match. Defaults to `false` on the server
 * to avoid hydration mismatches.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Desktop cinematic breakpoint — aligns with Tailwind `lg` */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}

/**
 * Reduced-motion helpers shared by Lenis, GSAP, and UI.
 */

export function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function onPrefersReducedMotionChange(
  callback: (reduced: boolean) => void,
): () => void {
  if (typeof window === "undefined") return () => undefined;

  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = (event: MediaQueryListEvent) => callback(event.matches);

  callback(media.matches);
  media.addEventListener("change", handler);
  return () => media.removeEventListener("change", handler);
}

"use client";

/**
 * Backward-compatible wrappers around the unified motion presets.
 * Prefer FadeUp / SectionReveal / StaggerReveal in new code.
 */

export {
  FadeUp,
  FadeIn,
  ScaleIn,
  SectionReveal,
} from "./FadeUp";
export { StaggerReveal, StaggerItem } from "./StaggerReveal";
export { Parallax } from "./Parallax";
export { MagneticButton } from "./MagneticButton";

// Legacy aliases
export { FadeUp as Reveal } from "./FadeUp";
export { StaggerItem as RevealChild } from "./StaggerReveal";

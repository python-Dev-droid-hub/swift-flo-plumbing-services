import type { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DURATIONS,
  EASINGS,
  PRESETS,
  SCROLL,
  STAGGERS,
  type MotionPreset,
  type PresetName,
} from "./easings";
import { getPrefersReducedMotion } from "./reduced-motion";

export type RevealVars = {
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
};

export type RevealTweenFrom = {
  y: number;
  x: number;
  opacity: number;
  scale?: number;
  duration: number;
  delay: number;
  stagger: number;
  ease: string;
};

function mergePreset(
  name: PresetName,
  overrides: RevealVars = {},
): MotionPreset {
  return { ...PRESETS[name], ...overrides };
}

/**
 * Build a from-vars object for a named preset.
 * Returns null when reduced motion is preferred.
 */
export function getPresetFrom(
  name: PresetName,
  overrides: RevealVars = {},
): RevealTweenFrom | null {
  if (getPrefersReducedMotion()) return null;

  const preset = mergePreset(name, overrides);

  return {
    y: preset.y ?? 0,
    x: preset.x ?? 0,
    opacity: preset.opacity ?? 0,
    scale: preset.scale,
    duration: preset.duration ?? DURATIONS.base,
    delay: overrides.delay ?? preset.delay ?? 0,
    stagger: overrides.stagger ?? preset.stagger ?? STAGGERS.base,
    ease: preset.ease ?? EASINGS.outExpo,
  };
}

/** @deprecated Prefer getPresetFrom("fadeUp" | "sectionReveal") */
export function getRevealFrom(vars: RevealVars = {}): RevealTweenFrom | null {
  return getPresetFrom("fadeUp", vars);
}

export type ScrollRevealConfig = {
  trigger: Element | string;
  start?: string;
  end?: string;
  markers?: boolean;
  once?: boolean;
};

export function getScrollRevealDefaults(
  config: ScrollRevealConfig,
): ScrollTrigger.Vars {
  return {
    trigger: config.trigger,
    start: config.start ?? SCROLL.revealStart,
    end: config.end ?? SCROLL.revealEnd,
    markers: config.markers ?? false,
    once: config.once ?? true,
    toggleActions: "play none none none",
  };
}

/** Shared scrub config for secondary water-flow metaphors */
export function getFlowScrubDefaults(config: {
  trigger: Element | string;
  start?: string;
  end?: string;
}): ScrollTrigger.Vars {
  return {
    trigger: config.trigger,
    start: config.start ?? "top 75%",
    end: config.end ?? "center 40%",
    scrub: SCROLL.scrub,
    invalidateOnRefresh: true,
  };
}

/** Desktop pin + scrub timeline defaults (skip on small screens via matchMedia) */
export function getPinnedScrubDefaults(config: {
  trigger: Element | string;
  start?: string;
  end?: string;
  pinSpacing?: boolean;
}): ScrollTrigger.Vars {
  return {
    trigger: config.trigger,
    start: config.start ?? "top top",
    end: config.end ?? "+=70%",
    pin: true,
    pinSpacing: config.pinSpacing ?? true,
    scrub: SCROLL.scrub,
    invalidateOnRefresh: true,
  };
}

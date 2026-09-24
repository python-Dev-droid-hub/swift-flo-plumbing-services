/**
 * Swift Flo motion language — WATER FLOW
 *
 * Hierarchy:
 * PRIMARY   — Hero scroll-scrub (camera / water through pipes)
 * SECONDARY — Section entrances + section-owned flow metaphors
 * TERTIARY  — Hover / focus micro-interactions (prefer CSS)
 *
 * Do not animate everything. Prefer intentional, premium pacing.
 */

export const EASINGS = {
  /** Section reveals, editorial entrances — soft cinematic settle */
  outExpo: "power3.out",
  /** UI chrome, menus, accordion */
  outQuart: "power2.out",
  /** Scrubbed path draws, morphs */
  inOutCubic: "power2.inOut",
  /** Opacity-only / micro fades */
  outSine: "sine.out",
  /** Magnetic / hover return */
  outBackSoft: "back.out(1.1)",
} as const;

/** Seconds — keep lean to avoid flashy pacing */
export const DURATIONS = {
  instant: 0,
  fast: 0.22,
  base: 0.55,
  slow: 0.75,
  cinematic: 1.05,
} as const;

export const STAGGERS = {
  tight: 0.05,
  base: 0.08,
  loose: 0.12,
} as const;

/** CSS easing mirrors for tertiary transitions */
export const CSS_EASING = {
  outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  outQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
  outSine: "cubic-bezier(0.33, 1, 0.68, 1)",
} as const;

export const SCROLL = {
  /** Secondary section reveals */
  revealStart: "top 82%",
  revealEnd: "bottom 18%",
  /** Light scrub for flow metaphors (not hero) */
  scrub: 0.55,
} as const;

export type MotionPreset = {
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  duration: number;
  delay?: number;
  ease: string;
  stagger?: number;
};

/** Named presets — use these instead of ad-hoc tween values */
export const PRESETS = {
  fadeUp: {
    y: 28,
    opacity: 0,
    duration: DURATIONS.base,
    ease: EASINGS.outExpo,
  },
  fadeIn: {
    opacity: 0,
    duration: DURATIONS.fast + 0.18,
    ease: EASINGS.outSine,
  },
  scaleIn: {
    scale: 0.94,
    opacity: 0,
    y: 12,
    duration: DURATIONS.slow,
    ease: EASINGS.outExpo,
  },
  staggerReveal: {
    y: 24,
    opacity: 0,
    duration: DURATIONS.base,
    ease: EASINGS.outExpo,
    stagger: STAGGERS.base,
  },
  sectionReveal: {
    y: 32,
    opacity: 0,
    duration: DURATIONS.slow,
    ease: EASINGS.outExpo,
  },
  parallax: {
    y: 40,
    duration: DURATIONS.cinematic,
    ease: EASINGS.outSine,
  },
} as const satisfies Record<string, MotionPreset>;

export type PresetName = keyof typeof PRESETS;
export type EasingKey = keyof typeof EASINGS;
export type DurationKey = keyof typeof DURATIONS;

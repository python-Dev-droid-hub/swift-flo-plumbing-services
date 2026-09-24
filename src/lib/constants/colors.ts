/**
 * Swift Flo brand colors — extracted from the official logo.
 * Use these in JS/TS (Three.js materials, charts). Prefer CSS tokens in UI.
 */
export const COLORS = {
  /** Deep navy — logo ring, wave base, outlines */
  brandPrimary: "#1A1A3F",
  /** Bright cyan — water drop, wave crest, energy */
  brandSecondary: "#4ED9FF",
  /** Soft sky — water highlights / softer accents */
  brandAccent: "#BBEFFF",
  /** Pure white — faucet body, wordmark fill */
  white: "#FFFFFF",

  /** Page / scene dark background (navy family) */
  bgDark: "#12122E",
  /** Page light background — close to the droplet stills */
  bgLight: "#F3F5F6",

  /** Raised light surface */
  surface: "#FFFFFF",
  /** Muted light surface */
  surfaceMuted: "#E5F3F8",
  /** Elevated dark surface */
  surfaceDark: "#1A1A3F",
  surfaceDarkElevated: "#24244F",

  /** Body text on light */
  textPrimary: "#12122E",
  textSecondary: "#3D4560",
  textMuted: "#6B738C",
  textInverse: "#FFFFFF",
  /**
   * Accessible cyan-derived link/accent text on light surfaces.
   * Bright logo cyan fails WCAG as small text on white — use this instead.
   */
  textLink: "#0C7A9E",

  /** Chrome / faucet metal in 3D (white → cool tint) */
  chrome: "#F2F8FB",
  chromeShadow: "#2A2A55",
} as const;

export const GRADIENTS = {
  /** Cyan → navy — logo water depth */
  water: `linear-gradient(135deg, ${COLORS.brandSecondary} 0%, ${COLORS.brandPrimary} 100%)`,
  /** Soft sky → cyan */
  waterSoft: `linear-gradient(160deg, ${COLORS.brandAccent} 0%, ${COLORS.brandSecondary} 55%, ${COLORS.brandPrimary} 100%)`,
  /** Hero fade into navy */
  heroFade: `linear-gradient(180deg, transparent 0%, ${COLORS.bgDark} 100%)`,
  /** Primary CTA fill */
  cta: `linear-gradient(135deg, ${COLORS.brandSecondary} 0%, #2BB8E8 100%)`,
} as const;

export const ASSETS = {
  logo: "/images/swift-flo-logo.png",
  logoMark: "/images/swift-flo-logo-mark.png",
  logoHero: "/images/swift-flo-logo-hero.png",
  logoRaster: "/images/swift-flo-logo.jpg",
} as const;

export type BrandColor = keyof typeof COLORS;

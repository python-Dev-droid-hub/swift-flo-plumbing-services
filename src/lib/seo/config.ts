/**
 * SEO configuration — no invented phone, address, ratings, or service area.
 * Set NEXT_PUBLIC_SITE_URL in production for absolute canonical / OG URLs.
 */

import { SITE } from "@/lib/constants/site";

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export const SEO = {
  /** Primary document title */
  title: `${SITE.name} | Professional Plumbing`,
  /** ≤ ~155–160 characters; no location claims */
  description:
    "Swift Flo Plumbing Services provides professional plumbing for homes and businesses — emergency support, leak detection, drain cleaning, pipe repair, and kitchen & bathroom plumbing. Request service online.",
  /** Business category for structured data / keywords */
  category: "Plumbing Services",
  keywords: [
    "Swift Flo Plumbing Services",
    "plumber",
    "plumbing services",
    "emergency plumbing",
    "leak detection",
    "drain cleaning",
    "pipe repair",
    "bathroom plumbing",
    "kitchen plumbing",
  ],
  ogImagePath: SITE.logoHero,
  ogImageAlt: `${SITE.name} logo`,
  locale: "en_US",
  twitterCard: "summary" as const,
} as const;

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

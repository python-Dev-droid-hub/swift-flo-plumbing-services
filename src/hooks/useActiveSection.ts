"use client";

import { useEffect, useState } from "react";
import { PRIMARY_NAV } from "@/lib/constants";

type SectionLink = {
  id: string;
  href: string;
};

const OBSERVED: SectionLink[] = PRIMARY_NAV.map((item) => ({
  href: item.href,
  id: item.href.replace("#", "") || "hero",
}));

/**
 * Tracks which primary nav section is in view.
 * Uses IntersectionObserver only — no scroll hijacking.
 */
export function useActiveSection(): string {
  const [activeHref, setActiveHref] = useState("#hero");

  useEffect(() => {
    const elements = OBSERVED.map(({ id, href }) => {
      const el = document.getElementById(id);
      return el ? { el, href } : null;
    }).filter(Boolean) as { el: HTMLElement; href: string }[];

    if (elements.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const match = elements.find((item) => item.el === entry.target);
          if (!match) return;
          visibility.set(
            match.href,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        let bestHref = "#hero";
        let bestRatio = 0;
        visibility.forEach((ratio, href) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestHref = href;
          }
        });

        // Near page top — prefer Home
        if (window.scrollY < 80) {
          setActiveHref("#hero");
          return;
        }

        if (bestRatio > 0) {
          setActiveHref(bestHref);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75],
      },
    );

    elements.forEach(({ el }) => observer.observe(el));

    const onHash = () => {
      const hash = window.location.hash || "#hero";
      if (OBSERVED.some((item) => item.href === hash)) {
        setActiveHref(hash);
      }
    };
    window.addEventListener("hashchange", onHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return activeHref;
}

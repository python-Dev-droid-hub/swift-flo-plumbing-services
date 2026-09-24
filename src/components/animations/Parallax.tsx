"use client";

import { useRef, type ReactNode } from "react";
import { PRESETS, SCROLL } from "@/lib/animations";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Max translate in px across the scrub range */
  distance?: number;
  /** Scrub smoothness */
  scrub?: number | boolean;
};

/**
 * Secondary — subtle depth drift. Keep distance small (12–28px).
 * Disabled under reduced motion and on mobile (perf / less motion).
 */
export function Parallax({
  children,
  className,
  distance = 18,
  scrub = SCROLL.scrub,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const enabled = !reduced && !isMobile;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !enabled) return;

      gsap.fromTo(
        el,
        { y: distance * 0.35 },
        {
          y: -distance,
          ease: PRESETS.parallax.ease,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub,
          },
        },
      );
    },
    { scope: ref, dependencies: [enabled, distance, scrub], revertOnUpdate: true },
  );

  return (
    <div
      ref={ref}
      className={cn(enabled && "will-change-transform", className)}
    >
      {children}
    </div>
  );
}

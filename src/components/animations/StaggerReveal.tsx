"use client";

import { useRef, type ReactNode } from "react";
import { getPresetFrom, getScrollRevealDefaults } from "@/lib/animations";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  /** Attribute selector for staggered children — default data-reveal-child */
  childSelector?: string;
};

/**
 * Secondary — staggered children reveal (service grids, trust chips).
 */
export function StaggerReveal({
  children,
  className,
  delay = 0,
  once = true,
  childSelector = "[data-reveal-child]",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const targets = el.querySelectorAll<HTMLElement>(childSelector);
      if (targets.length === 0) return;

      const from = getPresetFrom("staggerReveal", { delay });
      if (!from) return;

      const { stagger, ...tweenFrom } = from;

      gsap.from(targets, {
        ...tweenFrom,
        stagger,
        scrollTrigger: getScrollRevealDefaults({ trigger: el, once }),
      });
    },
    { scope: ref, dependencies: [reduced, delay, once, childSelector], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  /** Use `li` when nesting inside a list */
  as?: "div" | "li";
};

export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  if (as === "li") {
    return (
      <li data-reveal-child className={className}>
        {children}
      </li>
    );
  }

  return (
    <div data-reveal-child className={className}>
      {children}
    </div>
  );
}

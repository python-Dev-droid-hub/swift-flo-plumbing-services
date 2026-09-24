"use client";

import { useRef, type ReactNode } from "react";
import {
  getPresetFrom,
  getScrollRevealDefaults,
  type PresetName,
} from "@/lib/animations";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

type MotionBaseProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  /** Skip ScrollTrigger — play on mount (hero / above-fold) */
  immediate?: boolean;
};

function useMotionReveal(
  preset: PresetName,
  {
    delay = 0,
    once = true,
    immediate = false,
    y,
  }: {
    delay?: number;
    once?: boolean;
    immediate?: boolean;
    y?: number;
  },
) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const from = getPresetFrom(preset, { delay, y });
      if (!from) return;

      const tweenFrom: Record<string, unknown> = {
        y: from.y,
        x: from.x,
        opacity: from.opacity,
        duration: from.duration,
        delay: from.delay,
        ease: from.ease,
      };
      if (from.scale !== undefined) tweenFrom.scale = from.scale;

      gsap.from(el, {
        ...tweenFrom,
        ...(immediate
          ? {}
          : {
              scrollTrigger: getScrollRevealDefaults({
                trigger: el,
                once,
              }),
            }),
      });
    },
    {
      scope: ref,
      dependencies: [reduced, delay, once, immediate, preset, y],
      revertOnUpdate: true,
    },
  );

  return ref;
}

/** Secondary — rise with soft fade (default section copy) */
export function FadeUp({
  children,
  className,
  delay,
  once,
  immediate,
}: MotionBaseProps) {
  const ref = useMotionReveal("fadeUp", { delay, once, immediate });
  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

/** Secondary — opacity only (restrained sections like FAQ) */
export function FadeIn({
  children,
  className,
  delay,
  once,
  immediate,
}: MotionBaseProps) {
  const ref = useMotionReveal("fadeIn", { delay, once, immediate });
  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

/** Secondary — soft scale into place (contact panel / featured media) */
export function ScaleIn({
  children,
  className,
  delay,
  once,
  immediate,
}: MotionBaseProps) {
  const ref = useMotionReveal("scaleIn", { delay, once, immediate });
  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

/** Secondary — standard section block entrance */
export function SectionReveal({
  children,
  className,
  delay,
  once,
}: MotionBaseProps) {
  const ref = useMotionReveal("sectionReveal", { delay, once });
  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

"use client";

import {
  useCallback,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { CSS_EASING } from "@/lib/animations";
import { useCanHover, usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  /** Max pull in px — keep subtle (4–8) */
  strength?: number;
};

/**
 * Tertiary — soft magnetic pull on primary CTAs.
 * CSS-driven; disabled when hover is unavailable or reduced motion.
 */
export function MagneticButton({
  children,
  className,
  strength = 5,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const canHover = useCanHover();
  const enabled = !reduced && canHover;

  const onMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!enabled) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const nx = (x / (rect.width / 2)) * strength;
      const ny = (y / (rect.height / 2)) * strength;
      el.style.transform = `translate3d(${nx.toFixed(2)}px, ${ny.toFixed(2)}px, 0)`;
    },
    [enabled, strength],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0, 0, 0)";
  }, []);

  return (
    <div
      ref={ref}
      className={cn("inline-flex will-change-transform", className)}
      onMouseMove={enabled ? onMove : undefined}
      onMouseLeave={enabled ? onLeave : undefined}
      style={{
        transition: enabled
          ? `transform 180ms ${CSS_EASING.outExpo}`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}

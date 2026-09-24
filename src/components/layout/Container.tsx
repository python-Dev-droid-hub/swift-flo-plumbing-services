import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const widthMap = {
  narrow: "max-w-[var(--container-narrow)]",
  default: "max-w-[var(--container-default)]",
  wide: "max-w-[var(--container-wide)]",
  full: "max-w-none",
} as const;

type ContainerWidth = keyof typeof widthMap;

type ContainerProps = {
  as?: "div" | "section" | "main" | "nav" | "header" | "footer" | "article";
  width?: ContainerWidth;
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-label"?: string;
};

/**
 * Horizontal page rhythm. Width tokens live in the design system.
 */
export function Container({
  as: Component = "div",
  width = "default",
  children,
  className,
  id,
  "aria-label": ariaLabel,
}: ContainerProps) {
  return (
    <Component
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8",
        widthMap[width],
        className,
      )}
    >
      {children}
    </Component>
  );
}

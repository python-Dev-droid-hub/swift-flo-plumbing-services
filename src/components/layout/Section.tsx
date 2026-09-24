import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const paddingMap = {
  none: "",
  sm: "py-10 sm:py-14 md:py-16",
  md: "py-12 sm:py-16 md:py-20",
  lg: "py-14 sm:py-20 md:py-24",
} as const;

type SectionPadding = keyof typeof paddingMap;

type SectionProps = {
  as?: "section" | "div" | "article";
  id?: string;
  padding?: SectionPadding;
  children: ReactNode;
  className?: string;
  /** Visually hidden / landmark label */
  ariaLabel?: string;
  ariaLabelledBy?: string;
};

export function Section({
  as: Component = "section",
  id,
  padding = "md",
  children,
  className,
  ariaLabel,
  ariaLabelledBy,
}: SectionProps) {
  return (
    <Component
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn("relative w-full", paddingMap[padding], className)}
    >
      {children}
    </Component>
  );
}

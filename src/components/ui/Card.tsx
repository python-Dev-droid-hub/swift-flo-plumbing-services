import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "muted" | "dark" | "outline";

const variantStyles: Record<CardVariant, string> = {
  default: "bg-surface border-border shadow-sm",
  muted: "bg-surface-muted border-transparent",
  dark: "bg-surface-dark text-text-inverse border-transparent",
  outline: "bg-transparent border-border-strong",
};

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

/**
 * Interactive / content container. Prefer for forms, FAQs, service picks —
 * not decorative chrome on marketing heroes.
 */
export function Card({
  children,
  variant = "default",
  padding = "md",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border",
        variantStyles[variant],
        paddingStyles[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

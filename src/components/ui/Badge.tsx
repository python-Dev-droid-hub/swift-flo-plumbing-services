import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "cyan" | "navy" | "outline" | "muted";

const variantStyles: Record<BadgeVariant, string> = {
  cyan: "bg-brand-secondary/20 text-text-link border-transparent",
  navy: "bg-brand-primary text-text-inverse border-transparent",
  outline: "bg-transparent text-brand-primary border-border-strong",
  muted: "bg-surface-muted text-text-secondary border-transparent",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

/**
 * Compact status / category label. Cyan is reserved for emphasis.
 */
export function Badge({
  children,
  variant = "cyan",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-medium tracking-wide",
        "text-xs uppercase",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

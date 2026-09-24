import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextSize = "sm" | "base" | "lg" | "xl";
type TextTone = "primary" | "secondary" | "muted" | "inverse" | "accent";
type TextTag = "p" | "span" | "div" | "li";

const sizeStyles: Record<TextSize, string> = {
  sm: "text-sm leading-[var(--leading-relaxed)]",
  base: "text-base leading-[var(--leading-relaxed)]",
  lg: "text-lg leading-[var(--leading-relaxed)]",
  xl: "text-xl leading-[var(--leading-relaxed)]",
};

const toneStyles: Record<TextTone, string> = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  muted: "text-text-muted",
  inverse: "text-text-inverse",
  accent: "text-text-link",
};

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: TextTag;
  size?: TextSize;
  tone?: TextTone;
  children: ReactNode;
};

export function Text({
  as: Component = "p",
  size = "base",
  tone = "secondary",
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        "font-sans font-normal text-pretty",
        sizeStyles[size],
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

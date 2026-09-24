import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type HeadingTone = "default" | "inverse";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingLevel;
  children: ReactNode;
  eyebrow?: string;
  balance?: boolean;
  tone?: HeadingTone;
};

const levelStyles: Record<HeadingLevel, string> = {
  h1: "font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[var(--leading-tight)]",
  h2: "font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[var(--leading-tight)]",
  h3: "font-display text-2xl sm:text-3xl font-semibold tracking-tight leading-[var(--leading-snug)]",
  h4: "font-display text-xl sm:text-2xl font-medium tracking-tight leading-[var(--leading-snug)]",
};

const toneStyles: Record<HeadingTone, string> = {
  default: "text-text-primary",
  inverse: "text-text-inverse",
};

const eyebrowTone: Record<HeadingTone, string> = {
  default: "text-text-link",
  inverse: "text-brand-secondary",
};

export function Heading({
  as: Tag = "h2",
  children,
  eyebrow,
  balance = true,
  tone = "default",
  className,
  ...props
}: HeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[var(--tracking-wider)]",
            eyebrowTone[tone],
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          levelStyles[Tag],
          toneStyles[tone],
          balance && "text-balance",
        )}
        {...props}
      >
        {children}
      </Tag>
    </div>
  );
}

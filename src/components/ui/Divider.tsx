import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type DividerProps = HTMLAttributes<HTMLHRElement> & {
  /** Visual weight */
  tone?: "subtle" | "strong" | "accent" | "inverse";
  orientation?: "horizontal" | "vertical";
};

const toneStyles = {
  subtle: "border-border",
  strong: "border-border-strong",
  accent: "border-border-accent",
  inverse: "border-border-inverse",
} as const;

/**
 * Structural rule — navy-tinted by default, cyan accent when emphasis is needed.
 */
export function Divider({
  tone = "subtle",
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  const isVertical = orientation === "vertical";

  return (
    <hr
      aria-orientation={orientation}
      className={cn(
        "border-0",
        isVertical
          ? "h-full w-px self-stretch border-l"
          : "h-px w-full border-t",
        toneStyles[tone],
        className,
      )}
      {...props}
    />
  );
}

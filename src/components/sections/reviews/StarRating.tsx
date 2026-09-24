import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  rating: number;
  max?: number;
  className?: string;
  size?: "sm" | "md";
};

/**
 * Accessible star rating display (not interactive).
 */
export function StarRating({
  rating,
  max = 5,
  className,
  size = "md",
}: StarRatingProps) {
  const clamped = Math.min(max, Math.max(0, Math.round(rating)));
  const iconClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      role="img"
      aria-label={`Rated ${clamped} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, index) => {
        const filled = index < clamped;
        return (
          <Star
            key={index}
            aria-hidden
            className={cn(
              iconClass,
              filled
                ? "fill-brand-secondary text-brand-secondary"
                : "fill-transparent text-border-strong",
            )}
          />
        );
      })}
    </div>
  );
}

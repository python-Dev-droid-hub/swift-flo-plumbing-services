import type { Review } from "@/lib/constants";
import { StarRating } from "@/components/sections/reviews/StarRating";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type ReviewCardProps = {
  review: Review;
  active?: boolean;
  onSelect?: () => void;
  className?: string;
};

/**
 * Compact testimonial card for the carousel track.
 */
export function ReviewCard({
  review,
  active = false,
  onSelect,
  className,
}: ReviewCardProps) {
  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col rounded-lg border bg-surface p-5 shadow-sm transition-[border-color,box-shadow,transform] duration-200 md:p-6",
        active
          ? "border-border-accent shadow-md"
          : "border-border hover:border-border-strong",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <StarRating rating={review.rating} size="sm" />
        {review.isPlaceholder ? (
          <Badge variant="muted" className="shrink-0 normal-case tracking-normal">
            Placeholder
          </Badge>
        ) : null}
      </div>

      <blockquote className="flex-1">
        <p className="text-sm leading-relaxed text-text-secondary md:text-[0.9375rem]">
          “{review.text}”
        </p>
      </blockquote>

      <footer className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-muted text-xs font-semibold tracking-wide text-text-link"
        >
          {review.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-text-primary">
            {review.name}
          </p>
          <p className="truncate text-xs text-text-muted">{review.service}</p>
        </div>
      </footer>

      {onSelect ? (
        <button
          type="button"
          onClick={onSelect}
          className={cn(
            "mt-4 self-start text-sm font-semibold transition-colors",
            active ? "text-brand-primary" : "text-text-link hover:text-brand-primary",
          )}
          aria-pressed={active}
          aria-label={`Show featured review from ${review.name}`}
        >
          {active ? "Featured" : "View"}
        </button>
      ) : null}
    </article>
  );
}

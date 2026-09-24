"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ReviewCard } from "@/components/sections/reviews/ReviewCard";
import { IconButton } from "@/components/ui/IconButton";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { REVIEWS, SECTION_IDS } from "@/lib/constants";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

/**
 * Review carousel. Three cards on desktop, one on small screens.
 */
export function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const headingId = useId();
  const carouselId = useId();

  const count = REVIEWS.length;
  const hasReviews = count > 0;
  const perView = isDesktop ? 3 : 1;
  const maxIndex = Math.max(0, count - perView);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(Math.min(maxIndex, Math.max(0, index)));
    },
    [maxIndex],
  );

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = section.querySelectorAll<HTMLElement>("[data-review-card]");
        if (!cards.length) return;

        gsap.from(cards, {
          autoAlpha: 0,
          y: 28,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 80%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [hasReviews] },
  );

  const onCarouselKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        goPrev();
        break;
      case "ArrowRight":
        event.preventDefault();
        goNext();
        break;
      case "Home":
        event.preventDefault();
        goTo(0);
        break;
      case "End":
        event.preventDefault();
        goTo(maxIndex);
        break;
      default:
        break;
    }
  };

  const pageCount = maxIndex + 1;

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.reviews}
      aria-labelledby={headingId}
      className="relative bg-surface py-20 sm:py-24 md:py-32"
    >
      <Container width="wide">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-text-link">
          Reviews
        </p>
        <SplitHeading
          id={headingId}
          className="max-w-3xl font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-balance text-text-primary"
        >
          What our customers say.
        </SplitHeading>

        {hasReviews ? (
          <div
            className="mt-12"
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer review carousel"
            id={carouselId}
            tabIndex={0}
            onKeyDown={onCarouselKeyDown}
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm text-text-muted" aria-live="polite">
                {activeIndex + 1} of {pageCount}
              </p>
              <div className="flex items-center gap-2">
                <IconButton
                  label="Previous reviews"
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                >
                  <ChevronLeft className="h-5 w-5" />
                </IconButton>
                <IconButton
                  label="Next reviews"
                  onClick={goNext}
                  disabled={activeIndex >= maxIndex}
                >
                  <ChevronRight className="h-5 w-5" />
                </IconButton>
              </div>
            </div>

            <div className="overflow-hidden">
              <ul
                className={cn(
                  "flex w-full",
                  !reducedMotion &&
                    "transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)]",
                )}
                style={{
                  transform: `translate3d(-${activeIndex * (100 / perView)}%, 0, 0)`,
                }}
              >
                {REVIEWS.map((review) => (
                  <li
                    key={review.id}
                    data-review-card
                    className="shrink-0 px-2"
                    style={{ width: `${100 / perView}%` }}
                  >
                    <ReviewCard review={review} className="h-full" />
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="mt-6 flex justify-center gap-2"
              role="group"
              aria-label="Choose review page"
            >
              {Array.from({ length: pageCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-current={index === activeIndex ? "true" : undefined}
                  aria-label={`Show reviews ${index + 1} of ${pageCount}`}
                  onClick={() => goTo(index)}
                  className="inline-flex h-11 min-w-11 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
                >
                  <span
                    className={cn(
                      "block h-2.5 rounded-full transition-[width,background-color] duration-300",
                      index === activeIndex
                        ? "w-8 bg-brand-secondary"
                        : "w-2.5 bg-border-strong",
                    )}
                    aria-hidden
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 max-w-2xl border-t border-border pt-8">
            <p className="font-display text-2xl font-medium italic leading-snug tracking-tight text-text-secondary sm:text-3xl">
              Customer feedback will appear here once verified reviews are
              published.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

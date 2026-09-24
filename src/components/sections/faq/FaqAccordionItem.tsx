"use client";

import { useId, useRef } from "react";
import { Plus } from "lucide-react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils";

type FaqAccordionItemProps = {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
};

/**
 * FAQ row. The panel opens with a grid-row transition.
 * The icon rotates with GSAP.
 */
export function FaqAccordionItem({
  index,
  question,
  answer,
  open,
  onToggle,
}: FaqAccordionItemProps) {
  const panelId = useId();
  const buttonId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const icon = iconRef.current;
      if (!icon) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(icon, { rotation: open ? 45 : 0 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(icon, {
          rotation: open ? 45 : 0,
          duration: 0.35,
          ease: "power3.out",
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [open] },
  );

  return (
    <div ref={rootRef} className="border-b border-border">
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            "flex w-full items-start gap-4 py-6 text-left md:gap-6 md:py-7",
            "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-light",
          )}
        >
          <span className="mt-1 font-display text-sm italic text-text-link">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex-1 font-display text-xl font-medium tracking-tight text-balance text-text-primary sm:text-2xl">
            {question}
          </span>
          <span
            ref={iconRef}
            aria-hidden
            className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center text-brand-primary"
          >
            <Plus className="h-5 w-5" strokeWidth={1.75} />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 [transition-timing-function:var(--ease-out-expo)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden" inert={open ? undefined : true}>
          <p className="max-w-3xl pb-6 pl-10 text-sm leading-relaxed text-text-secondary sm:pl-12 md:pb-7 md:text-base">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

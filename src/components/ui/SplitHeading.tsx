"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/animations/gsap";

type SplitHeadingProps = {
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Word-mask reveal. Plays once when the heading enters.
 * SplitText targets an inner span so React keeps a stable heading child.
 * Reduced motion leaves the heading as authored.
 */
export function SplitHeading({
  as: Tag = "h2",
  id,
  className,
  children,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const splitRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const target = splitRef.current;
      if (!target) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(target, {
          type: "words",
          mask: "words",
          autoSplit: true,
          aria: "auto",
          onSplit(self) {
            return gsap.from(self.words, {
              yPercent: 110,
              duration: 0.85,
              stagger: 0.045,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 82%",
                once: true,
              },
            });
          },
        });

        return () => {
          split.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      <span ref={splitRef} className="split-heading-target">
        {children}
      </span>
    </Tag>
  );
}

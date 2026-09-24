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
 * Reduced motion leaves the heading as authored.
 */
export function SplitHeading({
  as: Tag = "h2",
  id,
  className,
  children,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const heading = ref.current;
      if (!heading) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(heading, {
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
                trigger: heading,
                start: "top 82%",
                once: true,
              },
            });
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}

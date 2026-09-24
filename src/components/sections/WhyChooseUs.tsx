"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { SECTION_IDS, WHY_US_ADVANTAGES } from "@/lib/constants";
import { gsap, useGSAP } from "@/lib/animations/gsap";

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const items = section.querySelectorAll<HTMLElement>("[data-why-item]");
      const line = section.querySelector<HTMLElement>("[data-why-line]");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 55%",
                end: "bottom 70%",
                scrub: true,
              },
            },
          );
        }

        items.forEach((item) => {
          gsap.from(item, {
            autoAlpha: 0,
            y: 28,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.whyUs}
      aria-labelledby="why-us-heading"
      className="relative bg-surface-dark py-20 text-text-inverse sm:py-24 md:py-32"
    >
      <Container width="wide">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-brand-secondary">
              Why Swift Flo
            </p>
            <SplitHeading
              id="why-us-heading"
              className="font-display text-[clamp(2.4rem,5.5vw,4.25rem)] font-medium leading-[1.05] tracking-tight text-balance"
            >
              Work that holds after we leave.
            </SplitHeading>
          </div>

          <div className="relative">
            <div
              className="absolute bottom-2 left-[0.4rem] top-2 hidden w-px bg-white/10 sm:block"
              aria-hidden
            />
            <div
              data-why-line
              className="absolute bottom-2 left-[0.4rem] top-2 hidden w-px origin-top scale-y-0 bg-brand-secondary sm:block"
              aria-hidden
            />
            <ol className="flex flex-col gap-12 sm:pl-12">
              {WHY_US_ADVANTAGES.map((item) => (
                <li key={item.id} data-why-item>
                  <p className="font-display text-sm italic text-brand-secondary">
                    {item.number}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-brand-accent/80">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { PROCESS_STEPS, SECTION_IDS } from "@/lib/constants";
import { gsap, useGSAP } from "@/lib/animations/gsap";

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const track = section.querySelector<HTMLElement>("[data-process-track]");
      const panels = section.querySelectorAll<HTMLElement>("[data-process-step]");
      const bar = section.querySelector<HTMLElement>("[data-process-bar]");
      if (!track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(track, { x: () => -distance(), duration: 1 }, 0);

        if (bar) {
          tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
        }
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(panels, {
          autoAlpha: 0,
          y: 32,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.howWeWork}
      aria-labelledby="how-we-work-heading"
      className="relative overflow-hidden bg-bg-light"
    >
      <div className="relative flex min-h-[100svh] flex-col justify-center px-4 py-24 sm:px-6 lg:h-[100svh] lg:px-0 lg:py-0">
        <div className="pointer-events-none z-10 mb-10 max-w-xl px-0 lg:absolute lg:left-8 lg:top-28 lg:mb-0 xl:left-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-text-link">
            Plumbing process
          </p>
          <SplitHeading
            id="how-we-work-heading"
            className="pointer-events-auto font-display text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.05] tracking-tight text-balance text-text-primary"
          >
            How we handle your job.
          </SplitHeading>
        </div>

        <div className="overflow-hidden">
          <div
            data-process-track
            className="flex flex-col lg:h-[100svh] lg:w-max lg:flex-row"
          >
            {PROCESS_STEPS.map((step) => (
              <article
                key={step.id}
                data-process-step
                className="flex w-full shrink-0 flex-col justify-end border-t border-border py-10 lg:h-full lg:w-screen lg:justify-center lg:border-t-0 lg:px-16 lg:pb-28 lg:pt-40 xl:px-24"
              >
                <p className="font-display text-6xl font-medium italic leading-none text-brand-secondary sm:text-7xl lg:text-8xl">
                  {step.number}
                </p>
                <h3 className="mt-4 font-display text-4xl font-medium tracking-tight text-text-primary sm:text-5xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary md:text-lg">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-8 bottom-8 hidden h-px origin-left bg-border lg:block"
          aria-hidden
        >
          <div
            data-process-bar
            className="h-full w-full origin-left scale-x-0 bg-brand-secondary"
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { SECTION_IDS, SERVICES } from "@/lib/constants";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/animations/gsap";

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const cells = section.querySelectorAll<HTMLElement>("[data-service-row]");
      if (!cells.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(cells, { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch(cells, {
          start: "top 86%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              overwrite: true,
            });
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
      id={SECTION_IDS.services}
      aria-labelledby="services-heading"
      className="relative bg-bg-dark py-20 text-text-inverse sm:py-24 md:py-32"
    >
      <Container width="wide">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-brand-secondary">
          Services
        </p>
        <SplitHeading
          id="services-heading"
          className="max-w-3xl font-display text-[clamp(2.4rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-tight text-balance"
        >
          What we take care of.
        </SplitHeading>
        <p className="mt-5 max-w-xl text-base text-brand-accent/80 md:text-lg">
          Emergency calls, slow drains, and the everyday fixtures that keep a
          home or business running.
        </p>

        <ul className="mt-14 grid gap-x-10 gap-y-0 sm:gap-y-0 md:grid-cols-2 md:gap-x-12 md:gap-y-12 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-14">
          {SERVICES.map((service) => {
            const Icon = service.icon;

            return (
              <li
                key={service.id}
                data-service-row
                className="border-b border-white/10 last:border-b-0 md:border-b-0"
              >
                <a
                  href={service.href}
                  className="group flex flex-col gap-4 py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark md:py-0"
                >
                  <Icon
                    aria-hidden
                    className="size-7 shrink-0 text-brand-secondary transition-transform duration-300 ease-out group-hover:-translate-y-1 sm:size-8"
                    strokeWidth={1.5}
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-xl font-medium tracking-tight text-text-inverse transition-colors duration-300 group-hover:text-brand-secondary sm:text-2xl">
                      {service.title}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-brand-accent/75 md:text-base">
                      {service.description}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

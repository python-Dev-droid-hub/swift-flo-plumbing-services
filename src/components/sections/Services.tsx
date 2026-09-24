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

      const rows = section.querySelectorAll<HTMLElement>("[data-service-row]");
      if (!rows.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(rows, { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch(rows, {
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

        <ul className="mt-14 grid border-t border-white/15 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <li
              key={service.id}
              data-service-row
              className="border-b border-white/15 md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:pr-10 md:[&:nth-child(even)]:pl-10"
            >
              <a
                href={service.href}
                className="group flex gap-5 py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary sm:py-10"
              >
                <span className="font-display text-lg italic text-brand-secondary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-2xl font-medium tracking-tight text-text-inverse transition-colors group-hover:text-brand-secondary sm:text-3xl">
                    {service.title}
                  </span>
                  <span className="mt-2 block max-w-md text-sm leading-relaxed text-brand-accent/75 md:text-base">
                    {service.description}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

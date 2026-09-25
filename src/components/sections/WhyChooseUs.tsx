"use client";

import { useRef } from "react";
import Image from "next/image";
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

      const items = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-why-item]"),
      );
      if (!items.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(items, { autoAlpha: 0, y: 28 });
        items.forEach((item) => {
          gsap.to(item, {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              once: true,
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
      className="relative overflow-x-clip bg-surface-dark py-20 text-text-inverse sm:py-24 md:py-32"
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
            <p className="mt-5 max-w-sm text-base leading-relaxed text-brand-accent/80 md:text-lg">
              Clear communication, careful installs, and practical fixes —
              so the job stays solid long after we pack up and go.
            </p>
          </div>

          <ol className="grid gap-5">
            {WHY_US_ADVANTAGES.map((item) => (
              <li
                key={item.id}
                data-why-item
                className="group relative min-h-[240px] overflow-hidden rounded-lg sm:min-h-[280px]"
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{
                    objectPosition: item.image.position ?? "center center",
                  }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-bg-dark/95 via-bg-dark/70 to-bg-dark/30"
                  aria-hidden
                />
                <div className="relative z-10 flex h-full min-h-[240px] flex-col justify-end p-6 sm:min-h-[280px] sm:p-7">
                  <p className="font-display text-sm italic text-brand-secondary">
                    {item.number}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-accent/85 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

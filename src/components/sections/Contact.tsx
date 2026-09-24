"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { SECTION_IDS } from "@/lib/constants";
import { gsap, useGSAP } from "@/lib/animations/gsap";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const panels = section.querySelectorAll<HTMLElement>("[data-contact-panel]");
        if (!panels.length) return;

        gsap.from(panels, {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panels[0],
            start: "top 80%",
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
      id={SECTION_IDS.contact}
      aria-labelledby="contact-heading"
      className="relative bg-bg-dark py-20 text-text-inverse sm:py-24 md:py-32"
    >
      <Container width="wide">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-brand-secondary">
          Contact
        </p>
        <SplitHeading
          id="contact-heading"
          className="max-w-4xl font-display text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[1.02] tracking-tight text-balance"
        >
          Need a plumber?
        </SplitHeading>
        <p className="mt-5 max-w-xl text-base text-brand-accent/80 md:text-lg">
          Tell us what you need help with and we&apos;ll make it easy to take
          the next step.
        </p>

        <div className="mt-12 grid min-w-0 items-stretch gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
          <div data-contact-panel>
            <ContactForm />
          </div>
          <div data-contact-panel className="min-h-full">
            <ContactInfo className="h-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}

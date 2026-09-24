"use client";

import Image from "next/image";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { MagneticButton } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ABOUT } from "@/lib/constants/about";
import { SECTION_IDS } from "@/lib/constants";
import { gsap, useGSAP } from "@/lib/animations/gsap";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const copy = section.querySelectorAll<HTMLElement>("[data-about-reveal]");
        const frames = section.querySelectorAll<HTMLElement>("[data-about-frame]");

        if (copy.length) {
          gsap.from(copy, {
            autoAlpha: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          });
        }

        if (frames.length) {
          gsap.from(frames, {
            clipPath: "inset(14% 14% 14% 14%)",
            scale: 1.06,
            duration: 1.05,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: frames[0],
              start: "top 80%",
              once: true,
            },
          });
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.about}
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-bg-light py-20 sm:py-24 md:py-32"
    >
      <Container width="wide">
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-text-link">
              {ABOUT.eyebrow}
            </p>
            <SplitHeading
              id="about-heading"
              className="max-w-xl font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-balance text-text-primary"
            >
              {ABOUT.titleLead}{" "}
              <em className="font-medium italic text-text-link">
                {ABOUT.titleEmphasis}
              </em>
            </SplitHeading>
            <p
              data-about-reveal
              className="mt-6 max-w-md text-base leading-relaxed text-text-secondary md:text-lg"
            >
              {ABOUT.description}
            </p>
            <div
              data-about-reveal
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <MagneticButton className="w-full sm:w-auto">
                <Button href="#contact-form" size="lg" className="w-full sm:w-auto">
                  Request Service
                </Button>
              </MagneticButton>
              <Button
                href="#services"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                View Services
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {ABOUT.images.map((image, index) => (
              <div
                key={image.src}
                data-about-frame
                className="relative aspect-[3/4] overflow-hidden bg-surface-muted"
                style={{ marginTop: index === 1 ? "12%" : index === 2 ? "6%" : 0 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 18vw, 30vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

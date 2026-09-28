"use client";

import { useRef } from "react";
import { HeroOverlay } from "@/components/sections/hero/HeroOverlay";
import {
  HeroFrames,
  type HeroFramesHandle,
} from "@/components/sections/hero/HeroFrames";
import { HERO_FRAME_POSTER } from "@/lib/constants/heroFrames";
import { gsap, SplitText, useGSAP } from "@/lib/animations/gsap";
import { SECTION_IDS } from "@/lib/constants";

/**
 * Pinned viewport. Scroll scrubs the droplet frames; a load timeline
 * reveals the headline before the copy fades out.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const framesRef = useRef<HeroFramesHandle>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        framesRef.current?.snapProgress(0);
      });

      mm.add(
        {
          isMobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
          isDesktop:
            "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const isMobile = Boolean(context.conditions?.isMobile);

          const copy = section.querySelector<HTMLElement>("[data-hero-copy]");
          const veil = section.querySelector<HTMLElement>("[data-hero-veil]");
          const eyebrow = section.querySelector<HTMLElement>(
            '[data-hero-layer="eyebrow"]',
          );
          const headline = section.querySelector<HTMLElement>(
            '[data-hero-layer="headline"]',
          );
          const support = section.querySelector<HTMLElement>(
            '[data-hero-layer="support"]',
          );
          const cta = section.querySelector<HTMLElement>(
            '[data-hero-layer="cta"]',
          );

          framesRef.current?.snapProgress(0);
          if (veil) gsap.set(veil, { opacity: 0 });

          const intro = [eyebrow, support, cta].filter(
            (node): node is HTMLElement => Boolean(node),
          );

          if (headline) {
            SplitText.create(headline, {
              type: "words, chars",
              mask: "lines",
              autoSplit: true,
              aria: "auto",
              onSplit(self) {
                const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
                tl.from(
                  self.chars,
                  { yPercent: 110, duration: 0.9, stagger: 0.018 },
                  0,
                );
                if (intro.length) {
                  tl.from(
                    intro,
                    { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.08 },
                    0.15,
                  );
                }
                return tl;
              },
            });
          } else if (intro.length) {
            gsap.from(intro, {
              autoAlpha: 0,
              y: 18,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
            });
          }

          // Mobile: shorter pin + 1:1 scrub so touch feels fast and locked.
          // Desktop: longer cinematic distance with light catch-up.
          const end = isMobile ? "+=95%" : "+=180%";
          const scrub: number | boolean = isMobile ? true : 0.45;

          const progress = { value: 0 };
          const scroll = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end,
              pin: true,
              scrub,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          });

          scroll.to(
            progress,
            {
              value: 1,
              duration: 1,
              onUpdate: () => {
                framesRef.current?.setProgress(progress.value);
              },
            },
            0,
          );

          if (copy) {
            scroll.to(copy, { autoAlpha: 0, y: -20, duration: 0.16 }, 0.78);
          }

          if (veil) {
            scroll.to(veil, { opacity: 1, duration: 0.18 }, 0.82);
          }
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.hero}
      aria-labelledby="hero-heading"
      className="relative h-[100svh] min-h-[32rem] w-full overflow-hidden bg-bg-light sm:min-h-[36rem]"
    >
      <div className="absolute inset-0" aria-hidden>
        {/* Poster paints before the first bitmap decodes */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_FRAME_POSTER}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <HeroFrames ref={framesRef} />
      </div>

      <HeroOverlay />

      <div
        data-hero-veil
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg-light via-bg-light/80 to-transparent opacity-0"
        aria-hidden
      />
    </section>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
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
      const panelNodes = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-process-step]"),
      );
      const bar = section.querySelector<HTMLElement>("[data-process-bar]");
      if (!track || !panelNodes.length) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const layout = () => {
            const panelWidth = window.innerWidth;
            gsap.set(panelNodes, {
              width: panelWidth,
              minWidth: panelWidth,
              flexShrink: 0,
            });
            gsap.set(track, {
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              width: panelWidth * panelNodes.length,
              x: 0,
            });
          };

          layout();

          const distance = () =>
            Math.max(0, (panelNodes.length - 1) * window.innerWidth);

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              pinSpacing: true,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
              onRefresh: layout,
            },
          });

          tl.to(track, { x: () => -distance(), duration: 1 }, 0);

          if (bar) {
            tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
          }

          return () => {
            gsap.set(track, {
              clearProps: "display,flexDirection,flexWrap,width,x",
            });
            gsap.set(panelNodes, { clearProps: "width,minWidth,flexShrink" });
          };
        },
      );

      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.from(panelNodes, {
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
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.howWeWork}
      aria-labelledby="how-we-work-heading"
      className="relative bg-bg-light"
    >
      <div className="relative flex min-h-[100svh] flex-col px-4 py-24 sm:px-6 lg:h-[100svh] lg:overflow-hidden lg:px-0 lg:py-0">
        <header className="relative z-20 shrink-0 lg:px-16 lg:pb-8 lg:pt-28 xl:px-24">
          <div className="mb-10 max-w-lg lg:mb-0 lg:max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-text-link">
              Plumbing process
            </p>
            <SplitHeading
              id="how-we-work-heading"
              className="font-display text-[clamp(2.2rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-tight text-balance text-text-primary"
            >
              How we handle your job.
            </SplitHeading>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-hidden">
          <div
            data-process-track
            className="flex h-full flex-col lg:flex-row lg:flex-nowrap"
          >
            {PROCESS_STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.id}
                  data-process-step
                  className="grid w-full shrink-0 grid-cols-1 content-center gap-8 border-t border-border py-10 lg:h-full lg:w-screen lg:min-w-[100vw] lg:grid-cols-2 lg:items-center lg:gap-x-14 lg:border-t-0 lg:px-16 lg:pb-24 lg:pt-4 xl:gap-x-20 xl:px-24"
                >
                  <div
                    data-process-copy
                    className="min-w-0 max-w-md lg:max-w-sm xl:max-w-md"
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        aria-hidden
                        className="size-5 shrink-0 text-brand-secondary sm:size-6"
                        strokeWidth={1.5}
                      />
                      <p className="font-display text-5xl font-medium italic leading-none text-brand-secondary sm:text-6xl lg:text-7xl">
                        {step.number}
                      </p>
                    </div>
                    <h3 className="mt-4 font-display text-3xl font-medium tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
                      {step.description}
                    </p>
                  </div>

                  <div
                    data-process-media
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border/60 bg-surface-muted shadow-[0_1px_0_rgb(18_18_46/0.04)] lg:max-h-[min(42vh,20rem)] lg:justify-self-stretch"
                  >
                    <Image
                      src={step.image.src}
                      alt={step.image.alt}
                      fill
                      sizes="(min-width: 1024px) 42vw, 90vw"
                      className="object-cover"
                      style={{
                        objectPosition: step.image.position ?? "center center",
                      }}
                    />
                  </div>
                </article>
              );
            })}
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

"use client";

import { Phone } from "lucide-react";
import { MagneticButton } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { CONTACT, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type HeroOverlayProps = {
  className?: string;
  /** @deprecated Layout is CSS-responsive; kept for HeroFallback callers */
  layout?: "cinematic" | "mobile";
};

function phoneCallHref(): string {
  if (CONTACT.phone.isPlaceholder) return "#contact-form";
  return CONTACT.phone.href;
}

/**
 * Hero copy around the center droplet (light plate video).
 * Desktop: eyebrow/headline left · support/CTAs right.
 */
export function HeroOverlay({ className }: HeroOverlayProps) {
  const callHref = phoneCallHref();
  const callIsTel = callHref.startsWith("tel:");

  const primaryCta = (
    <Button
      href="#contact-form"
      size="lg"
      className="w-full min-h-12 md:w-auto md:min-h-0"
    >
      Request a Service
    </Button>
  );

  const secondaryCta = (
    <Button
      href={callHref}
      variant="outline"
      size="lg"
      className="w-full min-h-12 md:w-auto md:min-h-0"
      leftIcon={
        callIsTel ? <Phone className="h-4 w-4" aria-hidden /> : undefined
      }
      aria-label={
        callIsTel
          ? `Call ${SITE.shortName}`
          : "Request service via contact form"
      }
    >
      {callIsTel ? "Call Now" : "Contact Us"}
    </Button>
  );

  return (
    <div
      data-hero-layer="overlay-root"
      className={cn(
        "pointer-events-none absolute inset-0 z-20",
        "flex items-center justify-center",
        className,
      )}
    >
      <div
        data-hero-layer="veil"
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-gradient-to-t from-bg-light/80 via-transparent to-bg-light/30",
          "md:bg-[linear-gradient(90deg,rgb(243_245_246_/_0.88)_0%,rgb(243_245_246_/_0.45)_22%,transparent_38%,transparent_62%,rgb(243_245_246_/_0.45)_78%,rgb(243_245_246_/_0.88)_100%)]",
        )}
        aria-hidden
      />

      <Container width="wide" className="relative w-full">
        <div
          data-hero-copy
          className={cn(
            "grid w-full grid-cols-1 items-center gap-4 text-center",
            "md:max-w-none md:grid-cols-2 md:gap-10 md:text-left",
          )}
        >
          <div className="flex flex-col gap-4 md:max-w-md md:gap-5 md:justify-self-start lg:max-w-lg">
            <p
              data-hero-layer="eyebrow"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-text-link md:tracking-[0.22em]"
            >
              Swift Flo Plumbing Services
            </p>
            <h1
              id="hero-heading"
              data-hero-layer="headline"
              className={cn(
                "font-display font-medium tracking-tight text-balance text-text-primary",
                "text-[clamp(2rem,9vw,2.75rem)] leading-[1.08]",
                "md:text-4xl md:leading-[1.05] lg:text-6xl xl:text-7xl",
              )}
            >
              Plumbing Done Right.
            </h1>
          </div>

          <div className="flex flex-col gap-4 md:max-w-md md:justify-self-end lg:max-w-sm xl:max-w-md">
            <p
              data-hero-layer="support"
              className={cn(
                "mx-auto max-w-[22rem] text-[0.9375rem] leading-relaxed text-pretty text-text-secondary will-change-transform",
                "sm:max-w-md sm:text-base md:mx-0 md:max-w-none md:text-lg",
              )}
            >
              Reliable plumbing services built around fast response, precise
              workmanship, and solutions that last.
            </p>
            <div
              data-hero-layer="cta"
              className="pointer-events-auto flex w-full flex-col gap-2.5 md:flex-row md:flex-wrap md:gap-3"
            >
              <span className="contents md:hidden">{primaryCta}</span>
              <MagneticButton className="hidden md:inline-flex">
                {primaryCta}
              </MagneticButton>
              {secondaryCta}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

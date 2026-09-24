"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { MagneticButton } from "@/components/animations";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { PRIMARY_NAV, SITE } from "@/lib/constants";
import { useActiveSection, useScrolled } from "@/hooks";
import { cn } from "@/lib/utils";

/**
 * Site header — fixed over the light hero.
 * Transparent at top (dark type) · dark glass + light type on scroll.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(28);
  const activeHref = useActiveSection();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const menuId = useId();
  const elevated = scrolled || open;

  useGSAP(() => {
    const bar = progressRef.current;
    if (!bar) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        },
      );
    });

    return () => mm.revert();
  });

  const close = useCallback(() => setOpen(false), []);
  const openMenu = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const button = menuButtonRef.current;
    return () => {
      button?.focus();
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "transition-[background-color,border-color,box-shadow,backdrop-filter,height] duration-300",
          "[transition-timing-function:var(--ease-out-quart)]",
          elevated
            ? "border-b border-white/10 bg-bg-dark/88 shadow-[var(--shadow-md)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent shadow-none",
        )}
      >
        <Container
          as="div"
          width="wide"
          className={cn(
            "flex items-center justify-between gap-4 transition-[height] duration-300",
            "[transition-timing-function:var(--ease-out-quart)]",
            elevated ? "h-16 lg:h-[4.5rem]" : "h-[4.5rem] lg:h-20",
          )}
        >
          <a
            href="#hero"
            className={cn(
              "relative z-10 shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2",
              elevated
                ? "focus-visible:ring-offset-bg-dark"
                : "focus-visible:ring-offset-bg-light",
            )}
            aria-label={`${SITE.name} — Home`}
            onClick={close}
          >
            <BrandLogo size="lg" priority />
          </a>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {PRIMARY_NAV.map((item) => {
              const active = activeHref === item.href;

              return (
                <a
                  key={item.href + item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "nav-link relative rounded-md px-3.5 py-2 text-sm font-medium tracking-wide",
                    "transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary",
                    elevated
                      ? active
                        ? "text-text-inverse"
                        : "text-brand-accent/90 hover:text-text-inverse"
                      : active
                        ? "text-brand-primary"
                        : "text-text-secondary hover:text-brand-primary",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "nav-indicator absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-center rounded-full bg-brand-secondary",
                      "transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)]",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <MagneticButton className="hidden sm:inline-flex">
              <Button
                href="#contact-form"
                size="sm"
                aria-label="Request plumbing service"
              >
                Request Service
              </Button>
            </MagneticButton>

            <IconButton
              ref={menuButtonRef}
              label={open ? "Close navigation menu" : "Open navigation menu"}
              className={cn(
                "lg:hidden",
                elevated
                  ? "text-text-inverse hover:bg-white/10 focus-visible:ring-offset-bg-dark"
                  : "text-text-primary hover:bg-black/5 focus-visible:ring-offset-bg-light",
              )}
              aria-expanded={open}
              aria-controls={menuId}
              aria-haspopup="dialog"
              onClick={() => (open ? close() : openMenu())}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </IconButton>
          </div>
        </Container>
        <span
          ref={progressRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand-secondary"
        />
      </header>

      <div id={menuId}>
        <MobileNav open={open} onClose={close} activeHref={activeHref} />
      </div>
    </>
  );
}

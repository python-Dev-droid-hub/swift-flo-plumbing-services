"use client";

import {
  useEffect,
  useRef,
  type KeyboardEvent,
} from "react";
import { X } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { PRIMARY_NAV, SITE } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  activeHref: string;
};

/**
 * Full-viewport mobile navigation — slide + fade, focus-trapped while open.
 */
export function MobileNav({ open, onClose, activeHref }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    const first = focusables?.[0];
    const last = focusables?.[focusables.length - 1];
    closeRef.current?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const onPanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") onClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close menu overlay"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-bg-dark/55",
          !reducedMotion && "transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        inert={!open ? true : undefined}
        onKeyDown={onPanelKeyDown}
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-[22rem] flex-col bg-bg-light shadow-lg",
          "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
          !reducedMotion && "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <a
            href="#hero"
            onClick={onClose}
            className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
            aria-label={`${SITE.name} — Home`}
          >
            <BrandLogo size="md" />
          </a>
          <IconButton ref={closeRef} label="Close menu" onClick={onClose}>
            <X className="h-5 w-5" />
          </IconButton>
        </div>

        <nav
          aria-label="Mobile primary"
          className="flex flex-1 flex-col gap-1 px-3 py-5"
        >
          {PRIMARY_NAV.map((item) => {
            const active = activeHref === item.href;

            return (
              <a
                key={item.href + item.label}
                href={item.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-4 py-3.5 text-base font-semibold tracking-tight",
                  "transition-[color,background-color,transform] duration-200",
                  "[transition-timing-function:var(--ease-out-quart)]",
                  "active:scale-[0.99]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-light",
                  active
                    ? "bg-brand-secondary/15 text-brand-primary"
                    : "text-text-primary hover:bg-surface-muted hover:text-text-link",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="border-t border-border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <Button
            href="#contact-form"
            className="w-full min-h-12"
            size="lg"
            onClick={onClose}
          >
            Request Service
          </Button>
        </div>
      </div>
    </div>
  );
}

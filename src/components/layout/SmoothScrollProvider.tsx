"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { onPrefersReducedMotionChange } from "@/lib/animations";
import {
  gsap,
  registerGsapPlugins,
  ScrollTrigger,
} from "@/lib/animations/gsap";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

/** Clear fixed header when jumping to in-page anchors */
const HEADER_OFFSET_PX = 88;

function scrollToHash(
  hash: string,
  lenis: Lenis | null,
  instant: boolean,
) {
  const id = hash.replace(/^#/, "");
  if (!id) return;

  // Home / hero — always reset to absolute top so pin + scrub fully reverse
  if (id === "hero" || id === "main") {
    if (lenis && !instant) {
      lenis.scrollTo(0, { immediate: false });
    } else if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" });
    }
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  if (lenis && !instant) {
    lenis.scrollTo(el, { offset: -HEADER_OFFSET_PX });
  } else {
    const top =
      el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
    window.scrollTo({
      top,
      behavior: instant ? "auto" : "smooth",
    });
  }
}

/**
 * Lenis smooth scrolling wired to GSAP ScrollTrigger.
 * Disabled entirely when the user prefers reduced motion.
 * Intercepts in-page hash links so anchors clear the fixed header.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    registerGsapPlugins();

    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;
    let removeMotionListener: (() => void) | null = null;
    let reducedMotion = false;

    const destroyLenis = () => {
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
        tickerFn = null;
      }
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      document.documentElement.classList.remove("lenis");
      ScrollTrigger.refresh();
    };

    const createLenis = () => {
      destroyLenis();

      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        anchors: false,
      });

      lenis.on("scroll", ScrollTrigger.update);

      tickerFn = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
      document.documentElement.classList.add("lenis");
    };

    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href^='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;

      const id = url.hash.replace(/^#/, "");
      if (!id || !document.getElementById(id)) return;

      event.preventDefault();
      history.pushState(null, "", url.hash);
      scrollToHash(url.hash, lenis, reducedMotion);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    };

    removeMotionListener = onPrefersReducedMotionChange((reduced) => {
      reducedMotion = reduced;
      if (reduced) {
        destroyLenis();
      } else {
        createLenis();
      }
    });

    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
    });

    document.addEventListener("click", onDocumentClick);

    // Honor deep-link hash after Lenis (if any) is ready
    if (window.location.hash) {
      requestAnimationFrame(() => {
        scrollToHash(window.location.hash, lenis, true);
        ScrollTrigger.refresh();
      });
    }

    return () => {
      document.removeEventListener("click", onDocumentClick);
      removeMotionListener?.();
      destroyLenis();
    };
  }, []);

  return children;
}

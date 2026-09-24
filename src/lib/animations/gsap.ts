"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

let registered = false;

/**
 * Registers GSAP plugins once on the client.
 * Safe to call from multiple modules.
 */
export function registerGsapPlugins(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  registered = true;
}

if (typeof window !== "undefined") {
  registerGsapPlugins();
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

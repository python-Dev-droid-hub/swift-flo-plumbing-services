import type { LucideIcon } from "lucide-react";
import {
  Bath,
  CookingPot,
  Droplets,
  Search,
  Siren,
  Wrench,
} from "lucide-react";

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const SERVICES: readonly ServiceItem[] = [
  {
    id: "emergency-plumbing",
    title: "Emergency Plumbing",
    description:
      "Burst pipe, backed-up drain, or water that won't stop — call and we'll get someone on it.",
    href: "#contact-form",
    icon: Siren,
  },
  {
    id: "leak-detection",
    title: "Leak Detection",
    description:
      "Find where the water is going before it wrecks floors or walls. We track it down and show you what we found.",
    href: "#contact-form",
    icon: Search,
  },
  {
    id: "drain-cleaning",
    title: "Drain Cleaning",
    description:
      "Slow sinks, clogged showers, stubborn main lines — cleared so water moves the way it should again.",
    href: "#contact-form",
    icon: Droplets,
  },
  {
    id: "pipe-repair",
    title: "Pipe Repair",
    description:
      "Repair or replace what's failing. Solid joints, the right materials, and a job that holds pressure.",
    href: "#contact-form",
    icon: Wrench,
  },
  {
    id: "bathroom-plumbing",
    title: "Bathroom Plumbing",
    description:
      "Toilets, faucets, valves, and supply lines — installed clean so the bathroom works without fuss.",
    href: "#contact-form",
    icon: Bath,
  },
  {
    id: "kitchen-plumbing",
    title: "Kitchen Plumbing",
    description:
      "Sinks, disposals, and supply lines set up so the kitchen keeps running day to day.",
    href: "#contact-form",
    icon: CookingPot,
  },
] as const;

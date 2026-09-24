import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  ClipboardList,
  PhoneCall,
  Wrench,
} from "lucide-react";

export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    id: "contact",
    number: "01",
    title: "Contact",
    description:
      "Tell us what's going on — a leak, clog, no hot water, or a plumbing job you need done.",
    icon: PhoneCall,
  },
  {
    id: "assess",
    number: "02",
    title: "Assess",
    description:
      "We inspect the pipes, fixtures, or stoppage and explain what we found in plain language.",
    icon: ClipboardList,
  },
  {
    id: "solve",
    number: "03",
    title: "Solve",
    description:
      "We carry out the repair, clear, or install carefully so water flows the way it should again.",
    icon: Wrench,
  },
  {
    id: "complete",
    number: "04",
    title: "Complete",
    description:
      "We test the work with you, clean up the area, and make sure you're set before we leave.",
    icon: CheckCircle2,
  },
] as const;

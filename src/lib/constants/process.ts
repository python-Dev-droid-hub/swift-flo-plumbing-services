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
  image: {
    src: string;
    alt: string;
    /** CSS object-position for consistent landscape crops */
    position?: string;
  };
};

/**
 * Process steps — landscape photos matched to Contact → Assess → Solve → Complete.
 */
export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    id: "contact",
    number: "01",
    title: "Contact",
    description:
      "Tell us what's going on — a leak, clog, no hot water, or a plumbing job you need done.",
    icon: PhoneCall,
    image: {
      src: "/images/process-contact.jpg",
      alt: "Plumber on a phone call while holding a kitchen faucet",
      position: "center 30%",
    },
  },
  {
    id: "assess",
    number: "02",
    title: "Assess",
    description:
      "We inspect the pipes, fixtures, or stoppage and explain what we found in plain language.",
    icon: ClipboardList,
    image: {
      src: "/images/process-assess.jpg",
      alt: "Plumber explaining a pipe fitting to a homeowner under the sink",
      position: "center 45%",
    },
  },
  {
    id: "solve",
    number: "03",
    title: "Solve",
    description:
      "We carry out the repair, clear, or install carefully so water flows the way it should again.",
    icon: Wrench,
    image: {
      src: "/images/process-solve.webp",
      alt: "Plumber clearing a kitchen drain while the homeowner looks on",
      position: "center 40%",
    },
  },
  {
    id: "complete",
    number: "04",
    title: "Complete",
    description:
      "We test the work with you, clean up the area, and make sure you're set before we leave.",
    icon: CheckCircle2,
    image: {
      src: "/images/process-complete.jpg",
      alt: "Plumber and homeowner shaking hands after the job is finished",
      position: "center 35%",
    },
  },
] as const;

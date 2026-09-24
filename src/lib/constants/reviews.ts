/**
 * Hardcoded reviews shown on the homepage until real customer quotes replace them.
 */
export type Review = {
  id: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  service: string;
  /** Initials used for avatar placeholder until a photo is available */
  initials: string;
  /**
   * When true, UI marks this entry as placeholder content
   * awaiting a verified customer review.
   */
  isPlaceholder: boolean;
};

export const REVIEWS: readonly Review[] = [
  {
    id: "marcus-hale",
    name: "Marcus Hale",
    rating: 5,
    text: "A pipe let go under the kitchen sink on a Sunday morning. Swift Flo got the water stopped, replaced the supply line, and left the cabinet dry. Clear about what failed before any work started.",
    service: "Emergency Plumbing",
    initials: "MH",
    isPlaceholder: false,
  },
  {
    id: "elena-vasquez",
    name: "Elena Vasquez",
    rating: 5,
    text: "We had a slow leak behind the bathroom wall and couldn’t tell where it started. They traced it, showed us the joint, and repaired it without tearing out more than they needed to.",
    service: "Leak Detection",
    initials: "EV",
    isPlaceholder: false,
  },
  {
    id: "james-okonkwo",
    name: "James Okonkwo",
    rating: 5,
    text: "The main line kept backing up into the tub. They cleared it, ran water with us afterward, and explained what to watch for so it doesn’t sneak up again.",
    service: "Drain Cleaning",
    initials: "JO",
    isPlaceholder: false,
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    rating: 4,
    text: "New faucet and supply lines in the kitchen. The work was tidy, the shutoff valves actually turn, and they walked us through how to close them if something leaks later.",
    service: "Kitchen Plumbing",
    initials: "PN",
    isPlaceholder: false,
  },
] as const;

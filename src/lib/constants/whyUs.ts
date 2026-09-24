export type WhyUsAdvantage = {
  id: string;
  number: string;
  title: string;
  description: string;
  /** Desktop placement around the central visual */
  placement: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

export const WHY_US_ADVANTAGES: readonly WhyUsAdvantage[] = [
  {
    id: "workmanship",
    number: "01",
    title: "Solid workmanship",
    description: "Careful installs and repairs that hold up day to day.",
    placement: "top-left",
  },
  {
    id: "response",
    number: "02",
    title: "When you need us",
    description: "We respond when something breaks — not when it's convenient.",
    placement: "top-right",
  },
  {
    id: "communication",
    number: "03",
    title: "Straight talk",
    description: "Clear options and pricing before the work starts.",
    placement: "bottom-left",
  },
  {
    id: "solutions",
    number: "04",
    title: "Built to last",
    description: "Practical fixes meant to keep working after we leave.",
    placement: "bottom-right",
  },
] as const;

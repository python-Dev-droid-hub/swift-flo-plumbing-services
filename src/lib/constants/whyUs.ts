export type WhyUsAdvantage = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    position?: string;
  };
};

/** Why Us cards — local plumbing photos sized for tall card frames. */
export const WHY_US_ADVANTAGES: readonly WhyUsAdvantage[] = [
  {
    id: "workmanship",
    number: "01",
    title: "Solid workmanship",
    description:
      "Careful installs and repairs done the right way the first time — joints sealed, lines supported, and finishes left clean so the work holds up day to day.",
    image: {
      src: "/images/plumber-cabinet.jpg",
      alt: "Plumber carefully working on pipes under a kitchen sink",
      position: "center 25%",
    },
  },
  {
    id: "response",
    number: "02",
    title: "When you need us",
    description:
      "When water won't stop or a drain backs up, you need someone who answers. We respond when something breaks — not when it's convenient for us.",
    image: {
      src: "/images/plumber-kitchen.webp",
      alt: "Plumber on a residential service call in the kitchen",
      position: "center 35%",
    },
  },
  {
    id: "communication",
    number: "03",
    title: "Straight talk",
    description:
      "You get clear options and pricing before work starts. No surprises on the invoice — just honest recommendations for what the job actually needs.",
    image: {
      src: "/images/plumber-bathroom.jpg",
      alt: "Plumber explaining fixture work at a bathroom sink",
      position: "center center",
    },
  },
  {
    id: "solutions",
    number: "04",
    title: "Built to last",
    description:
      "Practical fixes meant to keep working after we leave. The right materials, solid connections, and workmanship you can count on long term.",
    image: {
      src: "/images/plumber-under-sink.jpg",
      alt: "Completed under-sink plumbing repair with tools cleared",
      position: "center 40%",
    },
  },
] as const;

export type NavItem = {
  label: string;
  href: string;
};

export const PRIMARY_NAV: readonly NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact Us", href: "#contact" },
] as const;

export const FOOTER_NAV: readonly NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  services: "services",
  whyUs: "why-us",
  howWeWork: "how-we-work",
  reviews: "reviews",
  faq: "faq",
  contact: "contact",
} as const;

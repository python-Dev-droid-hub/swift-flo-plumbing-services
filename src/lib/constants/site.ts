export const SITE = {
  name: "Swift Flo Plumbing Services",
  shortName: "Swift Flo",
  tagline: "Precision plumbing. Clean water. Reliable flow.",
  description:
    "Swift Flo Plumbing Services delivers modern, precision plumbing for homes and businesses — fast response, clean workmanship, and lasting reliability.",
  /** Schema.org / directory category — not a claimed certification */
  category: "Plumbing Services",
  /** Alpha PNG mark — use unoptimized Image to preserve transparency */
  logo: "/images/swift-flo-logo.png",
  /** Small header/footer mark (pre-resized PNG) */
  logoMark: "/images/swift-flo-logo-mark.png",
  /** Hero / large decorative mark */
  logoHero: "/images/swift-flo-logo-hero.png",
  /** Raster fallback for favicons / older clients */
  logoRaster: "/images/swift-flo-logo.jpg",
  /**
   * @deprecated Prefer CONTACT.* — kept for gradual migration in header/footer.
   */
  phone: "(629) 238-8322",
  phoneHref: "tel:+16292388322",
  email: "swiftfloplumbing2025@gmail.com",
  emailHref: "mailto:swiftfloplumbing2025@gmail.com",
  address: {
    line1: "[Street address placeholder]",
    line2: "",
    city: "[City]",
    state: "[ST]",
    zip: "",
  },
  hours: {
    weekdays: "8:00 AM – 8:00 PM, Monday–Sunday",
    weekend: "8:00 AM – 8:00 PM",
    emergency: "Contact us for urgent plumbing needs",
  },
  /**
   * Social profiles — leave href empty until a real URL is provided.
   * Footer only renders icons that have a valid http(s) link.
   */
  social: [
    { label: "Facebook", href: "" },
    { label: "Instagram", href: "" },
    { label: "LinkedIn", href: "" },
  ] as readonly { label: string; href: string }[],
} as const;

export type SiteConfig = typeof SITE;

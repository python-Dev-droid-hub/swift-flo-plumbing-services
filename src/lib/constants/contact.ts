/**
 * Contact / business details.
 *
 * Keep placeholders only for fields not yet verified (address / directions).
 */
export const CONTACT = {
  phone: {
    label: "Phone",
    display: "(629) 238-8322",
    href: "tel:+16292388322",
    isPlaceholder: false,
  },
  email: {
    label: "Email",
    display: "swiftfloplumbing2025@gmail.com",
    href: "mailto:swiftfloplumbing2025@gmail.com",
    isPlaceholder: false,
  },
  hours: {
    label: "Business Hours",
    display: "8:00 AM – 8:00 PM, Monday–Sunday",
    isPlaceholder: false,
  },
  directions: {
    label: "Get Directions",
    /** Update with a maps URL when an address is provided */
    href: "#contact",
    isPlaceholder: true,
  },
} as const;

export const CONTACT_SERVICE_OPTIONS = [
  "Emergency Plumbing",
  "Leak Detection",
  "Drain Cleaning",
  "Pipe Repair",
  "Bathroom Plumbing",
  "Kitchen Plumbing",
  "Other / Not sure",
] as const;

export type ContactServiceOption = (typeof CONTACT_SERVICE_OPTIONS)[number];

export type ContactFormValues = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export type ContactSubmitResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

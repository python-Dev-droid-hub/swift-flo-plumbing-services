/**
 * FAQ content — keep answers general and easy to update.
 * Avoid inventing pricing, guarantees, response times, licenses,
 * certifications, or service-area claims unless verified later.
 */
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "services",
    question: "What plumbing services do you provide?",
    answer:
      "Swift Flo Plumbing Services provides a range of plumbing support for homes and businesses, including emergency plumbing, leak detection, drain cleaning, pipe repair, bathroom plumbing, and kitchen plumbing. Review our Services section for an overview, then contact us to talk through your specific situation.",
  },
  {
    id: "kitchens-bathrooms",
    question: "Do you handle plumbing issues in kitchens and bathrooms?",
    answer:
      "Yes. We handle kitchen and bathroom plumbing work, from fixtures and supply lines to drains and related repairs. Share what you are experiencing and we can help determine a practical next step.",
  },
  {
    id: "request-service",
    question: "How can I request plumbing service?",
    answer:
      "You can request service through the contact form on this website, by calling (629) 238-8322, or by emailing swiftfloplumbing2025@gmail.com. Include a brief description of the issue and the best way to reach you.",
  },
  {
    id: "emergency",
    question: "What should I do if I have a plumbing emergency?",
    answer:
      "If you are dealing with an urgent plumbing issue, call (629) 238-8322 as soon as you can and describe what is happening. If it is safe to do so, shut off the local or main water supply to help limit damage while you arrange help.",
  },
  {
    id: "leaks-drainage",
    question: "Can you help identify leaks or drainage problems?",
    answer:
      "Yes. We can help assess leaks and drainage concerns, identify likely causes, and recommend practical solutions. Reach out with what you have noticed — location, timing, and any visible signs — and we can guide the next step.",
  },
  {
    id: "contact",
    question: "How do I contact Swift Flo Plumbing Services?",
    answer:
      "Call (629) 238-8322, email swiftfloplumbing2025@gmail.com, or use the contact form on this website. We’re available 8:00 AM – 8:00 PM, Monday–Sunday.",
  },
] as const;

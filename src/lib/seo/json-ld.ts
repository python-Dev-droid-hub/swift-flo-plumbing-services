/**
 * JSON-LD builders — omit unverified contact, address, ratings, and licenses.
 */

import { FAQ_ITEMS } from "@/lib/constants/faq";
import { SERVICES } from "@/lib/constants/services";
import { CONTACT } from "@/lib/constants/contact";
import { SITE } from "@/lib/constants/site";
import { absoluteUrl, SEO } from "@/lib/seo/config";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: absoluteUrl("/"),
    logo: absoluteUrl(SITE.logo),
    image: absoluteUrl(SITE.logoHero),
    description: SEO.description,
    telephone: CONTACT.phone.display,
    email: CONTACT.email.display,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phone.href.replace(/^tel:/, ""),
      email: CONTACT.email.display,
      contactType: "customer service",
      availableLanguage: "English",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    },
    knowsAbout: [
      "Plumbing",
      "Emergency plumbing",
      "Leak detection",
      "Drain cleaning",
      "Pipe repair",
      "Bathroom plumbing",
      "Kitchen plumbing",
    ],
  };
}

/**
 * PlumbingService / LocalBusiness — phone/email/hours only (no address until verified).
 */
export function buildPlumbingBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Plumber", "HomeAndConstructionBusiness"],
    "@id": `${absoluteUrl("/")}#business`,
    name: SITE.name,
    url: absoluteUrl("/"),
    image: absoluteUrl(SITE.logoHero),
    description: SEO.description,
    telephone: CONTACT.phone.href.replace(/^tel:/, ""),
    email: CONTACT.email.display,
    openingHours: "Mo-Su 08:00-20:00",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plumbing services",
      itemListElement: SERVICES.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: { "@id": `${absoluteUrl("/")}#organization` },
        },
        position: index + 1,
      })),
    },
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: SITE.name,
    url: absoluteUrl("/"),
    description: SEO.description,
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
    inLanguage: "en-US",
  };
}

export function buildWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl("/")}#webpage`,
    url: absoluteUrl("/"),
    name: SEO.title,
    description: SEO.description,
    isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    about: { "@id": `${absoluteUrl("/")}#business` },
    primaryImageOfPage: absoluteUrl(SITE.logoHero),
    inLanguage: "en-US",
  };
}

export function buildFaqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/")}#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildHomeJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationJsonLd(),
      buildPlumbingBusinessJsonLd(),
      buildWebSiteJsonLd(),
      buildWebPageJsonLd(),
      buildFaqPageJsonLd(),
    ],
  };
}

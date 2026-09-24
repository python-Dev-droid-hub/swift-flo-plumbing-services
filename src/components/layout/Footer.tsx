import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/ui/Divider";
import { CONTACT, FOOTER_NAV, SERVICES, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

function isRealUrl(href: string): boolean {
  return /^https?:\/\//i.test(href.trim());
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm0 2A1.5 1.5 0 1 0 13.5 12 1.5 1.5 0 0 0 12 10.5zM17 7.75a.75.75 0 1 1-.75.75A.75.75 0 0 1 17 7.75z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M6.5 8.5A1.75 1.75 0 1 1 6.5 5a1.75 1.75 0 0 1 0 3.5zM5 10h3v9H5zm5 0h2.9v1.3h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V19h-3v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19h-3z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, () => ReactNode> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
};

const footerLinkClass =
  "rounded-sm text-sm text-brand-accent/85 transition-colors hover:text-text-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark";

/**
 * Site footer — brand, nav, services, placeholder contact, optional social.
 */
export function Footer() {
  const socialLinks = SITE.social.filter((item) => isRealUrl(item.href));

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-bg-dark text-text-inverse">
      <Container width="wide" className="relative py-16 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#hero"
              className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark"
              aria-label={`${SITE.name} — Home`}
            >
              <span className="relative h-24 w-24 shrink-0 bg-transparent sm:h-32 sm:w-32">
                <Image
                  src={SITE.logo}
                  alt=""
                  width={256}
                  height={256}
                  unoptimized
                  sizes="128px"
                  className="h-full w-full bg-transparent object-contain"
                />
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-accent/80">
              {SITE.description}
            </p>

            {socialLinks.length > 0 ? (
              <ul
                className="mt-5 flex items-center gap-2"
                aria-label="Social media"
              >
                {socialLinks.map((item) => {
                  const Icon = SOCIAL_ICONS[item.label];
                  if (!Icon) return null;
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-inverse/25 text-brand-accent transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                      >
                        <Icon />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          <nav aria-label="Footer navigation">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_NAV.map((item) => (
                <li key={item.href + item.label}>
                  <a href={item.href} className={footerLinkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
              Services
            </p>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a href="#services" className={footerLinkClass}>
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
              Contact
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <p className="text-xs text-brand-accent/70">
                  {CONTACT.phone.label}
                </p>
                {CONTACT.phone.isPlaceholder ? (
                  <p className="mt-0.5 text-brand-accent/90">
                    {CONTACT.phone.display}
                  </p>
                ) : (
                  <a
                    href={CONTACT.phone.href}
                    className={cn(footerLinkClass, "mt-0.5 inline-block")}
                  >
                    {CONTACT.phone.display}
                  </a>
                )}
                {CONTACT.phone.isPlaceholder ? (
                  <span className="mt-1 block text-[0.65rem] text-brand-accent/60">
                    Placeholder — update before launch
                  </span>
                ) : null}
              </li>
              <li>
                <p className="text-xs text-brand-accent/70">
                  {CONTACT.email.label}
                </p>
                {CONTACT.email.isPlaceholder ? (
                  <p className="mt-0.5 text-brand-accent/90">
                    {CONTACT.email.display}
                  </p>
                ) : (
                  <a
                    href={CONTACT.email.href}
                    className={cn(footerLinkClass, "mt-0.5 inline-block")}
                  >
                    {CONTACT.email.display}
                  </a>
                )}
                {CONTACT.email.isPlaceholder ? (
                  <span className="mt-1 block text-[0.65rem] text-brand-accent/60">
                    Placeholder — update before launch
                  </span>
                ) : null}
              </li>
              <li>
                <p className="text-xs text-brand-accent/70">
                  {CONTACT.hours.label}
                </p>
                <p className="mt-0.5 text-brand-accent/90">
                  {CONTACT.hours.display}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <Divider tone="inverse" className="mb-6 mt-12 md:mt-14" />

        <p className="text-xs text-brand-accent/55">
          © 2026 Swift Flo Plumbing Services. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

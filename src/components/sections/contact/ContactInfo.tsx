"use client";

import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ContactInfoProps = {
  className?: string;
};

function isActionableHref(href?: string, isPlaceholder?: boolean): boolean {
  if (!href || isPlaceholder) return false;
  if (href.startsWith("#")) return true;
  return /^(tel:|mailto:|https?:)/i.test(href);
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
  isPlaceholder,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  isPlaceholder?: boolean;
}) {
  const content = (
    <>
      <span
        className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border-inverse/20 bg-white/5 text-brand-secondary"
        aria-hidden
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent/75">
          {label}
        </span>
        <span className="mt-1 block text-sm font-medium text-text-inverse md:text-base">
          {value}
        </span>
        {isPlaceholder ? (
          <Badge
            variant="muted"
            className="mt-2 normal-case tracking-normal text-[0.65rem]"
          >
            Placeholder — replace with verified details
          </Badge>
        ) : null}
      </span>
    </>
  );

  if (isActionableHref(href, isPlaceholder)) {
    return (
      <a
        href={href}
        className="flex items-start gap-3 rounded-md p-1 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-start gap-3 p-1" aria-label={`${label}: ${value}`}>
      {content}
    </div>
  );
}

/**
 * Contact details panel. All contact copy lives in HTML.
 */
export function ContactInfo({ className }: ContactInfoProps) {
  const phoneActionable = isActionableHref(
    CONTACT.phone.href,
    CONTACT.phone.isPlaceholder,
  );
  const directionsActionable = isActionableHref(
    CONTACT.directions.href,
    CONTACT.directions.isPlaceholder,
  );

  return (
    <aside
      className={cn(
        "relative min-w-0 overflow-hidden border border-white/15 bg-surface-dark-elevated text-text-inverse",
        className,
      )}
      aria-label="Contact details"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgb(78_217_255_/_0.16),transparent_46%)]"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col gap-8 p-6 md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            Contact details
          </p>
          <p className="mt-2 max-w-sm text-sm text-brand-accent/90">
            Call, email, or use the form — we&apos;re available{" "}
            {CONTACT.hours.display.toLowerCase()}.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <InfoRow
            icon={Phone}
            label={CONTACT.phone.label}
            value={CONTACT.phone.display}
            href={CONTACT.phone.href}
            isPlaceholder={CONTACT.phone.isPlaceholder}
          />
          <InfoRow
            icon={Mail}
            label={CONTACT.email.label}
            value={CONTACT.email.display}
            href={CONTACT.email.href}
            isPlaceholder={CONTACT.email.isPlaceholder}
          />
          <InfoRow
            icon={Clock3}
            label={CONTACT.hours.label}
            value={CONTACT.hours.display}
            isPlaceholder={CONTACT.hours.isPlaceholder}
          />
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
          {phoneActionable ? (
            <Button
              href={CONTACT.phone.href}
              size="lg"
              className="w-full min-h-12 sm:flex-1"
              leftIcon={<Phone className="h-4 w-4" aria-hidden />}
            >
              Call Now
            </Button>
          ) : (
            <Button
              href="#contact-form"
              size="lg"
              className="w-full min-h-12 sm:flex-1"
            >
              Use contact form
            </Button>
          )}
          {directionsActionable ? (
            <Button
              href={CONTACT.directions.href}
              variant="inverse"
              size="lg"
              className="w-full min-h-12 sm:flex-1"
              leftIcon={<MapPin className="h-4 w-4" aria-hidden />}
            >
              Get Directions
            </Button>
          ) : (
            <Button
              type="button"
              variant="inverse"
              size="lg"
              className="w-full min-h-12 sm:flex-1"
              disabled
            >
              Directions (coming soon)
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}

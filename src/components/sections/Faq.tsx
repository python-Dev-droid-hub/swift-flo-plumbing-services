"use client";

import { useCallback, useId, useState } from "react";
import { Container } from "@/components/layout/Container";
import { FaqAccordionItem } from "@/components/sections/faq/FaqAccordionItem";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { FAQ_ITEMS, SECTION_IDS } from "@/lib/constants";

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const headingId = useId();

  const onToggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return (
    <section
      id={SECTION_IDS.faq}
      aria-labelledby={headingId}
      className="relative bg-bg-light py-20 sm:py-24 md:py-32"
    >
      <Container width="wide">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <header className="lg:sticky lg:top-28">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-text-link">
              FAQ
            </p>
            <SplitHeading
              id={headingId}
              className="font-display text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-tight text-balance text-text-primary"
            >
              Questions, answered clearly.
            </SplitHeading>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-text-secondary md:text-lg">
              Straightforward answers about our services and how to get in
              touch. Need something more specific? Reach out through Contact.
            </p>
          </header>

          <div>
            {FAQ_ITEMS.map((item, index) => (
              <FaqAccordionItem
                key={item.id}
                index={index}
                question={item.question}
                answer={item.answer}
                open={openId === item.id}
                onToggle={() => onToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  headingAs?: "h1" | "h2" | "h3";
  tone?: "default" | "inverse";
  /** Associates the section via aria-labelledby */
  titleId?: string;
};

/**
 * Standard section intro: eyebrow + title + supporting copy.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  headingAs = "h2",
  tone = "default",
  titleId,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <Heading as={headingAs} eyebrow={eyebrow} tone={tone} id={titleId}>
        {title}
      </Heading>
      {description ? (
        <Text
          size="lg"
          tone={tone === "inverse" ? "inverse" : "secondary"}
          className={cn(
            tone === "inverse" && "text-brand-accent/90",
            align === "center" && "text-center",
          )}
        >
          {description}
        </Text>
      ) : null}
    </div>
  );
}

import Image from "next/image";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  /** Display size of the circular mark */
  size?: "sm" | "md" | "lg" | "xl";
  /** @deprecated Wordmark removed — logo artwork includes branding */
  withWordmark?: boolean;
  /** Kept for API compatibility; mark artwork is unchanged */
  tone?: "default" | "inverse";
  priority?: boolean;
};

/** Display box + native img pixels (2× for sharp retina) */
const sizeMap = {
  sm: { box: "h-12 w-12", img: 96 },
  md: { box: "h-14 w-14", img: 112 },
  lg: { box: "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]", img: 144 },
  xl: { box: "h-20 w-20 sm:h-24 sm:w-24", img: 192 },
} as const;

/**
 * Official Swift Flo logo mark — alpha PNG, unoptimized to avoid
 * Next Image re-encoding / cache flattening transparency.
 */
export function BrandLogo({
  className,
  size = "lg",
  priority = false,
}: BrandLogoProps) {
  const dims = sizeMap[size];

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center bg-transparent",
        dims.box,
        className,
      )}
    >
      <Image
        src={SITE.logo}
        alt={SITE.name}
        width={dims.img}
        height={dims.img}
        priority={priority}
        unoptimized
        sizes={`${dims.img}px`}
        className="h-full w-full bg-transparent object-contain"
      />
    </span>
  );
}

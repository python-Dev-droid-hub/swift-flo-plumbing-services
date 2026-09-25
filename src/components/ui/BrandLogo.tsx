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

/**
 * Square display boxes sized for header / nav rhythm.
 * Native pixels are 2× the CSS box for sharp retina.
 */
const sizeMap = {
  sm: { box: "h-9 w-9", img: 72 },
  md: { box: "h-11 w-11", img: 88 },
  /** Primary header mark — paired with ~80–88px header bars */
  lg: { box: "h-14 w-14 sm:h-16 sm:w-16", img: 128 },
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
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-transparent",
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
        className="h-full w-full object-contain object-center"
        draggable={false}
      />
    </span>
  );
}

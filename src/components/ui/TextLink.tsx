import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  underline?: boolean;
};

/**
 * Accessible text link. Uses text-link (accessible cyan) — not bright logo cyan.
 */
export function TextLink({
  children,
  className,
  underline = true,
  ...props
}: TextLinkProps) {
  return (
    <a
      className={cn(
        "rounded-sm font-medium text-text-link transition-colors duration-200 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-light",
        underline && "underline-offset-4 hover:underline",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

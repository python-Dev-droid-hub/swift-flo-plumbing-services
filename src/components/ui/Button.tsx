import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "inverse";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-cta text-text-on-accent shadow-sm hover:brightness-[0.97] hover:shadow-[var(--shadow-md)] focus-visible:ring-brand-secondary",
  secondary:
    "bg-brand-primary text-text-inverse shadow-sm hover:bg-surface-dark-elevated hover:shadow-[var(--shadow-md)] focus-visible:ring-brand-primary",
  ghost:
    "bg-transparent text-text-primary hover:bg-surface-muted focus-visible:ring-brand-secondary",
  outline:
    "bg-transparent text-brand-primary border border-border-strong hover:border-brand-primary hover:bg-surface-muted focus-visible:ring-brand-secondary",
  inverse:
    "bg-transparent text-text-inverse border border-border-inverse hover:border-brand-secondary hover:text-brand-secondary focus-visible:ring-brand-secondary focus-visible:ring-offset-bg-dark",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-12 px-6 text-sm gap-2",
  lg: "h-14 px-8 text-base gap-2.5",
};

const baseStyles = cn(
  "btn group/btn inline-flex items-center justify-center font-semibold tracking-wide rounded-md",
  "transition-[color,background-color,border-color,filter,box-shadow,transform] duration-200",
  "[transition-timing-function:var(--ease-out-expo)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-light",
  "disabled:pointer-events-none disabled:opacity-50",
  "active:scale-[0.98]",
);

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Shows spinner, swaps label, and disables the control */
  isLoading?: boolean;
  loadingText?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  leftIcon,
  rightIcon,
  isLoading = false,
  loadingText = "Sending…",
  ...props
}: ButtonProps) {
  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    isLoading && "pointer-events-none cursor-wait opacity-70",
    className,
  );

  const content = (
    <>
      {isLoading ? (
        <LoaderCircle
          className="btn-icon h-[1.1em] w-[1.1em] animate-spin"
          aria-hidden
        />
      ) : leftIcon ? (
        <span className="btn-icon inline-flex shrink-0" aria-hidden>
          {leftIcon}
        </span>
      ) : null}
      <span>{isLoading ? loadingText : children}</span>
      {!isLoading && rightIcon ? (
        <span
          className="btn-icon btn-icon-trail inline-flex shrink-0"
          aria-hidden
        >
          {rightIcon}
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, onClick, ...anchorProps } = props;
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={isLoading || undefined}
        tabIndex={isLoading ? -1 : anchorProps.tabIndex}
        onClick={(event) => {
          if (isLoading) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const {
    type = "button",
    disabled,
    ...buttonProps
  } = props as ButtonAsButton;

  return (
    <button
      type={type}
      className={classes}
      disabled={isLoading || disabled}
      aria-busy={isLoading || undefined}
      {...buttonProps}
    >
      {content}
    </button>
  );
}

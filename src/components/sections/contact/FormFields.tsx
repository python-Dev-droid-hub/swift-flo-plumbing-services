"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

function FieldShell({
  id,
  label,
  error,
  required,
  children,
  className,
}: FieldShellProps) {
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className={cn(
          "text-sm font-medium text-text-primary transition-colors duration-200",
          hasError && "text-red-800",
        )}
      >
        {label}
        {required ? (
          <span className="text-text-link" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-[var(--ease-out-quart)]",
          hasError ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        aria-hidden={!hasError}
      >
        <div className="min-h-0 overflow-hidden">
          <p
            id={errorId}
            role={hasError ? "alert" : undefined}
            className={cn(
              "pt-0.5 text-sm text-red-700 transition-opacity duration-200",
              hasError ? "opacity-100" : "opacity-0",
            )}
          >
            {error ?? "\u00a0"}
          </p>
        </div>
      </div>
    </div>
  );
}

const controlClass = cn(
  "w-full min-h-12 rounded-md border border-border bg-surface px-3.5 py-3 text-base text-text-primary shadow-sm outline-none",
  "transition-[border-color,box-shadow,background-color] duration-200",
  "[transition-timing-function:var(--ease-out-quart)]",
  "placeholder:text-text-muted",
  "hover:border-border-strong",
  "focus:border-brand-secondary focus:bg-surface focus:ring-2 focus:ring-brand-secondary/35",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

const errorControlClass =
  "border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-red-200/80";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function TextField({
  id,
  label,
  error,
  required,
  className,
  ...props
}: TextFieldProps) {
  const fieldId = id ?? props.name ?? label;
  return (
    <FieldShell
      id={fieldId}
      label={label}
      error={error}
      required={required}
      className={className}
    >
      <input
        id={fieldId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(controlClass, error && errorControlClass)}
        {...props}
      />
    </FieldShell>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function TextAreaField({
  id,
  label,
  error,
  required,
  className,
  ...props
}: TextAreaFieldProps) {
  const fieldId = id ?? props.name ?? label;
  return (
    <FieldShell id={fieldId} label={label} error={error} required={required}>
      <textarea
        id={fieldId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(
          controlClass,
          "min-h-[8rem] resize-y",
          error && errorControlClass,
          className,
        )}
        {...props}
      />
    </FieldShell>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  children: ReactNode;
};

export function SelectField({
  id,
  label,
  error,
  required,
  className,
  children,
  ...props
}: SelectFieldProps) {
  const fieldId = id ?? props.name ?? label;
  return (
    <FieldShell id={fieldId} label={label} error={error} required={required}>
      <select
        id={fieldId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(controlClass, error && errorControlClass, className)}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}

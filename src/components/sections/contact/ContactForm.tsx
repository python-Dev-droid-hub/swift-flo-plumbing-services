"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/sections/contact/FormFields";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/animations";
import {
  CONTACT_SERVICE_OPTIONS,
  type ContactFormErrors,
  type ContactFormValues,
} from "@/lib/constants";
import {
  submitContactForm,
  validateContactForm,
} from "@/lib/contact/form";
import { cn } from "@/lib/utils";

const INITIAL: ContactFormValues = {
  fullName: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_DOM_IDS: Record<keyof ContactFormValues, string> = {
  fullName: "name",
  phone: "phone",
  email: "email",
  service: "service",
  message: "message",
};

/**
 * Conversion form — client validation + stub submit ready for a backend.
 */
export function ContactForm({ className }: { className?: string }) {
  const formId = useId();
  const statusId = useId();
  const [values, setValues] = useState<ContactFormValues>(INITIAL);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const update =
    (field: keyof ContactFormValues) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const next = { ...values, [field]: event.target.value };
      setValues(next);
      if (errors[field]) {
        setErrors((current) => {
          const copy = { ...current };
          delete copy[field];
          return copy;
        });
      }
    };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields and try again.");
      const firstInvalid = Object.keys(nextErrors)[0] as
        | keyof ContactFormValues
        | undefined;
      if (firstInvalid) {
        const el = document.getElementById(
          `${formId}-${FIELD_DOM_IDS[firstInvalid]}`,
        );
        el?.focus();
      }
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const result = await submitContactForm(values);
      if (result.ok) {
        setStatus("success");
        setStatusMessage(result.message);
        setValues(INITIAL);
        setErrors({});
        requestAnimationFrame(() => {
          document.getElementById(statusId)?.focus();
        });
      } else {
        setStatus("error");
        setStatusMessage(result.message);
        requestAnimationFrame(() => {
          document.getElementById(statusId)?.focus();
        });
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "We couldn’t send your request. Please try again in a moment.",
      );
      requestAnimationFrame(() => {
        document.getElementById(statusId)?.focus();
      });
    }
  };

  return (
    <div className={cn("relative", className)}>
      <form
        id="contact-form"
        noValidate
        onSubmit={onSubmit}
        className="flex min-w-0 flex-col gap-5 rounded-lg border border-border bg-surface p-5 shadow-md sm:p-6 md:gap-6 md:p-8"
        aria-describedby={status !== "idle" ? statusId : undefined}
        aria-label="Request plumbing service"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id={`${formId}-name`}
            name="fullName"
            label="Full Name"
            autoComplete="name"
            required
            value={values.fullName}
            onChange={update("fullName")}
            error={errors.fullName}
            placeholder="Your full name"
            className="sm:col-span-2"
          />
          <TextField
            id={`${formId}-phone`}
            name="phone"
            label="Phone"
            type="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={update("phone")}
            error={errors.phone}
            placeholder="Best number to reach you"
          />
          <TextField
            id={`${formId}-email`}
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={update("email")}
            error={errors.email}
            placeholder="you@example.com"
          />
        </div>

        <SelectField
          id={`${formId}-service`}
          name="service"
          label="Service"
          required
          value={values.service}
          onChange={update("service")}
          error={errors.service}
        >
          <option value="">Select a service</option>
          {CONTACT_SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectField>

        <TextAreaField
          id={`${formId}-message`}
          name="message"
          label="Message"
          required
          value={values.message}
          onChange={update("message")}
          error={errors.message}
          placeholder="Tell us what’s going on and how we can help."
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-muted">
            Fields marked with * are required.
          </p>
          <MagneticButton className="w-full sm:w-auto">
            <Button
              type="submit"
              size="lg"
              className="w-full min-h-12 sm:w-auto"
              isLoading={status === "submitting"}
              loadingText="Sending…"
            >
              Request Service
            </Button>
          </MagneticButton>
        </div>

        <div
          id={statusId}
          role="status"
          aria-live="polite"
          tabIndex={-1}
          className={cn(
            "rounded-md px-4 py-3 text-sm transition-[opacity,transform,background-color,border-color] duration-200",
            "[transition-timing-function:var(--ease-out-quart)]",
            status === "idle" && "pointer-events-none hidden opacity-0",
            status === "success" &&
              "flex items-start gap-2 border border-brand-secondary/40 bg-brand-secondary/10 text-brand-primary",
            status === "error" &&
              "border border-red-200 bg-red-50 text-red-800",
            status === "submitting" &&
              "border border-border bg-surface-muted text-text-secondary",
          )}
        >
          {status === "success" ? (
            <>
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>{statusMessage}</span>
            </>
          ) : (
            statusMessage
          )}
        </div>
      </form>
    </div>
  );
}

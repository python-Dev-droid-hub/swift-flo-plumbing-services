/**
 * Contact form validation + submit stub.
 * Swap `submitContactForm` for a real API when the backend is ready.
 */

import type {
  ContactFormErrors,
  ContactFormValues,
  ContactSubmitResult,
} from "@/lib/constants/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s()+.-]{7,}$/;

export function validateContactForm(
  values: ContactFormValues,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Name looks too short.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone number.";
  } else if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter an email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.service.trim()) {
    errors.service = "Please select a service.";
  }

  if (!values.message.trim()) {
    errors.message = "Please tell us what you need help with.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Add a bit more detail so we can help.";
  }

  return errors;
}

/**
 * Temporary client-only submit handler.
 * Replace with a real API/Server Action before launch — do not report success until then.
 */
export async function submitContactForm(
  values: ContactFormValues,
): Promise<ContactSubmitResult> {
  await new Promise((resolve) => setTimeout(resolve, 450));

  if (!values.fullName.trim()) {
    return {
      ok: false,
      message: "Something went wrong. Please check the form and try again.",
    };
  }

  // Backend not connected — refuse false “sent” success in production UI.
  return {
    ok: false,
    message:
      "Online requests aren’t connected yet. Please call (629) 238-8322 or email swiftfloplumbing2025@gmail.com.",
  };
}

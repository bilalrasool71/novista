/**
 * Shared contact-form contract.
 *
 * The same validation runs in the browser (for immediate feedback) and on the
 * server (because anything from the browser is untrusted). Keeping one module
 * means the two can never disagree about what is valid.
 */

export const SERVICE_OPTIONS = [
  "Web development",
  "Mobile app development",
  "AI solutions & automation",
  "Digital transformation",
  "One of your products",
  "Not sure yet",
] as const;

export const BUDGET_OPTIONS = [
  "Under $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
  "Prefer to discuss",
] as const;

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  /** Honeypot — must stay empty. Hidden from real users. */
  website: string;
  /** Epoch ms when the form was rendered, used as a timing check. */
  renderedAt: number;
};

export type ContactField = Exclude<keyof ContactPayload, "website" | "renderedAt">;

export type ContactErrors = Partial<Record<ContactField | "form", string>>;

export const EMPTY_CONTACT: Omit<ContactPayload, "renderedAt"> = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
  website: "",
};

const LIMITS = {
  name: 100,
  company: 120,
  email: 254,
  phone: 40,
  service: 60,
  budget: 40,
  message: 4000,
} as const;

/** Deliberately permissive: enough to catch typos, not to reject valid addresses. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
const PHONE_PATTERN = /^[+()\d][\d\s().-]{5,}$/;

/**
 * Drop control characters, then trim and cap the length.
 *
 * Written as an explicit code-point check rather than a regex of escape
 * sequences: a character class of literal control bytes is invisible in an
 * editor and easy to corrupt silently. Tab and newline are kept because the
 * message field is legitimately multi-line.
 */
function stripControlCharacters(value: string): string {
  let out = "";
  for (const character of value) {
    const code = character.codePointAt(0) ?? 0;
    const isTabOrNewline = code === 9 || code === 10;
    const isPrintable = code >= 32 && code !== 127;
    if (isTabOrNewline || isPrintable) out += character;
  }
  return out;
}

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return stripControlCharacters(value).trim().slice(0, max);
}

export type ValidationResult =
  | { ok: true; value: Omit<ContactPayload, "website" | "renderedAt"> }
  | { ok: false; errors: ContactErrors };

export function validateContact(input: Partial<ContactPayload>): ValidationResult {
  const value = {
    name: clean(input.name, LIMITS.name),
    company: clean(input.company, LIMITS.company),
    email: clean(input.email, LIMITS.email).toLowerCase(),
    phone: clean(input.phone, LIMITS.phone),
    service: clean(input.service, LIMITS.service),
    budget: clean(input.budget, LIMITS.budget),
    message: clean(input.message, LIMITS.message),
  };

  const errors: ContactErrors = {};

  if (value.name.length < 2) {
    errors.name = "Please tell us your name.";
  }

  if (value.company.length < 2) {
    errors.company = "Your company or project name is enough.";
  }

  if (!value.email) {
    errors.email = "We need an email address to reply to.";
  } else if (!EMAIL_PATTERN.test(value.email)) {
    errors.email = "That email address does not look right.";
  }

  if (value.phone && !PHONE_PATTERN.test(value.phone)) {
    errors.phone = "Please enter a valid phone number, or leave this blank.";
  }

  if (!value.service) {
    errors.service = "Choose the area closest to what you need.";
  } else if (!SERVICE_OPTIONS.includes(value.service as (typeof SERVICE_OPTIONS)[number])) {
    errors.service = "Choose one of the listed options.";
  }

  if (
    value.budget &&
    !BUDGET_OPTIONS.includes(value.budget as (typeof BUDGET_OPTIONS)[number])
  ) {
    errors.budget = "Choose one of the listed options.";
  }

  if (value.message.length < 20) {
    errors.message =
      "A couple of sentences about what you are trying to achieve helps us reply usefully.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, value };
}

/**
 * Spam checks that only run server-side. A real person cannot fill and submit
 * this form in under three seconds, and cannot see the honeypot field at all.
 */
export function looksAutomated(input: Partial<ContactPayload>): boolean {
  if (typeof input.website === "string" && input.website.trim() !== "") {
    return true;
  }

  const renderedAt = Number(input.renderedAt);
  if (!Number.isFinite(renderedAt)) return false;

  const elapsed = Date.now() - renderedAt;
  return elapsed >= 0 && elapsed < 3000;
}

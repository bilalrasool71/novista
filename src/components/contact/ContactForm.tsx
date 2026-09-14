"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CircleAlert, CircleCheck, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  BUDGET_OPTIONS,
  type ContactErrors,
  type ContactField,
  EMPTY_CONTACT,
  SERVICE_OPTIONS,
  validateContact,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const FIELD_BASE =
  "w-full rounded-xl border bg-surface px-4 py-3 text-[0.9375rem] text-ink " +
  "placeholder:text-muted transition-[border-color,box-shadow] duration-200 " +
  "focus:outline-none focus-visible:outline-none";

const FIELD_OK =
  "border-line focus:border-ink focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-g2)_25%,transparent)]";
const FIELD_BAD =
  "border-danger-icon focus:border-danger-icon focus:ring-4 focus:ring-danger-icon/20";

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState(EMPTY_CONTACT);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLDivElement>(null);

  /**
   * Set after mount rather than during render: a server-rendered timestamp
   * would differ from the client's and break hydration.
   */
  const renderedAt = useRef(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  // Move focus to the confirmation so screen readers announce the result.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function update(field: keyof typeof EMPTY_CONTACT, value: string) {
    setValues((current) => ({ ...current, [field]: value }));

    // Clear an error as soon as the user starts correcting it.
    setErrors((current) => {
      if (!current[field as ContactField]) return current;
      const next = { ...current };
      delete next[field as ContactField];
      return next;
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const result = validateContact(values);

    if (!result.ok) {
      setErrors(result.errors);
      // Focus the first invalid field so keyboard users are not left guessing.
      const firstField = Object.keys(result.errors)[0];
      document.getElementById(`${formId}-${firstField}`)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, renderedAt: renderedAt.current }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        errors?: ContactErrors;
        message?: string;
      };

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus("error");
        setErrors((current) => ({
          ...current,
          form:
            data.message ??
            "Something went wrong sending your message. Please try again, or email us directly.",
        }));
        return;
      }

      setStatus("success");
      // Conversion event, only if analytics is actually configured.
      window.gtag?.("event", "generate_lead", {
        event_category: "contact",
        event_label: values.service,
      });
    } catch {
      setStatus("error");
      setErrors({
        form: "We could not reach the server. Please check your connection, or email us directly.",
      });
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="border-line bg-surface-2 rounded-3xl p-8 text-center border sm:p-10"
      >
        <span className="bg-surface-2 text-ink mx-auto grid size-14 place-items-center rounded-xl">
          <CircleCheck aria-hidden="true" className="size-7" />
        </span>
        <h3 className="text-ink mt-5 text-xl font-semibold">
          Thanks — your message is on its way.
        </h3>
        <p className="text-muted mx-auto mt-3 max-w-md leading-relaxed">
          We read every enquiry ourselves and reply within one business day. If it
          is urgent, email us directly and mention that you have already filled in
          the form.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            setValues(EMPTY_CONTACT);
            setErrors({});
            setStatus("idle");
            renderedAt.current = Date.now();
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="border-line rounded-3xl bg-surface p-6 border sm:p-8"
    >
      {errors.form ? (
        <div
          role="alert"
          className="mb-6 flex gap-3 rounded-xl border-danger-line bg-danger border p-4"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-danger-icon" />
          <p className="text-[0.9375rem] text-danger-ink">{errors.form}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Name"
          error={errors.name}
          required
        >
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            className={cn(FIELD_BASE, errors.name ? FIELD_BAD : FIELD_OK)}
            placeholder="Your full name"
          />
        </Field>

        <Field
          id={`${formId}-company`}
          label="Company"
          error={errors.company}
          required
        >
          <input
            id={`${formId}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? `${formId}-company-error` : undefined}
            className={cn(FIELD_BASE, errors.company ? FIELD_BAD : FIELD_OK)}
            placeholder="Company or project name"
          />
        </Field>

        <Field
          id={`${formId}-email`}
          label="Email"
          error={errors.email}
          required
        >
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            className={cn(FIELD_BASE, errors.email ? FIELD_BAD : FIELD_OK)}
            placeholder="you@company.com"
          />
        </Field>

        <Field
          id={`${formId}-phone`}
          label="Phone"
          hint="Optional"
          error={errors.phone}
        >
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            className={cn(FIELD_BASE, errors.phone ? FIELD_BAD : FIELD_OK)}
            placeholder="Include country code"
          />
        </Field>

        <Field
          id={`${formId}-service`}
          label="What do you need?"
          error={errors.service}
          required
        >
          <select
            id={`${formId}-service`}
            name="service"
            value={values.service}
            onChange={(event) => update("service", event.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? `${formId}-service-error` : undefined}
            className={cn(FIELD_BASE, errors.service ? FIELD_BAD : FIELD_OK)}
          >
            <option value="">Select an area</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id={`${formId}-budget`}
          label="Budget range"
          hint="Optional"
          error={errors.budget}
        >
          <select
            id={`${formId}-budget`}
            name="budget"
            value={values.budget}
            onChange={(event) => update("budget", event.target.value)}
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? `${formId}-budget-error` : undefined}
            className={cn(FIELD_BASE, errors.budget ? FIELD_BAD : FIELD_OK)}
          >
            <option value="">Prefer not to say</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field
          id={`${formId}-message`}
          label="Project details"
          error={errors.message}
          required
        >
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${formId}-message-error` : undefined}
            className={cn(FIELD_BASE, "resize-y", errors.message ? FIELD_BAD : FIELD_OK)}
            placeholder="What are you trying to achieve? What is not working today? Any deadline we should know about?"
          />
        </Field>
      </div>

      {/*
        Honeypot. Hidden from users and from assistive technology; bots that
        fill every field give themselves away.
      */}
      <div aria-hidden="true" className="h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Let&apos;s Talk
              <Send aria-hidden="true" className="size-4" />
            </>
          )}
        </Button>

        <p className="text-muted text-sm">
          We use your details only to reply to this enquiry.{" "}
          <a
            href="/privacy-policy"
            className="text-accent-2 hover:text-accent-2 font-medium underline underline-offset-2 transition-colors duration-200"
          >
            Privacy Policy
          </a>
        </p>
      </div>

      <p aria-live="polite" className="sr-only">
        {isSubmitting ? "Sending your message" : ""}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-muted mb-1.5 flex items-baseline gap-2 text-sm font-semibold"
      >
        {label}
        {required ? (
          <span className="text-accent-2" aria-hidden="true">
            *
          </span>
        ) : null}
        {hint ? <span className="text-muted font-normal">{hint}</span> : null}
      </label>

      {children}

      {error ? (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-start gap-1.5 text-sm text-danger-icon"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

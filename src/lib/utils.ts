/**
 * Join class names, dropping falsey values.
 *
 * Deliberately not clsx + tailwind-merge: the components in this project do
 * not fight over conflicting utilities, so a 6-line helper is enough and
 * saves two dependencies.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const DATE_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  // Fixed time zone so server and client render identical strings.
  timeZone: "UTC",
});

/** "24 April 2026" — stable across server and client. */
export function formatDate(iso: string): string {
  return DATE_FORMATTER.format(new Date(`${iso}T00:00:00Z`));
}

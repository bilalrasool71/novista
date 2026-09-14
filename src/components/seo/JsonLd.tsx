/**
 * Emits a JSON-LD script tag.
 *
 * `<` is escaped so a stray "</script>" inside any content value can never
 * break out of the script element. All data here is authored by us, but the
 * escape costs nothing and removes the failure mode entirely.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

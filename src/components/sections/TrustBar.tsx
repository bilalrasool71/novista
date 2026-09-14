import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { trustStats } from "@/content/site";

/**
 * Only stats with a real value are published — anything still `null` in
 * content/site.ts is skipped rather than shown as a placeholder, so the site
 * never implies numbers we cannot evidence.
 */
export function TrustBar() {
  const stats = trustStats.filter((stat) => stat.value !== null);
  if (stats.length === 0) return null;

  return (
    <section aria-labelledby="trust-heading" className="bg-surface-2">
      <Container>
        <div className="py-16 sm:py-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2
              id="trust-heading"
              className="text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight"
            >
              Built for businesses that are ready to move forward
            </h2>
          </Reveal>

          <dl className="mt-12 grid gap-5 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 80}>
                <div className="border-line card-elev h-full rounded-3xl border bg-surface p-6 text-center">
                  <dt className="text-gradient text-4xl font-extrabold tracking-tight">
                    {stat.value}
                  </dt>
                  <dd className="mt-2">
                    <span className="text-ink block font-semibold">
                      {stat.label}
                    </span>
                    {stat.detail ? (
                      <span className="text-muted mt-1.5 block text-sm leading-[1.55]">
                        {stat.detail}
                      </span>
                    ) : null}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

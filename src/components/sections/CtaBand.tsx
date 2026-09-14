import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/content/site";

/**
 * The closing conversion block: one inverted band, the invitation set at
 * display scale, the actions in the column beside it. Used at the foot of
 * nearly every page, so the wording is overridable.
 */
export function CtaBand({
  title = "Have an idea, challenge, or project in mind?",
  description = "Tell us what you are trying to achieve. We will help you figure out the best way forward — and tell you honestly if we are not the right fit.",
  primaryLabel = "Start a Project",
  primaryHref = "/contact",
  secondaryLabel = "Explore Our Services",
  secondaryHref = "/services",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-night text-night-muted relative overflow-hidden">
      <div
        aria-hidden="true"
        className="night-wash pointer-events-none absolute inset-0 opacity-70"
      />

      <Container className="relative">
        <Reveal>
          <div className="grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-10 lg:py-32">
            <h2 className="text-night-ink text-[clamp(2.25rem,5.4vw,4.5rem)] leading-[1.08] tracking-[-0.03em] lg:col-span-7">
              {title}
            </h2>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-night-muted text-[1.0625rem] leading-[1.6]">
                {description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={primaryHref} variant="secondary" size="lg" withArrow>
                  {primaryLabel}
                </Button>
                <Button href={secondaryHref} variant="secondary" size="lg">
                  {secondaryLabel}
                </Button>
              </div>

              <p className="rule-dark text-night-muted mt-10 pt-6 text-sm">
                Prefer email?{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="text-night-ink underline-offset-4 transition-opacity duration-200 hover:opacity-70 hover:underline"
                >
                  {contact.email}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { Aurora } from "@/components/visuals/Aurora";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * The masthead every interior page opens with.
 *
 * Set as an editorial two-column masthead rather than a centred banner: the
 * title holds the left seven columns so its measure stays near 20 characters
 * a line, and the deck sits in the right column against a hairline, aligned
 * to the foot of the title. Pages that pass an `aside` get the card in that
 * right column instead and the deck moves under the title.
 *
 * Nothing here uses a scroll reveal — it is above the fold on every page it
 * appears on, so it must paint immediately.
 */
export function PageHero({
  label,
  title,
  description,
  crumbs,
  actions,
  aside,
}: {
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs: Crumb[];
  actions?: React.ReactNode;
  /** Optional card alongside the heading, used by the detail pages. */
  aside?: React.ReactNode;
}) {
  const deck = description ? (
    <div
      className={cn(
        "text-muted text-[1.0625rem] leading-[1.7]",
        aside ? "mt-7 max-w-2xl" : "border-line lg:border-l lg:pl-7",
      )}
    >
      {description}
    </div>
  ) : null;

  const buttons = actions ? (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center",
        aside ? "mt-9" : "mt-8",
      )}
    >
      {actions}
    </div>
  ) : null;

  return (
    <section className="border-line relative overflow-hidden border-b">
      <Aurora />

      <Container className="relative">
        <div className="pt-6 pb-16 sm:pb-20 lg:pb-24">
          <Breadcrumbs crumbs={crumbs} className="mb-10 sm:mb-14" />

          <div
            className={cn(
              "grid gap-x-10 gap-y-9 lg:grid-cols-12",
              // The deck hangs off the foot of the title; a card does not.
              aside ? "items-start" : "items-end",
            )}
          >
            <div className="lg:col-span-7">
              {label ? (
                <p className="eyebrow text-accent-2 mb-5 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="bg-gradient-brand h-px w-7 shrink-0 rounded-full"
                  />
                  {label}
                </p>
              ) : null}

              <h1 className="font-display text-ink text-[clamp(2.125rem,3.7vw,3.5rem)] leading-[1.04] font-semibold tracking-[-0.03em]">
                {title}
              </h1>

              {aside ? deck : null}
              {aside ? buttons : null}
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              {aside ?? (
                <>
                  {deck}
                  {buttons}
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

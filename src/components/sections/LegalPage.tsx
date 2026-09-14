import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/utils";

/**
 * Shared shell and typography for policy pages, so legal content is written
 * as plain semantic markup without each page restating the same classes.
 */
export function LegalPage({
  title,
  intro,
  updatedAt,
  crumbs,
  children,
}: {
  title: string;
  intro: string;
  /** ISO date the policy last changed. */
  updatedAt: string;
  crumbs: Crumb[];
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="relative overflow-hidden">
        <Container size="narrow" className="relative pt-8 pb-10 sm:pt-10">
          <Breadcrumbs crumbs={crumbs} className="mb-8" />

          <h1 className="text-[2rem] leading-tight font-semibold tracking-[-0.03em] sm:text-[2.5rem]">
            {title}
          </h1>

          <p className="text-muted mt-5 text-lg leading-relaxed">{intro}</p>

          <p className="text-muted mt-6 text-sm">
            Last updated{" "}
            <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
          </p>
        </Container>
      </header>

      <Container size="narrow" className="pb-18 sm:pb-24">
        <div
          className={[
            // Section headings
            "[&_h2]:font-display [&_h2]:text-ink [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:scroll-mt-28 [&_h2]:text-xl [&_h2]:font-semibold sm:[&_h2]:text-2xl",
            "[&_h3]:font-display [&_h3]:text-ink [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold",
            // Body
            "[&_p]:text-muted [&_p]:mt-4 [&_p]:leading-[1.75]",
            "[&_ul]:mt-4 [&_ul]:space-y-2.5",
            "[&_li]:text-muted [&_li]:relative [&_li]:pl-6 [&_li]:leading-[1.7]",
            "[&_li]:before:bg-accent-2 [&_li]:before:absolute [&_li]:before:top-[0.65em] [&_li]:before:left-0 [&_li]:before:size-1.5 [&_li]:before:rounded-full [&_li]:before:content-['']",
            "[&_a]:text-accent-2 [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-ink",
            "[&_strong]:text-ink [&_strong]:font-semibold",
          ].join(" ")}
        >
          {children}
        </div>
      </Container>
    </>
  );
}

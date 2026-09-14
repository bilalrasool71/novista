import { Aurora } from "@/components/visuals/Aurora";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** `panel` is the recessed ground; `feature` adds the brand light. */
export type SectionTone = "surface" | "panel" | "feature";

export function Section({
  children,
  id,
  tone = "surface",
  className,
  containerSize = "default",
  as: Tag = "section",
  labelledBy,
}: {
  children: React.ReactNode;
  id?: string;
  tone?: SectionTone;
  className?: string;
  containerSize?: "default" | "narrow" | "wide";
  as?: "section" | "div";
  labelledBy?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative",
        tone === "panel" && "bg-surface border-line border-y",
        tone === "feature" && "border-line border-y",
        className,
      )}
    >
      {tone === "feature" ? <Aurora /> : null}

      <Container size={containerSize} className="relative">
        <div className="py-20 sm:py-24 lg:py-28">{children}</div>
      </Container>
    </Tag>
  );
}

/**
 * Label above the heading, then a split title/description row. The short
 * gradient rule before the label is the same device `PageHero` uses, so a
 * section header and a page masthead read as one system.
 */
export function SectionHeading({
  index,
  label,
  title,
  description,
  id,
  level = "h2",
  className,
  align = "split",
}: {
  /** e.g. "02" — rendered as a monospace index beside the label. */
  index?: string;
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  id?: string;
  level?: "h1" | "h2";
  className?: string;
  align?: "split" | "left" | "center";
}) {
  const Heading = level;

  /**
   * A split with nothing to put in the right column is just a heading squeezed
   * into half the width — and when this component sits inside a column that is
   * already narrow, that second split can leave the title with barely two
   * columns to wrap in. Collapse to the full measure instead.
   */
  const layout = align === "split" && !description ? "left" : align;

  return (
    <Reveal className={cn(layout === "center" && "mx-auto max-w-3xl text-center", className)}>
      {label || index ? (
        <div
          className={cn(
            "mb-6 flex items-center gap-3",
            layout === "center" && "justify-center",
          )}
        >
          <span
            aria-hidden="true"
            className="bg-gradient-brand h-px w-7 shrink-0 rounded-full"
          />
          {index ? <span className="eyebrow text-muted">{index}</span> : null}
          {label ? <span className="eyebrow text-accent-2">{label}</span> : null}
        </div>
      ) : null}

      <div className={cn(layout === "split" && "grid gap-8 lg:grid-cols-12 lg:gap-10")}>
        <Heading
          id={id}
          className={cn(
            "text-[clamp(1.875rem,3.6vw,2.875rem)] leading-[1.08]",
            layout === "split" && "lg:col-span-6",
            layout === "left" && "max-w-2xl",
          )}
        >
          {title}
        </Heading>

        {description ? (
          <div
            className={cn(
              "text-muted text-[1.0625rem] leading-[1.65]",
              layout === "split"
                ? "lg:col-span-5 lg:col-start-8 lg:pt-1.5"
                : "mt-5 max-w-2xl",
              layout === "center" && "mx-auto",
            )}
          >
            {description}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

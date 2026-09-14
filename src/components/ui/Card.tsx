import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * A panel that sits on the page surface. Elevation comes from a hairline
 * border plus a top-edge highlight; hover adds brand light rather than a
 * heavier shadow, which keeps the dark theme from going muddy.
 */
export type CardTone = "surface" | "panel" | "feature";

const BASE =
  "group relative flex h-full flex-col rounded-3xl border border-line bg-surface " +
  " transition-[border-color,box-shadow,transform] duration-300";

const INTERACTIVE =
  "hover:-translate-y-1 hover:border-accent-2/50 hover:shadow-[var(--shadow-lift)] " +
  // A press that actually lands: the card settles back before it navigates.
  "active:translate-y-0 active:duration-100";

export function Card({
  children,
  href,
  className,
  padded = true,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Makes the whole card a single link — one tab stop, one large target. */
  href?: string;
  className?: string;
  /** Off when the card starts with a full-bleed preview. */
  padded?: boolean;
  as?: "div" | "article" | "li";
}) {
  const classes = cn(BASE, padded && "p-6", href && INTERACTIVE, className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <Tag className={classes}>{children}</Tag>;
}

/** Icon tile. Fills with brand on hover when the card is a link. */
export function CardIcon({
  icon: Icon,
  className,
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "border-line bg-surface-2 text-accent-2 grid size-10 shrink-0 place-items-center rounded-xl border transition-colors duration-300",
        "group-hover:border-g2 group-hover:bg-g2 group-hover:text-white",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-5" />
    </span>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-ink text-lg leading-snug font-bold", className)}>
      {children}
    </h3>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-muted text-[0.9375rem] leading-[1.6]", className)}>
      {children}
    </p>
  );
}

/** Short capability chips along the body of a card. */
export function CardChips({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("mt-5 flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="border-line bg-surface-2 text-muted rounded-full border px-2.5 py-1 font-label text-[0.6875rem] font-medium"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** The affordance at the foot of a linked card. */
export function CardAction({ children = "Learn more" }: { children?: React.ReactNode }) {
  return (
    <span className="text-accent-2 mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.9375rem] font-semibold">
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
      />
    </span>
  );
}

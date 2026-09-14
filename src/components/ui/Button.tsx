import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Pill geometry throughout. The primary action is solid ink and only reveals
 * the brand gradient on hover — so the gradient stays an event rather than
 * background noise.
 */
export type ButtonVariant =
  | "primary"
  | "brand"
  | "secondary"
  | "ghost"
  | "quiet";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-medium " +
  "whitespace-nowrap transition-[transform,background,border-color,color,box-shadow] duration-300 " +
  "hover:-translate-y-0.5 active:translate-y-0 active:duration-75 " +
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-bg hover:bg-gradient-brand hover:text-white hover:shadow-[var(--shadow-glow)]",
  // Carries brand colour permanently, so the one action in the header is
  // never mistaken for the nav pill sitting beside it.
  brand:
    "bg-gradient-cta text-white hover:bg-right hover:shadow-[var(--shadow-glow)]",
  secondary: "border border-line bg-surface text-ink hover:border-ink card-elev",
  ghost: "text-muted hover:text-ink",
  quiet: "text-ink underline-grow",
};

const SIZES: Record<ButtonSize, string> = {
  // min-h keeps every control above the 44px touch-target guideline.
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-[0.9375rem]",
  lg: "min-h-14 px-6 text-base",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  withArrow?: boolean;
  fullWidth?: boolean;
};

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
  /** Mainly so a menu can close itself when the link is an in-page anchor. */
  onClick?: () => void;
};
type NativeButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type StyleProps = Pick<CommonProps, "variant" | "size" | "fullWidth" | "className">;

function classes({ variant = "primary", size = "md", fullWidth, className }: StyleProps) {
  return cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && "w-full", className);
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
    />
  );
}

export function Button(props: LinkProps | NativeButtonProps) {
  if (typeof props.href === "string") {
    const { href, external, children, withArrow, onClick, ...rest } =
      props as LinkProps;

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className={classes(rest)}
        >
          {children}
          {withArrow ? <Arrow /> : null}
        </a>
      );
    }

    return (
      <Link href={href} onClick={onClick} className={classes(rest)}>
        {children}
        {withArrow ? <Arrow /> : null}
      </Link>
    );
  }

  const { children, withArrow, variant, size, fullWidth, className, ...buttonProps } =
    props as NativeButtonProps;

  return (
    <button {...buttonProps} className={classes({ variant, size, fullWidth, className })}>
      {children}
      {withArrow ? <Arrow /> : null}
    </button>
  );
}

/** An inline action link with the growing underline. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group text-ink underline-grow inline-flex items-center gap-1.5 text-[0.9375rem] font-medium",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}

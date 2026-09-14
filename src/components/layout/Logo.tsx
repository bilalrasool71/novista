import Image from "next/image";
import Link from "next/link";

import { logo, site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Renders the brand file from `logo.src` when one is configured, and falls
 * back to a built-in wordmark until then, so the header is never broken.
 *
 * The supplied mark is navy on transparency. That reads on the light theme
 * but vanishes on the dark header and on the night-ground footer, so both
 * variants are rendered and CSS picks one — no state, no flash, and the
 * correct mark is in the HTML before hydration either way.
 */
function FallbackMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={cn("size-9", className)}
    >
      <defs>
        <linearGradient id="novista-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2e9be0" />
          <stop offset="55%" stopColor="#1e5fa8" />
          <stop offset="100%" stopColor="#16294b" />
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="10" fill="url(#novista-mark)" />
      <path
        d="M18 7.4c.9 5.8 4.8 9.7 10.6 10.6C22.8 18.9 18.9 22.8 18 28.6c-.9-5.8-4.8-9.7-10.6-10.6C13.2 17.1 17.1 13.2 18 7.4Z"
        fill="#fff"
      />
    </svg>
  );
}

export type LogoTone = "auto" | "night";

export function LogoMark({
  className,
  tone = "auto",
}: {
  className?: string;
  tone?: LogoTone;
}) {
  if (!logo.src) return <FallbackMark className={className} />;

  const common = {
    width: logo.width,
    height: logo.height,
    priority: true,
    className: cn("size-9 object-contain", className),
  };

  // Always reversed: the footer's ground is dark in both themes.
  if (tone === "night") {
    return <Image {...common} src={logo.light} alt="" />;
  }

  return (
    <>
      <Image
        {...common}
        src={logo.src}
        alt=""
        className={cn(common.className, "dark:hidden")}
      />
      <Image
        {...common}
        src={logo.light}
        alt=""
        className={cn(common.className, "hidden dark:block")}
      />
    </>
  );
}

export function Logo({
  className,
  href = "/",
  tone = "auto",
}: {
  className?: string;
  href?: string;
  /**
   * `night` pins the wordmark to the fixed on-night tones, for the footer and
   * any other block sitting on `--color-night` in both themes.
   */
  tone?: LogoTone;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/logo inline-flex items-center gap-2.5 rounded-lg transition-opacity duration-200 hover:opacity-80",
        className,
      )}
      aria-label={`${site.name} — home`}
    >
      <span className="flex size-9 shrink-0 items-center justify-center">
        <LogoMark tone={tone} className="size-9" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.0625rem] font-extrabold tracking-tight",
            tone === "night" ? "text-night-ink" : "text-ink",
          )}
        >
          Novista
        </span>
        <span
          className={cn(
            "font-label mt-1 text-[0.625rem] font-semibold tracking-[0.18em] uppercase",
            tone === "night" ? "text-night-muted" : "text-muted",
          )}
        >
          Solutions
        </span>
      </span>
    </Link>
  );
}

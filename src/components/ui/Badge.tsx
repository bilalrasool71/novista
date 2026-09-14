import { cn } from "@/lib/utils";

export type BadgeTone =
  | "accent"
  | "neutral"
  | "positive"
  | "onDark"
  | "notice";

/** Each tone has to be tellable apart at a glance — a status badge that
 *  renders identically whatever the status carries no information. */
const TONES: Record<BadgeTone, string> = {
  accent: "bg-accent/10 text-accent-2 border-accent/25",
  neutral: "bg-surface-2 text-muted border-line",
  positive: "bg-positive text-positive-ink border-positive-line",
  onDark: "bg-white/12 text-night-ink border-white/20",
  notice: "bg-notice text-notice-ink border-notice-line",
};

export function Badge({
  children,
  tone = "neutral",
  className,
  icon: Icon,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        TONES[tone],
        className,
      )}
    >
      {Icon ? <Icon aria-hidden className="size-3.5" /> : null}
      {children}
    </span>
  );
}

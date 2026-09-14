import { cn } from "@/lib/utils";

/**
 * Platform previews.
 *
 * Small, stylised interfaces drawn entirely in markup — one per kind of
 * product Novista runs. No screenshots to keep in sync, no image requests, no
 * layout shift, and they inherit the theme so they work on both surfaces.
 *
 * Every value is fixed rather than generated, so server and client render
 * identical markup. Labels are generic on purpose: nothing here should read
 * as a claim about a specific client's numbers.
 */

export type PreviewKind =
  | "roster"
  | "chart"
  | "checkout"
  | "pipeline"
  | "agent"
  | "lab";

function Bar({ w, tone = "line" }: { w: string; tone?: "line" | "brand" }) {
  return (
    <span
      style={{ width: w }}
      className={cn(
        "block h-1.5 rounded-full",
        tone === "brand" ? "bg-accent-2/60" : "bg-muted/25",
      )}
    />
  );
}

function Roster() {
  return (
    <div className="space-y-2 p-3">
      {[
        { w: "62%", on: true },
        { w: "48%", on: false },
        { w: "70%", on: true },
        { w: "40%", on: false },
      ].map((row, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className={cn(
              "size-4 shrink-0 rounded-full",
              row.on ? "bg-accent-2/50" : "bg-muted/20",
            )}
          />
          <Bar w={row.w} />
          <span className="ml-auto">
            <Bar w="18px" tone={row.on ? "brand" : "line"} />
          </span>
        </div>
      ))}
    </div>
  );
}

function Chart() {
  const bars = [38, 54, 44, 68, 58, 82];
  return (
    <div className="p-3">
      <div className="flex h-16 items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className={cn(
              "flex-1 rounded-t-sm",
              i === bars.length - 1
                ? "from-g2 to-g3 bg-gradient-to-t"
                : "bg-muted/20",
            )}
          />
        ))}
      </div>
      <div className="border-line mt-2.5 flex items-center justify-between border-t pt-2">
        <Bar w="34%" />
        <Bar w="20%" tone="brand" />
      </div>
    </div>
  );
}

function Checkout() {
  return (
    <div className="p-3">
      <div className="space-y-2">
        {["58%", "44%", "66%"].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <Bar w={w} />
            <span className="ml-auto">
              <Bar w="22px" />
            </span>
          </div>
        ))}
      </div>
      <div className="border-line mt-3 flex items-center justify-between border-t pt-2.5">
        <Bar w="30%" />
        <span className="bg-accent-2 h-4 w-14 rounded-md" />
      </div>
    </div>
  );
}

function Pipeline() {
  const cols = [
    [1, 1, 0],
    [1, 0, 0],
    [1, 1, 1],
  ];
  return (
    <div className="grid grid-cols-3 gap-1.5 p-3">
      {cols.map((col, ci) => (
        <div key={ci} className="space-y-1.5">
          <span className="bg-muted/25 block h-1 w-8 rounded-full" />
          {col.map((filled, ri) => (
            <div
              key={ri}
              className={cn(
                "h-5 rounded-md border",
                filled
                  ? ci === 2 && ri === 0
                    ? "border-accent-2/50 bg-surface-2"
                    : "border-line bg-surface"
                  : "border-line/60 border-dashed",
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Agent() {
  return (
    <div className="space-y-2 p-3">
      <div className="flex items-start gap-2">
        <span className="bg-muted/25 size-4 shrink-0 rounded-md" />
        <span className="bg-muted/20 h-6 flex-1 rounded-lg rounded-tl-sm" />
      </div>
      <div className="flex items-start justify-end gap-2">
        <span className="bg-accent-2/25 border-accent-2/40 h-8 w-3/4 rounded-lg rounded-tr-sm border" />
        <span className="bg-accent-2/60 size-4 shrink-0 rounded-md" />
      </div>
      <div className="flex items-center gap-1.5 pt-0.5">
        <span className="bg-accent size-1.5 animate-pulse rounded-full" />
        <span className="text-muted font-label text-[0.5625rem]">running</span>
      </div>
    </div>
  );
}

function Lab() {
  return (
    <div className="p-3">
      {[
        { w: "56%", state: "done" },
        { w: "44%", state: "run" },
        { w: "62%", state: "wait" },
      ].map((row, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center gap-2 py-1.5",
            i > 0 && "border-line border-t",
          )}
        >
          <span className="bg-muted/30 h-3 w-1 rounded-full" />
          <Bar w={row.w} />
          <span
            className={cn(
              "ml-auto size-2 shrink-0 rounded-full",
              row.state === "done"
                ? "bg-accent"
                : row.state === "run"
                  ? "bg-accent-2"
                  : "bg-muted/25",
            )}
          />
        </div>
      ))}
    </div>
  );
}

const KINDS: Record<PreviewKind, () => React.ReactElement> = {
  roster: Roster,
  chart: Chart,
  checkout: Checkout,
  pipeline: Pipeline,
  agent: Agent,
  lab: Lab,
};

/** A framed platform preview: window chrome plus the body for its kind. */
export function PlatformPreview({
  kind,
  title,
  className,
}: {
  kind: PreviewKind;
  title: string;
  className?: string;
}) {
  const Body = KINDS[kind];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "border-line bg-surface card-elev overflow-hidden rounded-xl border select-none",
        className,
      )}
    >
      <div className="border-line bg-surface-2 flex items-center gap-2 border-b px-3 py-2">
        <span className="flex gap-1">
          <span className="bg-muted/30 size-1.5 rounded-full" />
          <span className="bg-muted/30 size-1.5 rounded-full" />
          <span className="bg-muted/30 size-1.5 rounded-full" />
        </span>
        <span className="text-muted truncate font-label text-[0.625rem]">{title}</span>
      </div>
      <Body />
    </div>
  );
}

/** Maps a product slug to the interface that best represents it. */
export function previewForProduct(slug: string): PreviewKind {
  if (["point-of-sale", "pharmacy-management", "accounting"].includes(slug)) {
    return "checkout";
  }
  if (["erp", "distribution-management"].includes(slug)) return "chart";
  if (["crm"].includes(slug)) return "pipeline";
  if (["ai-agents", "ai-enabled-solutions"].includes(slug)) return "agent";
  if (["laboratory-management"].includes(slug)) return "lab";
  return "roster";
}

/**
 * Soft colour light behind a section — the system's replacement for any kind
 * of grid or pattern.
 *
 * The blobs are promoted to their own compositor layer so a 60px blur is
 * painted once rather than on every scroll frame, and they only animate on
 * larger screens where the cost is affordable.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className ?? ""}`}
    >
      <div
        className="aurora-blob aurora-animate-1"
        style={{
          top: "-22%",
          left: "-14%",
          width: "34%",
          height: "40%",
          background: "var(--color-aurora-1)",
        }}
      />
      <div
        className="aurora-blob aurora-animate-2"
        style={{
          top: "18%",
          right: "-12%",
          width: "32%",
          height: "38%",
          background: "var(--color-aurora-2)",
        }}
      />
    </div>
  );
}

/** Fixed film grain over the whole document. Rendered once in the layout. */
export function Grain() {
  return <div aria-hidden="true" className="grain-overlay" />;
}

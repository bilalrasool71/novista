import { PlatformPreview, previewForProduct } from "@/components/visuals/previews";
import { products } from "@/content/products";
import { cn } from "@/lib/utils";

/**
 * The hero's centrepiece: the product estate, moving.
 *
 * Two columns drift in opposite directions so the wall reads as alive without
 * anything blinking or demanding attention. Each column's track holds two
 * copies of its list, and the animation translates by exactly -50%, which is
 * what makes the loop seamless.
 *
 * The whole thing is decorative — the products are reachable as real links in
 * the products section and the footer — so it is hidden from assistive
 * technology rather than duplicating twelve destinations in the tab order.
 *
 * Under `prefers-reduced-motion` the animation is disabled in globals.css and
 * the wall simply rests as a static grid.
 */
function Column({
  slice,
  direction,
  duration,
  className,
}: {
  slice: typeof products;
  direction: "up" | "down";
  duration: string;
  className?: string;
}) {
  // Two copies: the second is what the first scrolls into.
  const track = [...slice, ...slice];

  return (
    <div className={cn("mask-fade-y overflow-hidden", className)}>
      <div
        style={{ "--marquee-duration": duration } as React.CSSProperties}
        className={cn(
          "flex flex-col gap-4",
          direction === "up" ? "marquee-up" : "marquee-down",
        )}
      >
        {track.map((product, index) => (
          <PlatformPreview
            key={`${product.slug}-${index}`}
            kind={previewForProduct(product.slug)}
            title={product.name}
          />
        ))}
      </div>
    </div>
  );
}

export function PlatformWall({ className }: { className?: string }) {
  const half = Math.ceil(products.length / 2);
  const left = products.slice(0, half);
  const right = products.slice(half);

  return (
    <div
      aria-hidden="true"
      className={cn("grid grid-cols-2 gap-4", className)}
    >
      <Column slice={left} direction="up" duration="52s" />
      <Column slice={right} direction="down" duration="64s" className="mt-8" />
    </div>
  );
}

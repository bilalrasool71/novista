"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * A single indicator that glides between nav items.
 *
 * One pill exists, not one per item. It sits under the current section, moves
 * to whatever the pointer is over, and settles back when the pointer leaves —
 * so the nav reads as one object responding to you rather than six
 * independent things lighting up.
 *
 * The labels inside the pill are inverted by a *clipped duplicate* of the nav
 * rather than by switching each item's own colour. Switching colours falls
 * apart the moment the pill starts moving: the item being left turns dark
 * while the pill is still over it, and the item being approached turns light
 * before the pill arrives, so for most of the slide some label is sitting on
 * the wrong background. The duplicate is clipped to exactly the pill's
 * rectangle and animates on the same curve, so the inversion is always
 * precisely where the pill is — frame for frame, including mid-flight.
 *
 * Positions are measured from the DOM instead of computed, so the indicator
 * stays correct through font swaps, resizes and label changes without anyone
 * keeping a table of widths in sync.
 */
export function useNavRail(activeIndex: number) {
  const listRef = useRef<HTMLUListElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  /** Kept through the empty state so the pill fades out in place. */
  const [box, setBox] = useState({ x: 0, w: 0, list: 0 });
  /**
   * Transitions stay off until the first measurement has painted. Otherwise
   * the indicator grows out of the left edge on every page load, animating
   * from the zero-width placeholder to wherever the current section is.
   */
  const [ready, setReady] = useState(false);

  const target = hovered ?? activeIndex;
  const visible = target >= 0;

  useEffect(() => {
    const list = listRef.current;
    if (!list || target < 0) return;

    // Addressed by element rather than by child index: the indicator and the
    // inverted overlay are themselves children of the list.
    const items = list.querySelectorAll<HTMLElement>(":scope > li");

    const measure = () => {
      const item = items[target];
      if (!item) return;
      setBox({
        x: item.offsetLeft,
        w: item.offsetWidth,
        list: list.offsetWidth,
      });
    };

    measure();
    const frame = requestAnimationFrame(() => setReady(true));

    // Labels shift as webfonts land and as the bar condenses on scroll.
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    for (const item of items) observer.observe(item);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [target]);

  const right = Math.max(0, box.list - (box.x + box.w));

  return {
    listRef,
    /** Spread onto each item's wrapper. */
    itemProps: (index: number) => ({
      onMouseEnter: () => setHovered(index),
      onFocus: () => setHovered(index),
    }),
    /** Spread onto the list, to release the pill back to the active item. */
    listProps: {
      onMouseLeave: () => setHovered(null),
      onBlur: (event: React.FocusEvent<HTMLUListElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setHovered(null);
        }
      },
    },
    indicatorProps: {
      "aria-hidden": true as const,
      className: cn(
        "bg-ink pointer-events-none absolute inset-y-1 left-0 z-0 rounded-full",
        ready && "slide-spring",
      ),
      style: {
        width: box.w,
        transform: `translate3d(${box.x}px, 0, 0)`,
        // Visibility is not gated on `ready`: a tab restored from the
        // background may not get a frame for a while, and the current
        // section should never be unmarked in the meantime. Before the
        // first measurement the indicator is zero-width anyway.
        opacity: visible ? 1 : 0,
      } satisfies React.CSSProperties,
    },
    /**
     * Spread onto a copy of the nav rendered in the inverted colour. It is
     * decorative and must never be reachable — the real nav sits beneath it.
     */
    overlayProps: {
      "aria-hidden": true as const,
      inert: true,
      className: cn(
        "text-bg pointer-events-none absolute inset-0 z-20 flex items-center",
        ready && "slide-spring",
      ),
      style: {
        clipPath: `inset(0 ${right}px 0 ${box.x}px round 9999px)`,
        opacity: visible ? 1 : 0,
      } satisfies React.CSSProperties,
    },
  };
}

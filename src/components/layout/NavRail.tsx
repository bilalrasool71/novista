"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * A single indicator that glides between nav items.
 *
 * One pill exists, not one per item. It sits under the current section, moves
 * to whatever the pointer is over, and settles back when the pointer leaves —
 * so the nav reads as one object responding to you rather than six
 * independent things lighting up. The item the pill is under inverts its text,
 * which is why `target` is returned rather than kept private.
 *
 * Positions are measured from the DOM instead of computed, so the indicator
 * stays correct through font swaps, resizes and label changes without anyone
 * having to keep a table of widths in sync.
 */
export function useNavRail(activeIndex: number) {
  const listRef = useRef<HTMLUListElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  /** Kept through the empty state so the pill fades out in place. */
  const [box, setBox] = useState({ x: 0, w: 0 });
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

    // Addressed by element rather than by child index: the indicator is
    // itself a child of the list, so indices would be off by one.
    const items = list.querySelectorAll<HTMLElement>(":scope > li");

    const measure = () => {
      const item = items[target];
      if (!item) return;
      setBox({ x: item.offsetLeft, w: item.offsetWidth });
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

  return {
    listRef,
    target,
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
  };
}

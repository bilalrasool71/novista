"use client";

import { useEffect, useRef, useState } from "react";

/** Past this, the bar condenses and takes on its surface. */
const CONDENSE_AT = 12;

/**
 * Drives the header's scroll behaviour.
 *
 * The bar stays put — it condenses and gains a surface as the page moves
 * under it, and that is all. It deliberately does not hide on scroll down:
 * a header that comes and going reads as broken stickiness, and the nav is
 * the one thing that should always be one movement away.
 *
 * Reads are batched into one animation frame, and reading progress is written
 * straight onto the element as a custom property rather than held in state —
 * a bar that re-rendered React on every scroll frame would cost more than the
 * effect is worth. Only `scrolled`, which flips rarely, goes through state.
 */
export function useHeaderScroll(ref: React.RefObject<HTMLElement | null>) {
  const [scrolled, setScrolled] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    const read = () => {
      frame.current = 0;
      const y = Math.max(0, window.scrollY);
      const doc = document.documentElement;
      const travel = doc.scrollHeight - doc.clientHeight;

      ref.current?.style.setProperty(
        "--scroll-progress",
        travel > 0 ? Math.min(1, y / travel).toFixed(4) : "0",
      );

      setScrolled(y > CONDENSE_AT);
    };

    const onScroll = () => {
      if (!frame.current) frame.current = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [ref]);

  return scrolled;
}

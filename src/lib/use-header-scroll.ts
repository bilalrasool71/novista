"use client";

import { useEffect, useRef, useState } from "react";

/** Past this, the bar condenses and takes on its surface. */
const CONDENSE_AT = 12;
/** Only start hiding once the hero is genuinely behind the reader. */
const CONCEAL_AFTER = 360;
/** Ignore jitter and rubber-banding. */
const MIN_DELTA = 6;

export type HeaderScroll = {
  /** The page has moved under the bar: condense it and give it a surface. */
  scrolled: boolean;
  /** Reading downward, well past the hero: get the bar out of the way. */
  concealed: boolean;
};

/**
 * Drives the header's scroll behaviour.
 *
 * Reads are batched into one animation frame, and the progress value is
 * written straight onto the element as a custom property rather than held in
 * state — a bar that re-rendered React on every scroll frame would cost more
 * than the effect is worth. Only the two booleans, which change rarely, go
 * through state.
 */
export function useHeaderScroll(
  ref: React.RefObject<HTMLElement | null>,
  /** Held open: never conceal the bar out from under an open menu. */
  locked: boolean,
): HeaderScroll {
  const [state, setState] = useState<HeaderScroll>({
    scrolled: false,
    concealed: false,
  });
  const lastY = useRef(0);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const doc = document.documentElement;
      const travel = doc.scrollHeight - doc.clientHeight;

      ref.current?.style.setProperty(
        "--scroll-progress",
        travel > 0 ? Math.min(1, y / travel).toFixed(4) : "0",
      );

      const delta = y - lastY.current;
      setState((current) => {
        const scrolled = y > CONDENSE_AT;
        let concealed = current.concealed;

        if (Math.abs(delta) >= MIN_DELTA) {
          concealed = delta > 0 && y > CONCEAL_AFTER;
        }
        if (y <= CONCEAL_AFTER) concealed = false;

        return scrolled === current.scrolled && concealed === current.concealed
          ? current
          : { scrolled, concealed };
      });

      if (Math.abs(delta) >= MIN_DELTA) lastY.current = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    lastY.current = Math.max(0, window.scrollY);
    read();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);

  return { scrolled: state.scrolled, concealed: state.concealed && !locked };
}

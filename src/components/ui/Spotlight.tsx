"use client";

import { useEffect, useRef } from "react";

/**
 * A light that follows the cursor across its parent.
 *
 * Drop it inside any `group relative` surface and the card lights from
 * wherever the pointer is, rather than switching to a flat hover colour. The
 * position is written straight to the parent as two custom properties, so the
 * glow tracks at compositor speed and React never re-renders while the
 * pointer moves.
 *
 * It listens on the parent rather than on itself so the whole card is the
 * target, including anything painted above this layer.
 */
export function Spotlight() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const card = layer?.parentElement;
    if (!layer || !card) return;

    // A coarse pointer has no hover to track, and the listener would only
    // fire on tap — where a light under the finger is just a flash.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let frame = 0;
    let x = 0;
    let y = 0;

    const write = () => {
      frame = 0;
      card.style.setProperty("--spot-x", `${x}px`);
      card.style.setProperty("--spot-y", `${y}px`);
    };

    const onMove = (event: PointerEvent) => {
      const box = card.getBoundingClientRect();
      x = event.clientX - box.left;
      y = event.clientY - box.top;
      if (!frame) frame = requestAnimationFrame(write);
    };

    // The move listener only exists while the pointer is actually over this
    // card. A page of twelve cards otherwise keeps twelve live handlers for
    // the one the pointer might be on.
    const onEnter = (event: PointerEvent) => {
      onMove(event);
      card.addEventListener("pointermove", onMove);
    };
    const onLeave = () => {
      card.removeEventListener("pointermove", onMove);
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, []);

  return <span ref={ref} aria-hidden="true" className="spotlight" />;
}

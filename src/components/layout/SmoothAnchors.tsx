"use client";

import { useEffect } from "react";

/**
 * Smooth scrolling for in-page anchors only.
 *
 * `scroll-behavior: smooth` on `html` looks right until you navigate: the
 * router's own jump to the top of the new page animates too, and anything
 * that changes the document's height while that animation is in flight — a
 * streamed section, a font landing, an image sizing itself — cuts it short
 * and leaves the reader stranded part way down a page they just opened.
 *
 * So the document scrolls instantly, and only a click on a link pointing at
 * a fragment of the current page opts into the smooth behaviour. That is the
 * one case where the motion is doing useful work: it shows the reader where
 * on this page they were taken.
 */
export function SmoothAnchors() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Leave modified clicks to the browser: they open tabs and windows.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = (event.target as Element | null)?.closest("a");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") {
        return;
      }

      const url = new URL(link.href, window.location.href);
      const samePage =
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname;
      if (!samePage || url.hash.length < 2) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      // Keep the address bar and the back button honest.
      window.history.pushState(null, "", url.hash);

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      // `scroll-padding-top` in globals.css keeps this clear of the header.
      target.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

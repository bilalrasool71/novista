"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Fade + rise once the element scrolls into view.
 *
 * Three things keep this safe rather than decorative-at-a-cost:
 *  - A `prefers-reduced-motion` rule in globals.css forces these elements
 *    visible with no transition, so the observer becomes a no-op visually.
 *  - A <noscript> rule in the root layout forces content visible without JS.
 *  - It is never used above the fold, so it cannot delay LCP.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger, in milliseconds. Keep under ~240ms so lists do not feel slow. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal-init", shown && "reveal-shown", className)}
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined
      }
    >
      {children}
    </div>
  );
}

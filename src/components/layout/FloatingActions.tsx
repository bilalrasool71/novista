"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";

import { whatsapp, whatsappUrl } from "@/content/site";
import {
  getMenuOpen,
  getMenuOpenOnServer,
  subscribeToMenu,
} from "@/lib/menu-state";
import { cn } from "@/lib/utils";

/**
 * Floating action cluster, bottom-right on every page.
 *
 * Colour note: WhatsApp's brand green (#25d366) gives a white glyph only
 * 1.98:1, which fails WCAG 1.4.11 for a graphic that carries meaning. #17a34a
 * is still unmistakably WhatsApp green and clears 3:1 both for the glyph and
 * for the button's edge against a white page. Hover goes darker again.
 */

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const menuOpen = useSyncExternalStore(
    subscribeToMenu,
    getMenuOpen,
    getMenuOpenOnServer,
  );

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    // z-40 keeps it below the header (z-50), so an open mobile menu covers it.
    // The safe-area inset keeps it clear of the iOS home indicator.
    <div
      className={cn(
        "pointer-events-none fixed right-4 bottom-4 z-40 flex items-center gap-3 sm:right-6 sm:bottom-6",
        "transition-opacity duration-200",
        // The open mobile menu covers the screen; showing through its
        // backdrop would read as a rendering bug.
        menuOpen && "invisible opacity-0",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <button
        type="button"
        aria-label="Back to top"
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
        onClick={scrollToTop}
        className={cn(
          "text-ink border-line hover:border-ink card-elev glass grid size-12 place-items-center rounded-full border backdrop-blur",
          "transition-[opacity,transform,border-color] duration-300",
          showTop
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <ArrowUp aria-hidden="true" className="size-5" />
      </button>

      {whatsapp.enabled ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${whatsapp.label} — ${whatsapp.display}`}
          data-analytics="whatsapp-float"
          className={cn(
            "group pointer-events-auto flex h-12 items-center rounded-full px-3 text-white",
            // px-3 (12px) + 24px glyph + px-3 = 48px, so it is a circle
            // when collapsed and grows into a pill on hover/focus.
            "shadow-[0_10px_30px_-10px_rgb(23_163_74_/_0.65)]",
            "bg-[#17a34a] hover:bg-[#15803d] active:bg-[#166534]",
            "transition-colors duration-200",
          )}
        >
          <WhatsAppGlyph className="size-6 shrink-0" />
          {/*
            Width-animated rather than mounted on hover, so the label is always
            in the accessible tree and the button never causes a layout jump.
          */}
          <span
            className={cn(
              "max-w-0 overflow-hidden text-[0.9375rem] font-semibold whitespace-nowrap",
              "transition-[max-width,margin] duration-300 ease-out",
              "group-hover:ml-2 group-hover:max-w-56 group-hover:mr-1",
              "group-focus-visible:ml-2 group-focus-visible:max-w-56 group-focus-visible:mr-1",
            )}
          >
            {whatsapp.label}
          </span>
        </a>
      ) : null}
    </div>
  );
}

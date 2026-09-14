"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import { productCategories, products } from "@/content/products";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * The desktop dropdown.
 *
 * Anchored under its own trigger and sized to its contents rather than run
 * full bleed: a bar spanning the whole viewport to show four links reads as a
 * page section come loose, and it pulls the eye away from the thing the
 * pointer is actually on. The panel is a floating card, centred on its
 * trigger and clamped so it can never leave the viewport.
 *
 * State lives in the header so only one panel is ever open and moving between
 * triggers swaps panels rather than stacking them. The trigger stays a real
 * link to the section index — the panel is an accelerator, never the only way
 * in — with a separate chevron carrying the disclosure semantics.
 *
 * Only sections whose items are pages of their own get a panel. Solutions is
 * a single page of scenarios, so a submenu there would promise routes that do
 * not exist and land everyone back where they started.
 */
export type MegaPanel = "services" | "products";

export const megaPanelFor: Record<string, MegaPanel> = {
  "/services": "services",
  "/products": "products",
};

/** Sized to the content, then clamped against the viewport. */
const PANEL_WIDTH: Record<MegaPanel, string> = {
  services: "w-[35rem]",
  products: "w-[44rem]",
};

/** Breathing room kept between a panel and the edge of the window. */
const GUTTER = 16;

/**
 * Keeps a trigger-centred panel inside the window.
 *
 * Centring alone breaks down for the triggers near either end of the nav —
 * at 1024px the services panel hangs 52px off the left edge. This measures
 * the card once it is open and returns the nudge that brings it back, which
 * is nothing at all for a panel that already fits.
 */
function useClamp(isOpen: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  const measure = useCallback(() => {
    const card = ref.current;
    if (!card) return;

    // Measure from the unshifted position, or each pass would compound.
    const box = card.getBoundingClientRect();
    setShift((current) => {
      const left = box.left - current;
      const right = box.right - current;
      if (left < GUTTER) return GUTTER - left;
      if (right > window.innerWidth - GUTTER) {
        return window.innerWidth - GUTTER - right;
      }
      return 0;
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isOpen, measure]);

  return { ref, shift };
}

export function MegaTrigger({
  label,
  href,
  panel,
  isActive,
  isOpen,
  panelId,
  onOpen,
  onToggle,
  onNavigate,
}: {
  label: string;
  href: string;
  panel: MegaPanel;
  isActive: boolean;
  isOpen: boolean;
  panelId: string;
  onOpen: (panel: MegaPanel) => void;
  onToggle: (panel: MegaPanel) => void;
  onNavigate: () => void;
}) {
  const { ref, shift } = useClamp(isOpen);

  return (
    <div className="relative" onMouseEnter={() => onOpen(panel)}>
      <span className="flex items-center">
        <Link
          href={href}
          onFocus={() => onOpen(panel)}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "group/nav relative block rounded-lg py-2 pr-0.5 pl-3 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-200",
            isActive || isOpen ? "text-ink" : "text-muted hover:text-ink",
          )}
        >
          {label}
          <span
            aria-hidden="true"
            className={cn(
              "bg-gradient-brand absolute inset-x-3 bottom-0 h-0.5 origin-left rounded-full transition-transform duration-300 ease-out",
              isActive || isOpen
                ? "scale-x-100"
                : "scale-x-0 group-hover/nav:scale-x-100",
            )}
          />
        </Link>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={`${label} menu`}
          onClick={() => onToggle(panel)}
          className={cn(
            "mr-1 grid size-6 place-items-center rounded-full transition-colors duration-200",
            isOpen ? "text-ink" : "text-muted hover:text-ink",
          )}
        >
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-3.5 transition-transform duration-300",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </span>

      <div
        id={panelId}
        aria-hidden={!isOpen}
        inert={!isOpen}
        // The horizontal placement is the clamped one; the rise and fade are
        // left to the card inside, so the two never fight over `transform`.
        style={{ transform: `translateX(calc(-50% + ${shift}px))` }}
        className={cn(
          // The top padding is the gap under the trigger, and it stays inside
          // the hover area so the pointer can cross it without closing.
          "absolute top-full left-1/2 z-10 pt-2.5",
          !isOpen && "pointer-events-none",
        )}
      >
        <div
          ref={ref}
          className={cn(
            "border-line bg-surface overflow-hidden rounded-3xl border shadow-[var(--shadow-elev)]",
            "transition-[opacity,transform] duration-200 ease-out",
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
            PANEL_WIDTH[panel],
            "max-w-[calc(100vw-2rem)]",
          )}
        >
          {panel === "services" ? (
            <ServicesPanel onNavigate={onNavigate} />
          ) : (
            <ProductsPanel onNavigate={onNavigate} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Position in the panel, which drives the stagger. */
function step(index: number) {
  return { "--i": index } as React.CSSProperties;
}

/** The strip along the foot of a panel: where to go if none of the above. */
function PanelFooter({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={step(index)}
      className="menu-item-in border-line bg-surface-2 flex flex-wrap items-center gap-x-6 gap-y-2 border-t px-5 py-3.5"
    >
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="text-ink group/link inline-flex items-center gap-1.5 text-sm font-medium"
    >
      <span className="underline-grow">{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="size-3.5 shrink-0 transition-transform duration-200 group-hover/link:translate-x-1"
      />
    </Link>
  );
}

function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <>
      <ul className="grid gap-1 p-3 sm:grid-cols-2">
        {services.map((service, index) => (
          <li key={service.slug} style={step(index)} className="menu-item-in">
            <Link
              href={`/services/${service.slug}`}
              onClick={onNavigate}
              className="group/item hover:bg-surface-2 flex h-full gap-3.5 rounded-2xl p-3 transition-colors duration-200"
            >
              <span className="border-line bg-surface-2 text-accent-2 group-hover/item:bg-gradient-brand grid size-10 shrink-0 place-items-center rounded-xl border transition-colors duration-300 group-hover/item:border-transparent group-hover/item:text-white">
                <service.icon aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="text-ink block font-semibold">
                  {service.name}
                </span>
                <span className="text-muted mt-0.5 block text-sm leading-snug">
                  {service.promise}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <PanelFooter index={services.length}>
        <FooterLink href="/services" onNavigate={onNavigate}>
          All services
        </FooterLink>
        <FooterLink href="/about#process" onNavigate={onNavigate}>
          How we work
        </FooterLink>
        <FooterLink href="/contact" onNavigate={onNavigate}>
          Talk to our team
        </FooterLink>
      </PanelFooter>
    </>
  );
}

function ProductsPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <>
      <div className="grid gap-x-2 gap-y-4 p-4 sm:grid-cols-3">
        {productCategories.map((category, index) => {
          const items = products.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category} style={step(index)} className="menu-item-in">
              <p className="eyebrow text-muted mb-1.5 px-2">{category}</p>
              <ul>
                {items.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={onNavigate}
                      className="group/item text-muted hover:bg-surface-2 hover:text-ink flex items-start gap-2.5 rounded-xl px-2 py-1.5 text-[0.9375rem] leading-snug transition-colors duration-200"
                    >
                      <product.icon
                        aria-hidden="true"
                        className="text-accent-2 mt-0.5 size-4 shrink-0 transition-transform duration-200 group-hover/item:scale-110"
                      />
                      <span>{product.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <PanelFooter index={productCategories.length}>
        <p className="text-muted mr-auto text-sm">
          <span className="text-ink font-semibold">{products.length}</span>{" "}
          platforms we build, own and run.
        </p>
        <FooterLink href="/products" onNavigate={onNavigate}>
          Browse all
        </FooterLink>
        <FooterLink href="/contact" onNavigate={onNavigate}>
          Request a demo
        </FooterLink>
      </PanelFooter>
    </>
  );
}

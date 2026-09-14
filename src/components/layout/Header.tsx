"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import {
  MegaPanelBody,
  MegaTrigger,
  megaPanelFor,
  type MegaPanel,
} from "@/components/layout/MegaMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { productCategories, products } from "@/content/products";
import { services } from "@/content/services";
import { cta, primaryNav } from "@/content/site";
import { setMenuOpen } from "@/lib/menu-state";
import { useHeaderScroll } from "@/lib/use-header-scroll";
import { cn } from "@/lib/utils";

/**
 * Sticky header.
 *
 * Three things happen as the page moves: the bar condenses and takes on a
 * blurred surface, a reading-progress hairline fills along its bottom edge,
 * and once the reader is well past the hero it slides away downward and comes
 * back the moment they scroll up. An open menu holds it in place.
 *
 * On desktop the three deep sections open a full-width mega panel over a
 * dimmed page; below `lg` everything collapses into a sheet carrying the same
 * content behind disclosures.
 */
export function Header() {
  const pathname = usePathname();
  const sheetId = useId();
  const megaId = useId();

  /**
   * The sheet is open only while the route it was opened on is still current,
   * so navigating anywhere (including back/forward) closes it without an
   * effect that has to watch the pathname.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const sheetOpen = openedOn === pathname;

  const [mega, setMega] = useState<MegaPanel | null>(null);
  /**
   * Whether the open panel was pinned by a click. Hovering a trigger opens
   * the panel, so a click that simply toggled would close a panel the user
   * had only grazed with the pointer — the first click pins, the second
   * closes, and moving the pointer off the header closes an unpinned one.
   */
  const [pinned, setPinned] = useState(false);
  /**
   * Lags `mega` by one close: the panel needs content to animate out with,
   * and clearing it on close would empty the box mid-collapse.
   */
  const [shown, setShown] = useState<MegaPanel | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const anyMenuOpen = sheetOpen || mega !== null;
  const { scrolled, concealed } = useHeaderScroll(headerRef, anyMenuOpen);

  const closeMega = useCallback(() => {
    setMega(null);
    setPinned(false);
  }, []);

  const openMega = useCallback((panel: MegaPanel) => {
    setMega(panel);
    setShown(panel);
    setPinned(false);
  }, []);

  const toggleMega = useCallback(
    (panel: MegaPanel) => {
      // Flat rather than nested in a setState updater: React runs updaters
      // during render, and queueing other components' updates from in there
      // is what "state update on a component that hasn't mounted" means.
      if (mega === panel && pinned) {
        setMega(null);
        setPinned(false);
        return;
      }
      setMega(panel);
      setShown(panel);
      setPinned(true);
    },
    [mega, pinned],
  );

  // Close the mega panel on Escape, and on a click that lands outside it.
  useEffect(() => {
    if (!mega) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMega();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) closeMega();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mega, closeMega]);

  // While the mobile sheet is open: trap scroll behind it, allow Escape out.
  useEffect(() => {
    if (!sheetOpen) return;

    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";

    // Tells the floating actions to step aside while the sheet covers them.
    setMenuOpen(true);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenedOn(null);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      style.overflow = previousOverflow;
      setMenuOpen(false);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [sheetOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const solid = scrolled || anyMenuOpen;

  return (
    <header
      ref={headerRef}
      onMouseLeave={() => {
        if (!pinned) closeMega();
      }}
      className={cn(
        "sticky top-0 z-50 transition-[transform,background-color,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,0.75,0.2,1)]",
        // Scrolled: a blurred glass bar. Menu open: fully opaque, because the
        // scrim behind it would otherwise show straight through the glass and
        // dim the bar along with the page.
        anyMenuOpen && "bg-surface border-line card-elev border-b",
        !anyMenuOpen &&
          scrolled &&
          "glass border-line card-elev border-b backdrop-blur-xl",
        !solid && "border-b border-transparent bg-transparent",
        // Slides out of the way while reading down, and returns on the first
        // upward flick.
        concealed && "-translate-y-full",
      )}
    >
      <Container className="relative z-20">
        <div
          className={cn(
            "flex items-center justify-between gap-6 transition-[height] duration-400 ease-[cubic-bezier(0.22,0.75,0.2,1)]",
            scrolled ? "h-15" : "h-18",
          )}
        >
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {primaryNav.map((item) => {
                const panel = megaPanelFor[item.href];

                if (panel) {
                  return (
                    <li key={item.href}>
                      <MegaTrigger
                        label={item.label}
                        href={item.href}
                        panel={panel}
                        panelId={megaId}
                        isActive={isActive(item.href)}
                        isOpen={mega === panel}
                        onOpen={openMega}
                        onToggle={toggleMega}
                      />
                    </li>
                  );
                }

                return (
                  <li
                    key={item.href}
                    onMouseEnter={() => {
                      if (!pinned) closeMega();
                    }}
                  >
                    <Link
                      href={item.href}
                      onFocus={closeMega}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "group/nav relative block rounded-lg px-3 py-2 text-[0.9375rem] font-medium transition-colors duration-200",
                        isActive(item.href)
                          ? "text-ink"
                          : "text-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "bg-gradient-brand absolute inset-x-3 bottom-0 h-0.5 origin-left rounded-full transition-transform duration-300 ease-out",
                          isActive(item.href)
                            ? "scale-x-100"
                            : "scale-x-0 group-hover/nav:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Button href="/contact" size="sm" variant="primary" withArrow>
              {cta.primary.label}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpenedOn(sheetOpen ? null : pathname)}
            aria-expanded={sheetOpen}
            aria-controls={sheetId}
            aria-label={sheetOpen ? "Close menu" : "Open menu"}
            className="text-ink hover:bg-surface-2 active:bg-surface-2 relative -mr-2 grid size-11 place-items-center rounded-xl transition-colors duration-200 lg:hidden"
          >
            {/* Both glyphs are mounted so the swap can cross-rotate. */}
            <Menu
              aria-hidden="true"
              className={cn(
                "absolute size-6 transition-[opacity,transform] duration-300",
                sheetOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
              )}
            />
            <X
              aria-hidden="true"
              className={cn(
                "absolute size-6 transition-[opacity,transform] duration-300",
                sheetOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
              )}
            />
          </button>
        </div>
      </Container>

      {/* Reading progress along the bottom edge; value set by the scroll hook. */}
      <span
        aria-hidden="true"
        className={cn(
          "bg-gradient-brand scroll-progress absolute inset-x-0 bottom-0 h-0.5 transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      {/* The page recedes behind an open menu. */}
      <div
        aria-hidden="true"
        onClick={() => {
          closeMega();
          setOpenedOn(null);
        }}
        className={cn(
          "menu-scrim z-0",
          anyMenuOpen && "menu-scrim-on",
          // Below `lg` the scrim must take the tap that closes the sheet.
          sheetOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      />

      {/*
        Desktop mega panel — full bleed, anchored under the bar. Height is
        animated by the grid row rather than toggled, and the panel keeps its
        content until the collapse has finished.
      */}
      <div
        id={megaId}
        aria-hidden={mega === null}
        inert={mega === null}
        className={cn(
          "collapsible absolute inset-x-0 top-full z-10 hidden lg:grid",
          mega ? "collapsible-open" : "pointer-events-none",
        )}
      >
        <div className="collapsible-inner">
          <div className="border-line bg-surface border-t shadow-[var(--shadow-elev)]">
            <Container className="py-8">
              {shown ? (
                // Re-keying on the panel replays the stagger when it swaps.
                <MegaPanelBody
                  key={shown}
                  panel={shown}
                  onNavigate={closeMega}
                />
              ) : null}
            </Container>
          </div>
        </div>
      </div>

      <MobileSheet
        id={sheetId}
        open={sheetOpen}
        isActive={isActive}
        onNavigate={() => setOpenedOn(null)}
      />
    </header>
  );
}

/* ------------------------------------------------------------------ */

/** Position in the sheet, which drives the stagger. */
function step(index: number) {
  return { "--i": index } as React.CSSProperties;
}

function MobileSheet({
  id,
  open,
  isActive,
  onNavigate,
}: {
  id: string;
  open: boolean;
  isActive: (href: string) => boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      id={id}
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "collapsible border-line bg-surface absolute inset-x-0 top-full z-10 border-b shadow-[var(--shadow-elev)] lg:hidden",
        open ? "collapsible-open" : "pointer-events-none border-transparent",
      )}
    >
      <div className="collapsible-inner max-h-[calc(100dvh-3.75rem)] overflow-y-auto overscroll-contain">
        <Container className="py-5">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {primaryNav.map((item, index) => {
                const panel = megaPanelFor[item.href];

                return (
                  <li
                    key={item.href}
                    style={step(index)}
                    className={open ? "menu-item-in" : undefined}
                  >
                    {panel ? (
                      <SheetGroup
                        label={item.label}
                        href={item.href}
                        active={isActive(item.href)}
                        onNavigate={onNavigate}
                      >
                        {panel === "services" ? (
                          <SheetLinks
                            items={services.map((service) => ({
                              href: `/services/${service.slug}`,
                              label: service.name,
                              icon: service.icon,
                            }))}
                            onNavigate={onNavigate}
                          />
                        ) : null}

                        {panel === "products"
                          ? productCategories.map((category) => (
                              <div key={category} className="mt-1 mb-2">
                                <p className="eyebrow text-muted mt-3 mb-1 px-3">
                                  {category}
                                </p>
                                <SheetLinks
                                  items={products
                                    .filter(
                                      (product) =>
                                        product.category === category,
                                    )
                                    .map((product) => ({
                                      href: `/products/${product.slug}`,
                                      label: product.name,
                                      icon: product.icon,
                                    }))}
                                  onNavigate={onNavigate}
                                />
                              </div>
                            ))
                          : null}
                      </SheetGroup>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "flex min-h-12 items-center rounded-xl px-3 text-base font-semibold transition-colors duration-200",
                          isActive(item.href)
                            ? "bg-surface-2 text-ink"
                            : "text-ink hover:bg-surface-2 active:bg-surface-2",
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            style={step(primaryNav.length)}
            className={cn(
              "border-line mt-5 flex items-center justify-between border-t pt-5",
              open && "menu-item-in",
            )}
          >
            <span className="text-muted text-sm font-medium">Appearance</span>
            <ThemeToggle />
          </div>

          <div
            style={step(primaryNav.length + 1)}
            className={cn("mt-5 space-y-2.5", open && "menu-item-in")}
          >
            <Button
              href="/contact"
              size="lg"
              fullWidth
              withArrow
              onClick={onNavigate}
            >
              {cta.primary.label}
            </Button>
            <Button
              href="/solutions"
              size="lg"
              variant="secondary"
              fullWidth
              onClick={onNavigate}
            >
              {cta.solutions.label}
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}

/** One expandable section of the mobile sheet: a link plus its children. */
function SheetGroup({
  label,
  href,
  active,
  onNavigate,
  children,
}: {
  label: string;
  href: string;
  active: boolean;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <>
      <div
        className={cn(
          "flex items-center rounded-xl transition-colors duration-200",
          active ? "bg-surface-2" : "hover:bg-surface-2",
        )}
      >
        <Link
          href={href}
          onClick={onNavigate}
          aria-current={active ? "page" : undefined}
          className="text-ink flex min-h-12 flex-1 items-center rounded-xl px-3 text-base font-semibold"
        >
          {label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={contentId}
          aria-label={`${label} submenu`}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-xl transition-colors duration-200",
            open ? "text-accent-2" : "text-muted",
          )}
        >
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,0.75,0.2,1)]",
              open && "rotate-180",
            )}
          />
        </button>
      </div>
      <div
        id={contentId}
        aria-hidden={!open}
        inert={!open}
        className={cn("collapsible", open && "collapsible-open")}
      >
        <div className="collapsible-inner">
          {/* The rule ties the children to the parent they belong to. */}
          <div className="border-line my-1 ml-6 border-l pl-2">{children}</div>
        </div>
      </div>
    </>
  );
}

function SheetLinks({
  items,
  onNavigate,
}: {
  items: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  }[];
  onNavigate: () => void;
}) {
  return (
    <ul className="space-y-0.5">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onNavigate}
            className="text-muted hover:bg-surface-2 hover:text-ink active:bg-surface-2 flex min-h-11 items-center gap-2.5 rounded-xl px-3 text-[0.9375rem] transition-colors duration-200"
          >
            <item.icon aria-hidden className="text-accent-2 size-4 shrink-0" />
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

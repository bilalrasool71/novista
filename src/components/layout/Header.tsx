"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import {
  MegaTrigger,
  megaPanelFor,
  type MegaPanel,
} from "@/components/layout/MegaMenu";
import { useNavRail } from "@/components/layout/NavRail";
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
 * A flush bar across the top of the page: no inset, no rounding, a hairline
 * along the bottom and a surface that firms up once the page moves under it.
 *
 * The nav is packed against the brand rather than centred. With a full-width
 * bar, slack on both sides of a centred nav reads as an accident; collecting
 * all of it on one side reads as a decision, and it puts the dropdowns near
 * the left edge where they are easiest to reach.
 *
 * On desktop the two sections whose items are pages of their own open a
 * dropdown anchored under their trigger; below `lg` everything collapses into
 * a sheet below the bar carrying the same content behind disclosures.
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
  const headerRef = useRef<HTMLElement>(null);
  const scrolled = useHeaderScroll(headerRef);

  /**
   * Hover intent. Opening needs a beat so that sweeping the pointer across
   * the nav on the way somewhere else does not flash panels open; closing
   * needs a longer one so a diagonal move toward the panel, which briefly
   * leaves the trigger, does not shut it.
   */
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const schedule = useCallback((run: () => void, delay: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(run, delay);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const closeMega = useCallback(() => {
    clearTimeout(timer.current);
    setMega(null);
  }, []);

  const openMega = useCallback(
    (panel: MegaPanel) => {
      // An already-open menu swaps immediately; the first one waits.
      setMega((current) => (current === null ? current : panel));
      schedule(() => setMega(panel), 90);
    },
    [schedule],
  );

  const leaveMega = useCallback(
    () => schedule(() => setMega(null), 220),
    [schedule],
  );

  const toggleMega = useCallback((panel: MegaPanel) => {
    clearTimeout(timer.current);
    setMega((current) => (current === panel ? null : panel));
  }, []);

  // Close the dropdown on Escape, and on a click that lands outside the bar.
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

  const activeIndex = primaryNav.findIndex((item) => isActive(item.href));
  const {
    listRef: navListRef,
    target: litIndex,
    itemProps: navItemProps,
    listProps: navListProps,
    indicatorProps,
  } = useNavRail(activeIndex);

  const settled = scrolled || sheetOpen || mega !== null;

  return (
    <header
      ref={headerRef}
      onMouseLeave={leaveMega}
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        // Opaque whenever the sheet is open: its scrim sits behind the bar and
        // would otherwise dim it along with the page.
        sheetOpen
          ? "bg-surface border-line card-elev"
          : settled
            ? "glass-panel border-line card-elev"
            : "border-transparent bg-transparent",
      )}
    >
      <Container className="relative">
        <div
          className={cn(
            "flex items-center gap-4 transition-[height] duration-300 ease-[cubic-bezier(0.22,0.75,0.2,1)] lg:gap-8",
            settled ? "h-14" : "h-15",
          )}
        >
          <Logo className="shrink-0" />

          <nav aria-label="Main" className="mr-auto hidden lg:block">
            <ul
              ref={navListRef}
              {...navListProps}
              className="relative flex items-center"
            >
              {/* One indicator for the whole nav, not one fill per item. */}
              <span {...indicatorProps} />

              {primaryNav.map((item, index) => {
                const panel = megaPanelFor[item.href];
                const lit = litIndex === index;

                return (
                  <li
                    key={item.href}
                    {...navItemProps(index)}
                    // React dispatches enter events from the root down, so an
                    // ancestor calling stopPropagation here would swallow the
                    // trigger's own hover handler underneath it.
                    onMouseEnter={() => {
                      navItemProps(index).onMouseEnter();
                      if (!panel) leaveMega();
                    }}
                  >
                    {panel ? (
                      <MegaTrigger
                        label={item.label}
                        href={item.href}
                        panel={panel}
                        panelId={`${megaId}-${panel}`}
                        isActive={isActive(item.href)}
                        isOpen={mega === panel}
                        lit={lit}
                        onOpen={openMega}
                        onToggle={toggleMega}
                        onNavigate={closeMega}
                      />
                    ) : (
                      <Link
                        href={item.href}
                        onFocus={closeMega}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "relative z-10 block rounded-full px-3.5 py-1.5 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-200",
                          lit ? "text-bg" : "text-muted",
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

          <div className="hidden items-center gap-1.5 lg:flex">
            {/* Without this the theme button floats between two dense groups
                with nothing holding it to either. */}
            <span
              aria-hidden="true"
              className="bg-line mr-1.5 h-6 w-px shrink-0"
            />
            <ThemeToggle />
            <Button href="/contact" size="sm" variant="brand" withArrow>
              {cta.primary.label}
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpenedOn(sheetOpen ? null : pathname)}
              aria-expanded={sheetOpen}
              aria-controls={sheetId}
              aria-label={sheetOpen ? "Close menu" : "Open menu"}
              className="text-ink hover:bg-surface-2 active:bg-surface-2 relative grid size-10 place-items-center rounded-full transition-colors duration-200"
            >
              {/* Both glyphs are mounted so the swap can cross-rotate. */}
              <Menu
                aria-hidden="true"
                className={cn(
                  "absolute size-5 transition-[opacity,transform] duration-300",
                  sheetOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
                )}
              />
              <X
                aria-hidden="true"
                className={cn(
                  "absolute size-5 transition-[opacity,transform] duration-300",
                  sheetOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
                )}
              />
            </button>
          </div>
        </div>

        {/* The bar's bottom edge is also the reading progress: one line
            doing both jobs rather than two competing hairlines. */}
        <span
          aria-hidden="true"
          className={cn(
            "bg-gradient-brand scroll-progress absolute inset-x-0 -bottom-px h-0.5 origin-left transition-opacity duration-300",
            settled ? "opacity-100" : "opacity-0",
          )}
        />

        <MobileSheet
          id={sheetId}
          open={sheetOpen}
          isActive={isActive}
          onNavigate={() => setOpenedOn(null)}
        />
      </Container>

      {/* The sheet covers the page, so it gets a scrim; the desktop dropdown
          is a small floating card and does not need one. */}
      <div
        aria-hidden="true"
        onClick={() => setOpenedOn(null)}
        className={cn(
          "menu-scrim -z-10 lg:hidden",
          sheetOpen
            ? "menu-scrim-on pointer-events-auto"
            : "pointer-events-none",
        )}
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
        "collapsible absolute inset-x-0 top-full z-10 lg:hidden",
        open ? "collapsible-open" : "pointer-events-none",
      )}
    >
      <div className="collapsible-inner">
        <div className="border-line bg-surface max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b px-2 py-3 shadow-[var(--shadow-elev)]">
          <nav aria-label="Mobile">
            <ul className="space-y-0.5">
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
                        ) : (
                          productCategories.map((category) => (
                            <div key={category} className="mt-1 mb-2">
                              <p className="eyebrow text-muted mt-3 mb-1 px-3">
                                {category}
                              </p>
                              <SheetLinks
                                items={products
                                  .filter(
                                    (product) => product.category === category,
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
                        )}
                      </SheetGroup>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "flex min-h-12 items-center rounded-2xl px-3 text-base font-semibold transition-colors duration-200",
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
            className={cn("mt-4 space-y-2", open && "menu-item-in")}
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
        </div>
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
          "flex items-center rounded-2xl transition-colors duration-200",
          active ? "bg-surface-2" : "hover:bg-surface-2",
        )}
      >
        <Link
          href={href}
          onClick={onNavigate}
          aria-current={active ? "page" : undefined}
          className="text-ink flex min-h-12 flex-1 items-center rounded-2xl px-3 text-base font-semibold"
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
            "grid size-12 shrink-0 place-items-center rounded-2xl transition-colors duration-200",
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

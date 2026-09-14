"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import { productCategories, products } from "@/content/products";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * The desktop mega menu.
 *
 * State lives in the header so only one panel is ever open, and so hovering
 * from one trigger to the next swaps panels instead of stacking them. Each
 * trigger is still a real link to that section's own index page — the panel
 * is an accelerator, never the only way in — with a separate chevron button
 * carrying the disclosure semantics for keyboard and screen-reader users.
 */
export type MegaPanel = "services" | "products";

/**
 * Only sections whose items are pages of their own get a panel. Solutions is
 * a single page of scenarios, so a submenu there would promise routes that do
 * not exist and land everyone back on the same page.
 */
export const megaPanelFor: Record<string, MegaPanel> = {
  "/services": "services",
  "/products": "products",
};

export function MegaTrigger({
  label,
  href,
  panel,
  isActive,
  isOpen,
  panelId,
  onOpen,
  onToggle,
}: {
  label: string;
  href: string;
  panel: MegaPanel;
  isActive: boolean;
  isOpen: boolean;
  panelId: string;
  onOpen: (panel: MegaPanel) => void;
  onToggle: (panel: MegaPanel) => void;
}) {
  return (
    <span
      className="flex items-center"
      onMouseEnter={() => onOpen(panel)}
      onFocus={() => onOpen(panel)}
    >
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "group/nav relative block rounded-lg py-2 pr-0.5 pl-3 text-[0.9375rem] font-medium transition-colors duration-200",
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
  );
}

export function MegaPanelBody({
  panel,
  onNavigate,
}: {
  panel: MegaPanel;
  onNavigate: () => void;
}) {
  if (panel === "services") return <ServicesPanel onNavigate={onNavigate} />;
  return <ProductsPanel onNavigate={onNavigate} />;
}

/* ------------------------------------------------------------------ */

/** Position in the panel, which drives the stagger. */
function step(index: number) {
  return { "--i": index } as React.CSSProperties;
}

function PanelAside({
  label,
  index,
  children,
}: {
  label: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={step(index)}
      className="border-line menu-item-in lg:col-span-3 lg:border-l lg:pl-8"
    >
      <p className="eyebrow text-muted">{label}</p>
      {children}
    </div>
  );
}

function PanelLink({
  href,
  children,
  onNavigate,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "text-ink group/link inline-flex items-center gap-1.5 text-[0.9375rem] font-medium",
        className,
      )}
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
    <div className="grid gap-8 lg:grid-cols-12">
      <ul className="grid gap-2 lg:col-span-9 lg:grid-cols-2">
        {services.map((service, index) => (
          <li key={service.slug} style={step(index)} className="menu-item-in">
            <Link
              href={`/services/${service.slug}`}
              onClick={onNavigate}
              className="group/item hover:bg-surface-2 flex gap-3.5 rounded-2xl p-3 transition-colors duration-200"
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

      <PanelAside label="Start here" index={services.length}>
        <ul className="mt-4 space-y-3">
          {[
            { href: "/services", label: "All services" },
            { href: "/about#process", label: "How we work" },
            { href: "/contact", label: "Talk to our team" },
          ].map((item) => (
            <li key={item.href}>
              <PanelLink href={item.href} onNavigate={onNavigate}>
                {item.label}
              </PanelLink>
            </li>
          ))}
        </ul>
      </PanelAside>
    </div>
  );
}

function ProductsPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-3 lg:col-span-9">
        {productCategories.map((category, index) => {
          const items = products.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category} style={step(index)} className="menu-item-in">
              <p className="eyebrow text-muted mb-2.5">{category}</p>
              <ul className="space-y-0.5">
                {items.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={onNavigate}
                      className="text-muted hover:bg-surface-2 hover:text-ink flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[0.9375rem] transition-colors duration-200"
                    >
                      <product.icon
                        aria-hidden="true"
                        className="text-accent-2 size-4 shrink-0"
                      />
                      <span className="truncate">{product.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <PanelAside label="The estate" index={productCategories.length}>
        <p className="text-ink mt-3 text-[0.9375rem] leading-snug">
          {products.length} platforms we build, own and run — deployed as they
          are, or shaped around how you already work.
        </p>
        <PanelLink href="/products" onNavigate={onNavigate} className="mt-4">
          Browse all platforms
        </PanelLink>
      </PanelAside>
    </div>
  );
}

import type { Metadata } from "next";
import { Boxes, Wrench } from "lucide-react";

import { ProductCard } from "@/components/cards/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { productCategories, products } from "@/content/products";
import {
  absoluteUrl,
  breadcrumbSchema,
  buildMetadata,
  softwareApplicationSchema,
  webPageSchema,
} from "@/lib/seo";

const TITLE = "Our Products";
const DESCRIPTION =
  "Business platforms built and owned by Novista Solutions — school, hospital, laboratory and pharmacy management, POS, ERP, CRM, HRMS, accounting, distribution and AI products.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/products",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        label="Products"
        title="Platforms we build, own and keep improving."
        description="Alongside client projects we run our own product line. Adopting one is usually faster and cheaper than starting from nothing — and because we own the code, we can still shape it around how you work."
        actions={
          <>
            <Button href="/contact" size="lg" withArrow>
              Request a Demo
            </Button>
            <Button href="/services" size="lg" variant="secondary">
              Need something custom?
            </Button>
          </>
        }
      />

      <Section labelledBy="product-model-heading">
        <h2 id="product-model-heading" className="sr-only">
          Products versus custom solutions
        </h2>

        <Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border-line bg-surface-2 flex gap-4 rounded-3xl p-6 border">
              <span className="bg-g2 grid size-11 shrink-0 place-items-center rounded-xl text-white">
                <Boxes aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h3 className="text-ink text-lg font-semibold">
                  Products we build and own
                </h3>
                <p className="text-muted mt-2 text-[0.9375rem] leading-relaxed">
                  Everything on this page. Live platforms we maintain and extend,
                  configured to your operation during onboarding. Fastest route to
                  a working system, with a lower cost to start.
                </p>
              </div>
            </div>

            <div className="border-line flex gap-4 rounded-3xl bg-surface p-6 border">
              <span className="border-line bg-surface-2 text-accent-2 grid size-11 shrink-0 place-items-center rounded-xl border">
                <Wrench aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h3 className="text-ink text-lg font-semibold">
                  Solutions we build for clients
                </h3>
                <p className="text-muted mt-2 text-[0.9375rem] leading-relaxed">
                  Custom software for workflows specific enough that no existing
                  product fits. Often the two combine: a product as the backbone,
                  custom work where you are genuinely different.
                </p>
                <Button
                  href="/services"
                  variant="ghost"
                  size="sm"
                  className="-ml-4 mt-2"
                  withArrow
                >
                  See our services
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {productCategories.map((category, categoryIndex) => {
        const items = products.filter((product) => product.category === category);
        if (items.length === 0) return null;

        const id = `category-${category.toLowerCase().replace(/\s+/g, "-")}`;

        return (
          <Section
            key={category}
            tone={categoryIndex % 2 === 0 ? "panel" : "surface"}
            labelledBy={id}
          >
            <SectionHeading
              id={id}
              label={`${items.length} platform${items.length === 1 ? "" : "s"}`}
              title={category}
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((product, index) => (
                <Reveal key={product.slug} delay={(index % 3) * 70} className="h-full">
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </Section>
        );
      })}

      <CtaBand
        title="Want to see one of these running?"
        description="Tell us which platform and a little about your operation. We will walk you through it against your real workflow rather than a generic demo script."
        primaryLabel="Request a Demo"
        secondaryLabel="Explore Our Services"
      />

      <JsonLd
        data={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: "/products" }),
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Novista Solutions products",
            numberOfItems: products.length,
            itemListElement: products.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: product.name,
              url: absoluteUrl(`/products/${product.slug}`),
            })),
          },
          ...products.map((product) =>
            softwareApplicationSchema({
              name: product.name,
              description: product.description,
              path: `/products/${product.slug}`,
              category: product.category,
            }),
          ),
        ]}
      />
    </>
  );
}

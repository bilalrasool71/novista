import { Boxes, Wrench } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardAction, CardBody, CardIcon, CardTitle } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PlatformPreview, previewForProduct } from "@/components/visuals/previews";
import { products } from "@/content/products";

/**
 * Product cards lead with a generated view of the interface, so visitors can
 * see the shape of what they would be adopting before they click through.
 */
export function ProductsSection({
  limit,
  tone = "surface",
  showMockups = true,
}: {
  limit?: number;
  tone?: "surface" | "panel";
  showMockups?: boolean;
}) {
  const shown = limit ? products.slice(0, limit) : products;

  return (
    <Section tone={tone} id="products" labelledBy="products-heading">
      <SectionHeading
        id="products-heading"
        label="The estate"
        title="Twelve platforms. Already running."
        description="Adopt one and we configure it to your operation. Faster than starting from nothing."
      />

      <Reveal className="mt-12">
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          <div className="border-line bg-surface-2 flex gap-4 rounded-3xl border p-5">
            <span className="bg-g2 grid size-10 shrink-0 place-items-center rounded-xl text-white">
              <Boxes aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-ink font-bold">Products we build and own</p>
              <p className="text-muted mt-1 text-sm leading-[1.55]">
                Ready-made platforms you adopt and we configure to your operation.
              </p>
            </div>
          </div>
          <div className="border-line card-elev flex gap-4 rounded-3xl border bg-surface p-5">
            <span className="border-line bg-surface-2 text-accent-2 grid size-10 shrink-0 place-items-center rounded-xl border">
              <Wrench aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-ink font-bold">Solutions we build for clients</p>
              <p className="text-muted mt-1 text-sm leading-[1.55]">
                Custom software where no existing product fits your workflow.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((product, position) => (
          <li key={product.slug} className="h-full">
            <Reveal delay={(position % 4) * 60} className="h-full">
              <Card href={`/products/${product.slug}`} padded={false}>
                {showMockups ? (
                  <div className="bg-surface-2 border-line rounded-t-2xl border-b p-4">
                    <PlatformPreview
                      kind={previewForProduct(product.slug)}
                      title={product.name}
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <CardIcon icon={product.icon} className="size-10" />
                  <CardTitle className="mt-4">{product.name}</CardTitle>
                  <CardBody className="mt-2">{product.tagline}</CardBody>
                  <CardAction>Details</CardAction>
                </div>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>

      {limit ? (
        <Reveal className="mt-12 text-center">
          <Button href="/products" variant="secondary" withArrow>
            View all {products.length} products
          </Button>
        </Reveal>
      ) : null}
    </Section>
  );
}

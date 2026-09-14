import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, TriangleAlert, Users } from "lucide-react";

import { ProductCard } from "@/components/cards/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getProduct, products } from "@/content/products";
import {
  breadcrumbSchema,
  buildMetadata,
  softwareApplicationSchema,
  webPageSchema,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return {};

  return buildMetadata({
    title: product.seo.title,
    description: product.seo.description,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const Icon = product.icon;

  // Same category first, so the suggestions stay relevant.
  const related = products
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => {
      const aMatch = a.category === product.category ? 0 : 1;
      const bMatch = b.category === product.category ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, 3);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: product.name, path: `/products/${product.slug}` },
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        label={product.category}
        title={product.name}
        description={product.description}
        actions={
          <>
            <Button href="/contact" size="lg" withArrow>
              Request a Demo
            </Button>
            {product.demoUrl ? (
              <Button href={product.demoUrl} external size="lg" variant="secondary">
                Visit product site
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Button>
            ) : (
              <Button href="/products" size="lg" variant="secondary">
                Browse all products
              </Button>
            )}
          </>
        }
        aside={
          <div className="border-line card-elev overflow-hidden rounded-3xl border bg-surface">
            <div className="p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="border-line bg-surface-2 text-accent-2 grid size-11 shrink-0 place-items-center rounded-2xl border">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <p className="text-ink text-[1.0625rem] leading-snug font-semibold">
                  {product.tagline}
                </p>
                <Badge
                  className="ml-auto shrink-0"
                  tone={product.status === "Available" ? "positive" : "accent"}
                >
                  {product.status}
                </Badge>
              </div>
            </div>

            <div className="border-line bg-surface-2 border-t p-6 sm:p-7">
              <p className="eyebrow text-muted flex items-center gap-2">
                <Users aria-hidden="true" className="size-3.5" />
                Built for
              </p>
              <ul className="mt-3.5 flex flex-wrap gap-1.5">
                {product.audience.map((item) => (
                  <li
                    key={item}
                    className="border-line bg-surface text-muted rounded-full border px-3 py-1.5 text-[0.8125rem] font-medium"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
      />

      <Section tone="panel" labelledBy="problem-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="problem-heading"
              label="The problem"
              title="What this replaces."
            />
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <div className="border-line rounded-3xl bg-surface p-6 border sm:p-8">
                <span className="grid size-11 place-items-center rounded-xl bg-notice text-notice-icon">
                  <TriangleAlert aria-hidden="true" className="size-5" />
                </span>
                <p className="text-muted mt-5 text-lg leading-relaxed">
                  {product.problem}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section labelledBy="features-heading">
        <SectionHeading
          id="features-heading"
          label="Capabilities"
          title={`What ${product.name} does.`}
          description="Every deployment is configured to your processes, permissions and reporting during onboarding."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {product.features.map((feature, index) => (
            <li key={feature}>
              <Reveal delay={(index % 2) * 60}>
                <div className="border-line hover:border-ink flex gap-3 rounded-3xl bg-surface p-5 border transition-[border-color] duration-300">
                  <Check
                    aria-hidden="true"
                    className="text-ink mt-0.5 size-5 shrink-0"
                  />
                  <span className="text-muted font-medium">{feature}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {related.length > 0 ? (
        <Section tone="panel" labelledBy="related-products-heading">
          <SectionHeading
            id="related-products-heading"
            label="Also available"
            title="Platforms that work alongside this one."
            description="Our products share one data layer, so adding a second does not mean another integration project."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 70} className="h-full">
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title={`See ${product.name} against your own workflow.`}
        description="Tell us how you operate today and we will show you the parts that matter, rather than a generic feature tour."
        primaryLabel="Request a Demo"
        secondaryLabel="Browse all products"
        secondaryHref="/products"
      />

      <JsonLd
        data={[
          webPageSchema({
            name: product.name,
            description: product.seo.description,
            path: `/products/${product.slug}`,
          }),
          softwareApplicationSchema({
            name: product.name,
            description: product.description,
            path: `/products/${product.slug}`,
            category: product.category,
          }),
          breadcrumbSchema(crumbs),
        ]}
      />
    </>
  );
}

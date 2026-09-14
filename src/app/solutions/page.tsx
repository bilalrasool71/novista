import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProblemsSection } from "@/components/sections/ProblemsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { industries } from "@/content/site";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "Business Technology Solutions";
const DESCRIPTION =
  "Launch a product, automate operations, modernise legacy software, integrate disconnected systems or adopt AI. Practical technology solutions from Novista Solutions.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/solutions",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Solutions", path: "/solutions" },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        label="Solutions"
        title="Start from the problem, not the product."
        description="Businesses rarely arrive asking for a technology. They arrive with something that is too slow, too manual, too disconnected or too fragile. These are the situations we are brought in for, and how we approach each one."
        actions={
          <>
            <Button href="/contact" size="lg" withArrow>
              Discuss Your Challenge
            </Button>
            <Button href="/services" size="lg" variant="secondary">
              Explore Our Services
            </Button>
          </>
        }
      />

      <ProblemsSection />

      <SolutionsSection showDetail tone="surface" />

      <Section tone="panel" labelledBy="industries-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="industries-heading"
              align="left"
              label="Industries"
              title="Where we have already solved this kind of problem."
              description="Domain knowledge shortens discovery considerably. In these sectors we usually understand the constraints before you have to explain them."
            />
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="grid gap-3 sm:grid-cols-2">
              {industries.map((industry, index) => (
                <li key={industry}>
                  <Reveal delay={(index % 2) * 60}>
                    <div className="border-line flex items-center gap-3 rounded-xl bg-surface px-5 py-4 border">
                      <span
                        aria-hidden="true"
                        className="from-g2 to-g4 size-2 shrink-0 rounded-full bg-gradient-to-br"
                      />
                      <span className="text-muted font-medium">{industry}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <ProductsSection tone="surface" limit={6} />

      <ProcessSection tone="panel" />

      <CtaBand
        title="Tell us what is slowing the business down."
        description="No obligation and no sales sequence. One conversation, a straight opinion, and a clear view of what a first phase would involve."
        secondaryLabel="View our products"
        secondaryHref="/products"
      />

      <JsonLd
        data={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: "/solutions" }),
          breadcrumbSchema(crumbs),
        ]}
      />
    </>
  );
}

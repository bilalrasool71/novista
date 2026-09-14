import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { allFaqs, faqCategories } from "@/content/faqs";
import { services } from "@/content/services";
import { breadcrumbSchema, buildMetadata, faqSchema, webPageSchema } from "@/lib/seo";

const TITLE = "Frequently Asked Questions";
const DESCRIPTION =
  "Costs, timelines, ownership, AI integration, legacy modernisation and support — straight answers to the questions we get asked most about software projects.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/faq",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

export default function FaqPage() {
  // Service-specific questions are already visible further down the page, so
  // they belong in the FAQPage schema too.
  const serviceFaqs = services.flatMap((service) => service.faqs);

  return (
    <>
      <PageHero
        crumbs={crumbs}
        label="FAQs"
        title="Straight answers to the questions we get asked most."
        description="If something here reads like a non-answer, tell us — we would rather rewrite it than leave you guessing. Anything not covered, just ask."
        actions={
          <Button href="/contact" size="lg" withArrow>
            Ask Us Directly
          </Button>
        }
      />

      {faqCategories.map((group, index) => (
        <Section
          key={group.category}
          tone={index % 2 === 0 ? "surface" : "panel"}
          labelledBy={`faq-${index}`}
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <h2
                  id={`faq-${index}`}
                  className="text-ink text-2xl font-semibold sm:text-3xl"
                >
                  {group.category}
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal>
                <FaqList items={group.items} />
              </Reveal>
            </div>
          </div>
        </Section>
      ))}

      {services.map((service, index) => (
        <Section
          key={service.slug}
          tone={(faqCategories.length + index) % 2 === 0 ? "surface" : "panel"}
          labelledBy={`faq-service-${service.slug}`}
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <h2
                  id={`faq-service-${service.slug}`}
                  className="text-ink text-2xl font-semibold sm:text-3xl"
                >
                  {service.name}
                </h2>
                <Button
                  href={`/services/${service.slug}`}
                  variant="secondary"
                  size="sm"
                  className="mt-5"
                  withArrow
                >
                  About {service.name}
                </Button>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal>
                <FaqList items={service.faqs} />
              </Reveal>
            </div>
          </div>
        </Section>
      ))}

      <CtaBand
        title="Still have a question?"
        description="Ask it in one line. You will get a real answer from someone who would work on the project, not a templated reply."
        primaryLabel="Ask Our Team"
        secondaryLabel="Explore Our Services"
      />

      <JsonLd
        data={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: "/faq" }),
          breadcrumbSchema(crumbs),
          faqSchema([...allFaqs, ...serviceFaqs]),
        ]}
      />
    </>
  );
}

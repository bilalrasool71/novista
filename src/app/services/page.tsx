import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechSection } from "@/components/sections/TechSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { services } from "@/content/services";
import { breadcrumbSchema, buildMetadata, serviceSchema, webPageSchema } from "@/lib/seo";

const TITLE = "Software Development Services";
const DESCRIPTION =
  "Web development, mobile apps, AI solutions and digital transformation. Novista Solutions builds and modernises the software businesses run on.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/services",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        label="Services"
        title="Software development services built around business outcomes."
        description="Four practice areas that work together. Most engagements use more than one — a platform that needs modernising usually also needs integrating, and the automation opportunity is usually sitting right next to both."
        actions={
          <>
            <Button href="/contact" size="lg" withArrow>
              Start a Project
            </Button>
            <Button href="/solutions" size="lg" variant="secondary">
              Explore Our Solutions
            </Button>
          </>
        }
      />

      <Section labelledBy="all-services-heading">
        <h2 id="all-services-heading" className="sr-only">
          Our services
        </h2>

        <div className="space-y-5">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.slug} delay={index * 60}>
                <article className="border-line hover:border-ink grid gap-8 rounded-3xl bg-surface p-6 border transition-[border-color] duration-300 sm:p-8 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-5">
                    <span className="bg-surface-2 text-ink grid size-12 place-items-center rounded-xl">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>

                    <h3 className="text-ink mt-5 text-2xl font-semibold">
                      <Link
                        href={`/services/${service.slug}`}
                        className="hover:text-accent-2 transition-colors duration-200"
                      >
                        {service.name}
                      </Link>
                    </h3>

                    <p className="text-accent-2 mt-2 font-medium">
                      {service.promise}
                    </p>

                    <p className="text-muted mt-4 leading-relaxed">
                      {service.summary}
                    </p>

                    <Button
                      href={`/services/${service.slug}`}
                      variant="secondary"
                      size="sm"
                      className="mt-6"
                    >
                      Explore {service.name}
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Button>
                  </div>

                  <div className="lg:col-span-7">
                    <p className="text-muted eyebrow">
                      What we build
                    </p>
                    <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {service.offerings.slice(0, 8).map((offering) => (
                        <li
                          key={offering.title}
                          className="text-muted flex gap-2.5 text-[0.9375rem]"
                        >
                          <Check
                            aria-hidden="true"
                            className="text-ink mt-1 size-4 shrink-0"
                          />
                          {offering.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="panel" labelledBy="not-sure-heading">
        <SectionHeading
          id="not-sure-heading"
          label="Not sure which you need?"
          title="Most people are not, and that is fine."
          description="Tell us the problem rather than the solution. A first conversation usually makes the right starting point obvious — and occasionally the answer is that you do not need a build at all."
        />
        <Reveal className="mt-8">
          <Button href="/contact" size="lg" withArrow>
            Get a Consultation
          </Button>
        </Reveal>
      </Section>

      <ProcessSection />
      <TechSection tone="panel" />
      <CtaBand secondaryLabel="See Our Work" secondaryHref="/case-studies" />

      <JsonLd
        data={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: "/services" }),
          breadcrumbSchema(crumbs),
          ...services.map((service) =>
            serviceSchema({
              name: service.name,
              description: service.summary,
              path: `/services/${service.slug}`,
            }),
          ),
        ]}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getService, services } from "@/content/services";
import {
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

/** Four known services, all prerendered at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const Icon = service.icon;
  const related = service.related
    .map((relatedSlug) => getService(relatedSlug))
    .filter((item) => item !== undefined);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        label={service.eyebrow}
        title={service.h1}
        description={service.intro}
        actions={
          <>
            <Button href="/contact" size="lg" withArrow>
              Discuss Your Project
            </Button>
            <Button href="/case-studies" size="lg" variant="secondary">
              See Our Work
            </Button>
          </>
        }
        aside={
          <div className="border-line rounded-3xl bg-surface p-6 border sm:p-7">
            <span className="border-line bg-surface-2 text-accent-2 grid size-12 place-items-center rounded-2xl border">
              <Icon aria-hidden="true" className="size-6" />
            </span>
            <p className="text-ink mt-5 text-lg leading-snug font-semibold">
              {service.promise}
            </p>
            <p className="text-muted mt-6 eyebrow">
              What you get
            </p>
            <ul className="mt-3 space-y-2">
              {service.deliverables.map((item) => (
                <li key={item} className="text-muted flex gap-2.5 text-[0.9375rem]">
                  <Check
                    aria-hidden="true"
                    className="text-ink mt-1 size-4 shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Section tone="panel" labelledBy="offerings-heading">
        <SectionHeading
          id="offerings-heading"
          label="Capabilities"
          title={`What we build in ${service.name.toLowerCase()}.`}
          description="Every engagement is scoped to what you actually need — this is the range we work across."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.offerings.map((offering, index) => (
            <Reveal key={offering.title} delay={(index % 3) * 60} className="h-full">
              <div className="border-line hover:border-ink h-full rounded-3xl bg-surface p-5 border transition-[border-color] duration-300">
                <h3 className="text-ink font-semibold">
                  {offering.title}
                </h3>
                <p className="text-muted mt-2 text-[0.9375rem] leading-relaxed">
                  {offering.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section labelledBy="outcomes-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="outcomes-heading"
              align="left"
              label="Why it matters"
              title="What you should expect from this work."
              description="Technical quality is a means, not the product. These are the outcomes we hold ourselves to."
            />
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="space-y-4">
              {service.outcomes.map((outcome, index) => (
                <li key={outcome.title}>
                  <Reveal delay={index * 70}>
                    <div className="border-line rounded-3xl bg-surface p-6 border">
                      <h3 className="text-ink text-lg font-semibold">
                        {outcome.title}
                      </h3>
                      <p className="text-muted mt-2 leading-relaxed">
                        {outcome.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="panel" labelledBy="service-tech-heading">
        <SectionHeading
          id="service-tech-heading"
          label="Technology"
          title="What we typically build this with."
          description="Chosen per project against your constraints, your team and what you already run — not from a default list."
        />

        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.techGroups.map((group, index) => (
            <Reveal key={group.label} delay={index * 60} className="h-full">
              <div className="border-line h-full rounded-3xl bg-surface p-5 border">
                <dt className="text-ink font-semibold">
                  {group.label}
                </dt>
                <dd>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="bg-surface-2 text-muted border-line rounded-xl px-2.5 py-1 text-xs font-medium border"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      <ProcessSection />

      <FaqSection
        items={service.faqs}
        tone="panel"
        title={`${service.name} questions.`}
        description="The questions that come up most often in first conversations about this kind of work."
      />

      {related.length > 0 ? (
        <Section labelledBy="related-services-heading">
          <SectionHeading
            id="related-services-heading"
            label="Related"
            title="Work that usually goes with this."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {related.map((item, index) => {
              const RelatedIcon = item.icon;

              return (
                <Reveal key={item.slug} delay={index * 70} className="h-full">
                  <Link
                    href={`/services/${item.slug}`}
                    className="group border-line hover:border-ink flex h-full gap-4 rounded-3xl bg-surface p-6 border transition-[border-color] duration-300"
                  >
                    <span className="bg-surface-2 text-ink grid size-11 shrink-0 place-items-center rounded-xl">
                      <RelatedIcon aria-hidden="true" className="size-5" />
                    </span>
                    <span>
                      <span className="text-ink block text-lg font-semibold">
                        {item.name}
                      </span>
                      <span className="text-muted mt-1.5 block text-[0.9375rem] leading-relaxed">
                        {item.promise}
                      </span>
                      <span className="text-accent-2 mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                        Learn more
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title={`Ready to talk about ${service.name.toLowerCase()}?`}
        secondaryLabel="Compare all services"
        secondaryHref="/services"
      />

      <JsonLd
        data={[
          webPageSchema({
            name: service.h1,
            description: service.seo.description,
            path: `/services/${service.slug}`,
          }),
          serviceSchema({
            name: service.name,
            description: service.summary,
            path: `/services/${service.slug}`,
          }),
          breadcrumbSchema(crumbs),
          faqSchema(service.faqs),
        ]}
      />
    </>
  );
}

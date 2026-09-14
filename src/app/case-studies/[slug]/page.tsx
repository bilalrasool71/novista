import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Info } from "lucide-react";

import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { getProduct } from "@/content/products";
import { getService } from "@/content/services";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return {};

  return buildMetadata({
    title: study.seo.title,
    description: study.seo.description,
    path: `/case-studies/${study.slug}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  const services = study.services
    .map((serviceSlug) => getService(serviceSlug))
    .filter((item) => item !== undefined);

  const relatedProducts = study.relatedProducts
    .map((productSlug) => getProduct(productSlug))
    .filter((item) => item !== undefined);

  const others = caseStudies.filter((item) => item.slug !== study.slug).slice(0, 3);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Case Studies", path: "/case-studies" },
    { name: study.client, path: `/case-studies/${study.slug}` },
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        label={study.industry}
        title={study.title}
        description={study.summary}
        actions={
          <>
            <Button href="/contact" size="lg" withArrow>
              Discuss a Similar Project
            </Button>
            <Button href="/case-studies" size="lg" variant="secondary">
              All case studies
            </Button>
          </>
        }
        aside={
          <div className="border-line rounded-3xl bg-surface p-6 border sm:p-7">
            {study.isPlaceholder ? (
              <Badge tone="notice" className="mb-4">
                Illustrative example
              </Badge>
            ) : null}

            <dl className="space-y-5">
              <div>
                <dt className="text-muted eyebrow">
                  Client
                </dt>
                <dd className="text-ink mt-1.5 font-semibold">{study.client}</dd>
              </div>
              <div>
                <dt className="text-muted eyebrow">
                  Industry
                </dt>
                <dd className="text-muted mt-1.5">{study.industry}</dd>
              </div>
              <div>
                <dt className="text-muted eyebrow">
                  Technologies
                </dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {study.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-surface-2 text-muted border-line rounded-xl px-2.5 py-1 text-xs font-medium border"
                    >
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
              {services.length > 0 ? (
                <div>
                  <dt className="text-muted eyebrow">
                    Services
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="bg-surface-2 text-ink hover:bg-surface-2 rounded-xl px-2.5 py-1 text-xs font-semibold transition-colors duration-200"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        }
      />

      {study.isPlaceholder ? (
        <Section className="py-8 sm:py-8 lg:py-8">
          <div className="flex gap-3.5 rounded-2xl border-notice-line bg-notice border p-5">
            <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-notice-icon" />
            <p className="text-[0.9375rem] leading-relaxed text-notice-ink/90">
              <span className="font-semibold">This is an illustrative example.</span>{" "}
              It describes the kind of problem we take on and how we would approach
              it — not a specific client engagement. No client is named or implied,
              and the outcomes listed describe what the delivered system does rather
              than measured results from a particular project.
            </p>
          </div>
        </Section>
      ) : null}

      <Section tone="panel" labelledBy="challenge-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="challenge-heading"
              label="The challenge"
              title="What was not working."
            />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="text-muted text-lg leading-relaxed">{study.challenge}</p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section labelledBy="approach-heading">
        <SectionHeading
          id="approach-heading"
          label="The approach"
          title="How we would tackle it."
          description="The sequencing matters more than the technology. Getting these three decisions right is what keeps a project like this from stalling."
        />

        <ol className="mt-12 grid gap-5 lg:grid-cols-3">
          {study.approach.map((step, index) => (
            <li key={step.title} className="h-full">
              <Reveal delay={index * 70} className="h-full">
                <div className="border-line h-full rounded-3xl bg-surface p-6 border">
                  <span className="bg-surface-2 text-ink font-display grid size-9 place-items-center rounded-xl text-sm font-bold">
                    {index + 1}
                  </span>
                  <h3 className="text-ink mt-4 text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-muted mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="panel" labelledBy="results-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="results-heading"
              label="The outcome"
              title="What the delivered system does."
            />
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="space-y-3">
              {study.results.map((result, index) => (
                <li key={result}>
                  <Reveal delay={index * 60}>
                    <div className="border-line flex gap-3 rounded-3xl bg-surface p-5 border">
                      <Check
                        aria-hidden="true"
                        className="text-ink mt-0.5 size-5 shrink-0"
                      />
                      <span className="text-muted font-medium">{result}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>

            {relatedProducts.length > 0 ? (
              <Reveal className="mt-8">
                <p className="text-muted text-sm">
                  Built on{" "}
                  {relatedProducts.map((product, index) => (
                    <span key={product.slug}>
                      {index > 0 ? ", " : ""}
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-accent-2 hover:text-accent-2 font-semibold transition-colors duration-200"
                      >
                        {product.name}
                      </Link>
                    </span>
                  ))}
                  .
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Section>

      {others.length > 0 ? (
        <Section labelledBy="more-work-heading">
          <SectionHeading id="more-work-heading" label="More work" title="Related projects." />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.map((item, index) => (
              <Reveal key={item.slug} delay={index * 70} className="h-full">
                <CaseStudyCard study={item} index={index + 1} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title="Recognise this problem in your own business?"
        secondaryLabel="Explore Our Services"
      />

      <JsonLd
        data={[
          webPageSchema({
            name: study.title,
            description: study.seo.description,
            path: `/case-studies/${study.slug}`,
          }),
          breadcrumbSchema(crumbs),
        ]}
      />
    </>
  );
}

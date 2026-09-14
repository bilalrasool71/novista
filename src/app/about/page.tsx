import type { Metadata } from "next";
import { Check } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechSection } from "@/components/sections/TechSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { TeamCard } from "@/components/cards/TeamCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { products } from "@/content/products";
import { engagementPrinciples } from "@/content/process";
import { services } from "@/content/services";
import { industries, team, trustStats } from "@/content/site";
import { differentiators } from "@/content/solutions";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "About Novista Solutions";
const DESCRIPTION =
  "Novista Solutions is a software development and technology partner building custom software, AI automation and business platforms. Meet the team and how we work.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  const stats = trustStats.filter((stat) => stat.value !== null);

  return (
    <>
      <PageHero
        crumbs={crumbs}
        label="About us"
        title="We build software that earns its place in a business."
        description="Novista Solutions is a software development and technology partner. We build custom software, AI-powered automation, mobile applications and the platforms businesses run on — and we start every engagement by understanding what the current way of working actually costs."
        actions={
          <>
            <Button href="/contact" size="lg" withArrow>
              Talk to Our Team
            </Button>
            <Button href="/case-studies" size="lg" variant="secondary">
              See Our Work
            </Button>
          </>
        }
      />

      <Section labelledBy="mission-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="mission-heading"
              label="What we believe"
              title="Technology should not be complicated for the sake of it."
            />
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <div className="text-muted space-y-5 text-lg leading-relaxed">
                <p>
                  A lot of software fails for reasons that have nothing to do
                  with engineering. It solves a problem nobody had, or it
                  encodes a process before anyone questioned whether the process
                  made sense, or it is built so elaborately that changing it
                  later costs more than building it did.
                </p>
                <p>
                  We work the other way round. Before architecture and before
                  technology choices, we want to know what a task costs you
                  today — in hours, in errors, in growth you are turning away.
                  That number decides whether a project is worth doing and how
                  big it should be.
                </p>
                <p>
                  Sometimes it tells us to build something substantial. Often it
                  tells us to build something much smaller than expected, or to
                  integrate two systems you already own, or that the honest
                  answer is an off-the-shelf product and no project at all. We
                  would rather say that early than take on work we cannot
                  justify.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {stats.length > 0 ? (
        <Section tone="panel" labelledBy="numbers-heading">
          <SectionHeading
            id="numbers-heading"
            label="Where we are today"
            title="What we have built so far."
            description="Figures we can stand behind. We do not publish statistics we cannot evidence."
          />

          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 70} className="h-full">
                <div className="border-line h-full rounded-3xl bg-surface p-6 border">
                  <dt className="font-display text-accent-2 text-4xl font-bold">
                    {stat.value}
                  </dt>
                  <dd>
                    <span className="text-ink mt-2 block font-semibold">
                      {stat.label}
                    </span>
                    {stat.detail ? (
                      <span className="text-muted mt-1 block text-sm leading-relaxed">
                        {stat.detail}
                      </span>
                    ) : null}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Section>
      ) : null}

      <Section labelledBy="team-heading">
        <SectionHeading
          id="team-heading"
          label="Leadership"
          title="Who you will actually be working with."
          description="Small team, no handover to a different department after the sales conversation. Our CTO reviews the architecture on every engagement."
        />

        <div className="mx-auto mt-12 max-w-4xl space-y-5">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={index * 80} className="h-full">
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="panel" labelledBy="approach-heading">
        <SectionHeading
          id="approach-heading"
          label="How we work"
          title="What working with us is actually like."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {differentiators.map((item, index) => {
            const Icon = item.icon;

            return (
              <li key={item.title} className="h-full">
                <Reveal delay={(index % 2) * 70} className="h-full">
                  <div className="border-line h-full rounded-3xl bg-surface p-6 border">
                    <span className="bg-surface-2 text-ink grid size-11 place-items-center rounded-xl">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="text-ink mt-4 text-lg font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-muted mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-8">
          <ul className="border-line grid gap-x-8 gap-y-3 border-t pt-8 sm:grid-cols-2">
            {engagementPrinciples.map((principle) => (
              <li key={principle} className="text-muted flex gap-2.5">
                <Check
                  aria-hidden="true"
                  className="text-ink mt-1 size-4.5 shrink-0"
                />
                {principle}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section labelledBy="scope-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              id="scope-heading"
              label="What we do"
              title="Four practice areas, twelve platforms, six industries."
              description="Broad enough to solve the whole problem, narrow enough that we are genuinely good at each part."
            />
          </div>

          <Reveal>
            <dl className="space-y-6">
              <div>
                <dt className="text-muted eyebrow">Services</dt>
                <dd className="mt-2.5 flex flex-wrap gap-1.5">
                  {services.map((service) => (
                    <span
                      key={service.slug}
                      className="bg-surface-2 text-ink rounded-xl px-3 py-1.5 text-sm font-medium"
                    >
                      {service.name}
                    </span>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="text-muted eyebrow">Products</dt>
                <dd className="mt-2.5 flex flex-wrap gap-1.5">
                  {products.map((product) => (
                    <span
                      key={product.slug}
                      className="bg-surface-2 text-muted border-line rounded-xl px-3 py-1.5 text-sm font-medium border"
                    >
                      {product.name}
                    </span>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="text-muted eyebrow">Industries</dt>
                <dd className="mt-2.5 flex flex-wrap gap-1.5">
                  {industries.map((industry) => (
                    <span
                      key={industry}
                      className="bg-surface-2 text-ink rounded-xl px-3 py-1.5 text-sm font-medium"
                    >
                      {industry}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      <ProcessSection tone="panel" />
      <TechSection />
      <TestimonialsSection />

      <CtaBand
        title="Let's talk about what you are trying to build."
        secondaryLabel="Read our insights"
        secondaryHref="/insights"
      />

      <JsonLd
        data={[
          webPageSchema({
            name: TITLE,
            description: DESCRIPTION,
            path: "/about",
          }),
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: TITLE,
            description: DESCRIPTION,
          },
        ]}
      />
    </>
  );
}

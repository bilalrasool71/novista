import type { Metadata } from "next";
import { Info } from "lucide-react";

import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { caseStudies, hasPlaceholderCaseStudies } from "@/content/case-studies";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "Case Studies";
const DESCRIPTION =
  "How Novista Solutions approaches real operational problems — consolidating multi-site systems, automating support with AI, and taking field operations off paper.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/case-studies",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Case Studies", path: "/case-studies" },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        label="Our work"
        title="Problems worth solving, and how we solved them."
        description="Each of these starts the same way: something operational was costing real money, and nobody could see the whole picture. The interesting part is rarely the technology."
        actions={
          <Button href="/contact" size="lg" withArrow>
            Discuss Your Project
          </Button>
        }
      />

      <Section labelledBy="case-studies-list-heading">
        <h2 id="case-studies-list-heading" className="sr-only">
          All case studies
        </h2>

        {/*
          Honest labelling. These are illustrative until we publish
          client-approved engagements — see src/content/case-studies.ts.
        */}
        {hasPlaceholderCaseStudies ? (
          <div className="mb-10 flex gap-3.5 rounded-2xl border-notice-line bg-notice border p-5">
            <Info
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-notice-icon"
            />
            <div>
              <p className="font-display font-semibold text-notice-ink">
                These are illustrative examples
              </p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-notice-ink/85">
                The scenarios below describe the kind of work we do and how we
                approach it. They are not accounts of specific client engagements,
                and no client is named or implied. We publish named case studies
                only with written client approval — if you would like references
                for work in your sector,{" "}
                <a href="/contact" className="font-semibold underline underline-offset-2">
                  ask us directly
                </a>
                .
              </p>
            </div>
          </div>
        ) : null}

        {caseStudies.length === 0 ? (
          <div className="border-line rounded-xl border border-dashed p-12 text-center">
            <p className="text-ink text-lg font-semibold">
              No case studies published yet
            </p>
            <p className="text-muted mx-auto mt-2 max-w-md">
              We are preparing client-approved write-ups. In the meantime, we are
              happy to talk through comparable work in your sector.
            </p>
            <Button href="/contact" className="mt-6" withArrow>
              Talk to Our Team
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, index) => (
              <Reveal key={study.slug} delay={(index % 3) * 70} className="h-full">
                <CaseStudyCard study={study} index={index} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      <ProcessSection tone="panel" />

      <CtaBand
        title="Have a problem that looks like one of these?"
        secondaryLabel="Explore Our Services"
      />

      <JsonLd
        data={[
          webPageSchema({
            name: TITLE,
            description: DESCRIPTION,
            path: "/case-studies",
          }),
          breadcrumbSchema(crumbs),
        ]}
      />
    </>
  );
}

import { Check } from "lucide-react";

import { Card, CardBody, CardIcon, CardTitle } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { engagementPrinciples, processSteps } from "@/content/process";

export function ProcessSection({
  tone = "surface",
}: {
  tone?: "surface" | "panel";
}) {
  return (
    <Section tone={tone} id="process" labelledBy="process-heading">
      <SectionHeading
        id="process-heading"
        label="How we work"
        title="From idea to impact"
        description="The same five stages on every engagement, scaled to the size of the project. You always know which one you are in and what comes next."
      />

      <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.map((step, position) => (
          <li key={step.number} className="h-full">
            <Reveal delay={position * 60} className="h-full">
              <Card className="group">
                <div className="flex items-center justify-between gap-3">
                  <CardIcon icon={step.icon} className="size-10" />
                  <span className="text-muted text-2xl leading-none font-extrabold">
                    {step.number}
                  </span>
                </div>
                <CardTitle className="mt-5">{step.title}</CardTitle>
                <CardBody className="mt-2">{step.summary}</CardBody>
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>

      {/*
        Aligned to the card grid above rather than centred in a box of its own:
        the principles hold whichever stage you are in, so they read as a
        footnote to the whole row, under one rule.
      */}
      <Reveal className="mt-14">
        <div className="border-line grid gap-x-10 gap-y-6 border-t pt-8 lg:grid-cols-12">
          <p className="eyebrow text-muted lg:col-span-3">However we engage</p>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:col-span-9">
            {engagementPrinciples.map((principle) => (
              <li
                key={principle}
                className="text-muted flex gap-2.5 text-[0.9375rem] leading-[1.55]"
              >
                <Check
                  aria-hidden="true"
                  className="text-accent-2 mt-0.5 size-4 shrink-0"
                />
                {principle}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

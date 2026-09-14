import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { businessProblems } from "@/content/solutions";

export function ProblemsSection() {
  return (
    <Section tone="panel" labelledBy="problems-heading">
      <SectionHeading
        id="problems-heading"
        label="Sound familiar?"
        title="Technology should solve problems — not create more of them"
        description="Most businesses arrive with frustrations, not a specification. These are the ones we hear most."
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {businessProblems.map((item, index) => (
          <li key={item.problem} className="h-full">
            <Reveal delay={(index % 3) * 60} className="h-full">
              <Card>
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-notice text-notice-icon">
                  <TriangleAlert aria-hidden="true" className="size-5" />
                </span>
                <CardTitle className="mt-5">{item.problem}</CardTitle>
              </Card>
            </Reveal>
          </li>
        ))}

        <li className="h-full">
          <Reveal delay={120} className="h-full">
            <div className="bg-night relative flex h-full flex-col overflow-hidden rounded-3xl p-6 sm:p-7">
              <div
                aria-hidden="true"
                className="night-wash pointer-events-none absolute inset-0 opacity-70"
              />
              <div className="relative flex h-full flex-col">
                <p className="text-night-ink text-lg leading-snug font-bold">
                  We turn these into practical digital solutions.
                </p>
                <Button
                  href="/contact"
                  variant="secondary"
                  size="sm"
                  className="mt-auto w-fit"
                  withArrow
                >
                  Discuss Your Challenge
                </Button>
              </div>
            </div>
          </Reveal>
        </li>
      </ul>
    </Section>
  );
}

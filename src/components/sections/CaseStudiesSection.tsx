import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { caseStudies } from "@/content/case-studies";

export function CaseStudiesSection({
  limit = 3,
  tone = "surface",
}: {
  limit?: number;
  tone?: "surface" | "panel";
}) {
  const studies = caseStudies.slice(0, limit);

  // Empty state: the section removes itself rather than rendering a shell.
  if (studies.length === 0) return null;

  return (
    <Section tone={tone} id="case-studies" labelledBy="case-studies-heading">
      <SectionHeading
        id="case-studies-heading"
        label="Case studies"
        title="What this looks like in practice"
        description="An operational problem that was costing real money, and the system that removed it."
      />

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {studies.map((study, position) => (
          <li key={study.slug} className="h-full">
            <Reveal delay={position * 60} className="h-full">
              <CaseStudyCard study={study} index={position} />
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="mt-10">
        <Button href="/case-studies" variant="secondary" withArrow>
          See Our Work
        </Button>
      </Reveal>
    </Section>
  );
}

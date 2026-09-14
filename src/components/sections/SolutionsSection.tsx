import { Card, CardAction, CardBody, CardIcon, CardTitle } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getService } from "@/content/services";
import { solutionScenarios } from "@/content/solutions";

export function SolutionsSection({
  limit,
  tone = "surface",
  showDetail = false,
}: {
  limit?: number;
  tone?: "surface" | "panel";
  /** The /solutions page adds the approach steps. */
  showDetail?: boolean;
}) {
  const scenarios = limit ? solutionScenarios.slice(0, limit) : solutionScenarios;

  return (
    <Section tone={tone} id="solutions" labelledBy="solutions-heading">
      <SectionHeading
        id="solutions-heading"
        label="Where to start"
        title="Start from what you need, not from what we sell"
        description="Most conversations begin with one of these. Each maps to a way of working rather than a package."
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {scenarios.map((scenario, position) => {
          const service = getService(scenario.service);

          return (
            <li
              key={scenario.slug}
              id={scenario.slug}
              className="h-full scroll-mt-28"
            >
              <Reveal delay={(position % 3) * 60} className="h-full">
                <Card href={service ? `/services/${service.slug}` : undefined}>
                  <CardIcon icon={scenario.icon} />
                  <CardTitle className="mt-5">{scenario.need}</CardTitle>
                  <CardBody className="mt-2.5">{scenario.answer}</CardBody>

                  {showDetail ? (
                    <ol className="mt-5 space-y-2">
                      {scenario.steps.map((step, stepIndex) => (
                        <li
                          key={step}
                          className="text-muted flex gap-2.5 text-sm leading-[1.5]"
                        >
                          <span className="bg-surface-2 text-muted border-line grid size-5 shrink-0 place-items-center rounded-full border text-[0.625rem] font-bold">
                            {stepIndex + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  ) : null}

                  {service ? <CardAction>{service.name}</CardAction> : null}
                </Card>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

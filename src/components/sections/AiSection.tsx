import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardIcon, CardTitle } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { aiUseCases } from "@/content/solutions";

export function AiSection() {
  return (
    <Section tone="feature" id="ai" labelledBy="ai-heading">
      <SectionHeading
        id="ai-heading"
        label="AI Solutions"
        title={
          <>
            AI is not the future. It is already changing how businesses{" "}
            <span className="text-gradient">
              operate
            </span>
          </>
        }
        description="We find the workflows where it pays back, and prove it before we build."
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {aiUseCases.map((useCase, index) => (
          <li key={useCase.title} className="h-full">
            <Reveal delay={(index % 3) * 60} className="h-full">
              <Card>
                <CardIcon icon={useCase.icon} />
                <CardTitle className="mt-5">
                  {useCase.title}
                </CardTitle>
                <CardBody className="mt-2.5">
                  {useCase.description}
                </CardBody>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="mt-12 text-center">
        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
          <Button href="/services/ai-solutions" variant="secondary" size="lg" withArrow>
            Explore AI Solutions
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Talk to Our Team
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

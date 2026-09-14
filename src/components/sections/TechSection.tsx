import { Card, CardBody, CardChips, CardIcon, CardTitle } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { techGroups, techPhilosophy } from "@/content/tech";

export function TechSection({ tone = "surface" }: { tone?: "surface" | "panel" }) {
  return (
    <Section tone={tone} id="technology" labelledBy="tech-heading">
      <SectionHeading
        id="tech-heading"
        label="Technology"
        title="The right tool for your problem"
        description={techPhilosophy}
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {techGroups.map((group, index) => (
          <li key={group.label} className="h-full">
            <Reveal delay={(index % 3) * 60} className="h-full">
              <Card>
                <CardIcon icon={group.icon} className="size-10" />
                <CardTitle className="mt-5">{group.label}</CardTitle>
                <CardBody className="mt-2">{group.description}</CardBody>
                <CardChips items={group.items} />
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

import { Button } from "@/components/ui/Button";
import { TeamCard } from "@/components/cards/TeamCard";
import { Card, CardBody, CardIcon, CardTitle } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { team } from "@/content/site";
import { differentiators } from "@/content/solutions";

export function AboutSection({
  tone = "surface",
}: {
  tone?: "surface" | "panel";
}) {
  return (
    <Section tone={tone} labelledBy="about-heading">
      <SectionHeading
        id="about-heading"
        label="About Novista"
        title="Practical technology, built by people who ask about your business first"
        description="We build solutions that solve real business problems — and we are straight with you about which ones software cannot solve."
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {differentiators.map((item, position) => (
          <li key={item.title} className="h-full">
            <Reveal delay={position * 60} className="h-full">
              <Card>
                <CardIcon icon={item.icon} className="size-10" />
                <CardTitle className="mt-5">{item.title}</CardTitle>
                <CardBody className="mt-2">{item.description}</CardBody>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="mt-12">
        <ul className="mx-auto max-w-4xl space-y-5">
          {team.map((member) => (
            <li key={member.name} className="h-full">
              <TeamCard member={member} />
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-12 text-center">
        <Button href="/about" variant="secondary" withArrow>
          Learn About Us
        </Button>
      </Reveal>
    </Section>
  );
}

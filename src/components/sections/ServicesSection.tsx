import { Button } from "@/components/ui/Button";
import {
  Card,
  CardAction,
  CardBody,
  CardChips,
  CardIcon,
  CardTitle,
} from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { services } from "@/content/services";

export function ServicesSection({
  showCta = true,
  tone = "surface",
}: {
  showCta?: boolean;
  tone?: "surface" | "panel";
}) {
  return (
    <Section tone={tone} id="services" labelledBy="services-heading">
      <SectionHeading
        id="services-heading"
        label="Services"
        title="Four ways we help"
        description="Four practice areas, one team. Most projects draw on more than one — which is the point, because the parts have to work together."
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <li key={service.slug} className="h-full">
            <Reveal delay={index * 70} className="h-full">
              <Card href={`/services/${service.slug}`}>
                <CardIcon icon={service.icon} />
                <CardTitle className="mt-5">{service.name}</CardTitle>
                <CardBody className="mt-2.5">{service.promise}</CardBody>
                <CardChips items={service.capabilities} />
                <CardAction />
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>

      {showCta ? (
        <Reveal className="mt-12 text-center">
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            <Button href="/services" variant="secondary" withArrow>
              Compare all services
            </Button>
            <Button href="/solutions" variant="ghost">
              Explore Our Solutions
            </Button>
          </div>
        </Reveal>
      ) : null}
    </Section>
  );
}

import {
  Card,
  CardAction,
  CardBody,
  CardChips,
  CardIcon,
  CardTitle,
} from "@/components/ui/Card";
import type { Service } from "@/content/services";

/**
 * The whole card is a single link: one tab stop, one large target, and the
 * accessible name comes from the service rather than "Learn more".
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card href={`/services/${service.slug}`}>
      <CardIcon icon={service.icon} />
      <CardTitle className="mt-5">{service.name}</CardTitle>
      <p className="text-accent-2 mt-2 text-sm font-medium">
        {service.promise}
      </p>
      <CardBody className="mt-3">{service.summary}</CardBody>
      <CardChips items={service.capabilities} />
      <CardAction />
    </Card>
  );
}

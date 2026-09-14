import type { Faq } from "@/content/services";
import { FaqList } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

/**
 * The answers are real text in the DOM, which is what makes it legitimate to
 * emit FAQPage structured data for the same questions on the page.
 */
export function FaqSection({
  items,
  title = "Questions we get asked a lot.",
  description = "If yours is not here, ask us directly — we will give you a straight answer rather than a brochure.",
  showAllLink = true,
  tone = "surface",
}: {
  items: Faq[];
  title?: string;
  description?: string;
  showAllLink?: boolean;
  tone?: "surface" | "panel";
}) {
  if (items.length === 0) return null;

  return (
    <Section tone={tone} id="faq" labelledBy="faq-heading">
      <SectionHeading
        id="faq-heading"
        label="FAQs"
        title={title}
        description={description}
      />

      <div className="mt-14 lg:mt-16">
        <Reveal>
          <FaqList items={items} />
        </Reveal>
      </div>

      {showAllLink ? (
        <Reveal className="mt-10">
          <Button href="/faq" variant="secondary" withArrow>
            Read all FAQs
          </Button>
        </Reveal>
      ) : null}
    </Section>
  );
}

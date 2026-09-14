import { Quote } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { testimonials } from "@/content/testimonials";

/**
 * Renders nothing until a real, approved testimonial exists in
 * content/testimonials.ts. We would rather show no section than an empty
 * shell or an invented quote.
 */
export function TestimonialsSection({ tone = "panel" }: { tone?: "surface" | "panel" }) {
  if (testimonials.length === 0) return null;

  return (
    <Section tone={tone} labelledBy="testimonials-heading">
      <SectionHeading
        id="testimonials-heading"
        label="In their words"
        title="What clients say about working with us."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 80} className="h-full">
            <figure className="border-line flex h-full flex-col rounded-3xl bg-surface p-6 border">
              <Quote aria-hidden="true" className="text-accent-2 size-7" />
              <blockquote className="text-muted mt-4 text-[1.0625rem] leading-relaxed">
                {testimonial.quote}
              </blockquote>
              <figcaption className="border-line mt-auto flex items-center gap-3 border-t pt-5">
                <span className="bg-surface-2 text-ink font-display grid size-10 shrink-0 place-items-center rounded-xl text-sm font-bold">
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span>
                  <span className="text-ink block text-sm font-semibold">
                    {testimonial.name}
                  </span>
                  <span className="text-muted block text-sm">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

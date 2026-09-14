import type { Metadata } from "next";
import { Clock, Lock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { homepageFaqs } from "@/content/faqs";
import { FaqList } from "@/components/ui/Accordion";
import { processSteps } from "@/content/process";
import { contact, site } from "@/content/site";
import { breadcrumbSchema, buildMetadata, faqSchema, webPageSchema } from "@/lib/seo";

const TITLE = "Contact Us";
const DESCRIPTION =
  "Tell us what you are trying to achieve and we will help you figure out the best way forward. Novista Solutions replies to every enquiry within one business day.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/contact",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        label="Contact"
        title="Have an idea, challenge, or project in mind?"
        description="Tell us what you are trying to achieve. We will help you figure out the best way forward — including telling you honestly when the answer is not a software project."
      />

      <Section className="pt-0 sm:pt-0 lg:pt-0" labelledBy="contact-form-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 id="contact-form-heading" className="sr-only">
              Send us a message
            </h2>
            <ContactForm />
          </div>

          <div className="lg:col-span-5">
            <div className="space-y-4">
              <Reveal>
                <div className="border-line rounded-3xl bg-surface p-6 border">
                  <h3 className="text-ink text-lg font-semibold">
                    Other ways to reach us
                  </h3>

                  <ul className="mt-4 space-y-3.5">
                    <li>
                      <a
                        href={`mailto:${contact.email}`}
                        className="group flex items-start gap-3"
                      >
                        <span className="bg-surface-2 text-ink grid size-9 shrink-0 place-items-center rounded-xl">
                          <Mail aria-hidden="true" className="size-4" />
                        </span>
                        <span>
                          <span className="text-muted block eyebrow">
                            Email
                          </span>
                          <span className="text-muted group-hover:text-accent-2 block font-medium transition-colors duration-200">
                            {contact.email}
                          </span>
                        </span>
                      </a>
                    </li>

                    {contact.phone ? (
                      <li>
                        <a
                          href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                          className="group flex items-start gap-3"
                        >
                          <span className="bg-surface-2 text-ink grid size-9 shrink-0 place-items-center rounded-xl">
                            <Phone aria-hidden="true" className="size-4" />
                          </span>
                          <span>
                            <span className="text-muted block eyebrow">
                              Phone
                            </span>
                            <span className="text-muted group-hover:text-accent-2 block font-medium transition-colors duration-200">
                              {contact.phone}
                            </span>
                          </span>
                        </a>
                      </li>
                    ) : null}

                    {contact.locationLabel ? (
                      <li className="flex items-start gap-3">
                        <span className="bg-surface-2 text-ink grid size-9 shrink-0 place-items-center rounded-xl">
                          <MapPin aria-hidden="true" className="size-4" />
                        </span>
                        <span>
                          <span className="text-muted block eyebrow">
                            Location
                          </span>
                          <span className="text-muted block font-medium">
                            {contact.locationLabel}
                          </span>
                        </span>
                      </li>
                    ) : null}

                    <li className="flex items-start gap-3">
                      <span className="bg-surface-2 text-ink grid size-9 shrink-0 place-items-center rounded-xl">
                        <Clock aria-hidden="true" className="size-4" />
                      </span>
                      <span>
                        <span className="text-muted block eyebrow">
                          Response time
                        </span>
                        <span className="text-muted block font-medium">
                          {contact.responseTime}
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={70}>
                <div className="bg-night relative overflow-hidden rounded-3xl p-6">
                  <div
                    aria-hidden="true"
                    className="night-wash pointer-events-none absolute inset-0 opacity-70"
                  />
                  <div className="relative">
                    <h3 className="font-display text-night-ink text-lg font-semibold">
                      What happens next
                    </h3>
                    <ol className="mt-4 space-y-3">
                      {[
                        "We read your message — a person, not an autoresponder.",
                        "You get a reply within one business day, with initial thoughts.",
                        "A short call to understand the problem properly. No charge.",
                        "A written scope, timeline and cost for a first phase.",
                      ].map((step, index) => (
                        <li key={step} className="text-night-muted flex gap-3 text-[0.9375rem]">
                          <span
                            aria-hidden="true"
                            className="text-night-ink grid size-6 shrink-0 place-items-center rounded-full bg-white/12 text-xs font-bold"
                          >
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="border-line flex gap-3 rounded-3xl bg-surface p-5 border">
                  <Lock aria-hidden="true" className="text-muted mt-0.5 size-4 shrink-0" />
                  <p className="text-muted text-sm leading-relaxed">
                    Your details are used only to respond to this enquiry. We do not
                    sell or share them, and we will not add you to a mailing list.
                    See our{" "}
                    <a
                      href="/privacy-policy"
                      className="text-accent-2 hover:text-accent-2 font-medium underline underline-offset-2 transition-colors duration-200"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="panel" labelledBy="contact-process-heading">
        <SectionHeading
          id="contact-process-heading"
          label="How a project runs"
          title="From first message to working software."
        />

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <li key={step.number}>
              <Reveal delay={index * 60} className="h-full">
                <div className="border-line h-full rounded-3xl bg-surface p-5 border">
                  <span className="font-display text-accent-2 text-sm font-bold">
                    {step.number}
                  </span>
                  <h3 className="text-ink mt-1 font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-muted mt-1.5 text-sm leading-relaxed">
                    {step.summary}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="contact-faq-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="contact-faq-heading"
              label="Before you write"
              title="Answers that might save you a message."
            />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <FaqList items={homepageFaqs} />
            </Reveal>
          </div>
        </div>
      </Section>

      <JsonLd
        data={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: "/contact" }),
          breadcrumbSchema(crumbs),
          faqSchema(homepageFaqs),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: TITLE,
            description: DESCRIPTION,
            about: { "@type": "Organization", name: site.name },
          },
        ]}
      />
    </>
  );
}

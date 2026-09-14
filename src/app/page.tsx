import type { Metadata } from "next";

import { AiSection } from "@/components/sections/AiSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { homepageFaqs } from "@/content/faqs";
import { faqSchema, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  // The root layout's title template would append the brand twice, so the
  // homepage sets an absolute title.
  title: {
    absolute: "Software Development & AI Solutions Company | Novista Solutions",
  },
  description:
    "Novista Solutions builds custom software, AI automation, web and mobile applications, and digital platforms for businesses ready to work smarter and scale with confidence.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProductsSection />
      <AiSection />
      <CaseStudiesSection tone="panel" />
      <CtaBand />

      <JsonLd
        data={[
          webPageSchema({
            name: "Software Development & AI Solutions Company",
            description:
              "Custom software, AI automation, web and mobile applications and digital transformation from Novista Solutions.",
            path: "/",
          }),
          faqSchema(homepageFaqs),
        ]}
      />
    </>
  );
}

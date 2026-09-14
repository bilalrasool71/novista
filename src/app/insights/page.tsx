import type { Metadata } from "next";

import { PostCard } from "@/components/cards/PostCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getPostsSorted, postCategories } from "@/content/insights";
import { absoluteUrl, breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "Insights";
const DESCRIPTION =
  "Practical writing on custom software, AI automation, legacy modernisation and choosing a development partner — from the team at Novista Solutions.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/insights",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Insights", path: "/insights" },
];

export default function InsightsPage() {
  const posts = getPostsSorted();

  return (
    <>
      <PageHero
        crumbs={crumbs}
        label="Insights"
        title="Thinking worth reading before you commit budget."
        description="No trend pieces and no filler. These are the arguments we find ourselves making in first conversations — about when custom software is justified, where AI actually pays back, and how to tell a good development partner from a convincing one."
      />

      <Section labelledBy="articles-heading">
        <h2 id="articles-heading" className="sr-only">
          All articles
        </h2>

        {posts.length === 0 ? (
          <div className="border-line rounded-xl border border-dashed p-12 text-center">
            <p className="text-ink text-lg font-semibold">
              Nothing published yet
            </p>
            <p className="text-muted mx-auto mt-2 max-w-md">
              We are writing. In the meantime, we are happy to answer specific
              questions directly.
            </p>
            <Button href="/contact" className="mt-6" withArrow>
              Ask us a question
            </Button>
          </div>
        ) : (
          <>
            <Reveal>
              <ul className="mb-10 flex flex-wrap gap-2">
                {postCategories.map((category) => (
                  <li
                    key={category}
                    className="bg-surface-2 text-muted border-line rounded-xl px-3.5 py-1.5 text-sm font-medium border"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.slug} delay={(index % 3) * 70} className="h-full">
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </Section>

      <CtaBand
        title="Have a question these did not answer?"
        description="Ask it directly. We would rather give you a useful answer than a follow-up sequence."
        primaryLabel="Ask Our Team"
        secondaryLabel="Explore Our Services"
      />

      <JsonLd
        data={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: "/insights" }),
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${TITLE} — Novista Solutions`,
            description: DESCRIPTION,
            url: absoluteUrl("/insights"),
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: absoluteUrl(`/insights/${post.slug}`),
              datePublished: post.publishedAt,
              dateModified: post.updatedAt,
              author: { "@type": "Person", name: post.author.name },
            })),
          },
        ]}
      />
    </>
  );
}

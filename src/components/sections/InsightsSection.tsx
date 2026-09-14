import { PostCard } from "@/components/cards/PostCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getPostsSorted } from "@/content/insights";

export function InsightsSection({
  limit = 3,
  tone = "surface",
}: {
  limit?: number;
  tone?: "surface" | "panel";
}) {
  const posts = getPostsSorted().slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <Section tone={tone} labelledBy="insights-heading">
      <SectionHeading
        id="insights-heading"
        label="Insights"
        title="Thinking worth reading before you commit budget."
        description="Practical writing on custom software, AI adoption and modernisation — the arguments we would make in a first conversation."
      />

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {posts.map((post, position) => (
          <li key={post.slug} className="h-full">
            <Reveal delay={position * 60} className="h-full">
              <PostCard post={post} />
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="mt-10">
        <Button href="/insights" variant="secondary" withArrow>
          Read all insights
        </Button>
      </Reveal>
    </Section>
  );
}

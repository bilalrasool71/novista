import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, RefreshCcw } from "lucide-react";

import { PostCard } from "@/components/cards/PostCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import {
  getPost,
  getRelatedPosts,
  posts,
  readingMinutes,
} from "@/content/insights";
import { getService } from "@/content/services";
import {
  DEFAULT_OG_IMAGE,
  articleSchema,
  breadcrumbSchema,
  buildMetadata,
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return {};

  return buildMetadata({
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    path: `/insights/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: [post.author.name],
  });
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const related = getRelatedPosts(post.slug);
  const relatedServices = post.relatedServices
    .map((serviceSlug) => getService(serviceSlug))
    .filter((item) => item !== undefined);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: post.title, path: `/insights/${post.slug}` },
  ];

  const wasUpdated = post.updatedAt !== post.publishedAt;

  return (
    <>
      <article>
        <header className="relative overflow-hidden">
          <Container size="narrow" className="relative pt-8 pb-10 sm:pt-10">
            <Breadcrumbs crumbs={crumbs} className="mb-8" />

            <p className="text-accent-2 eyebrow text-xs">
              {post.category}
            </p>

            <h1 className="mt-3 text-[2.125rem] leading-[1.15] font-semibold tracking-[-0.03em] sm:text-[2.625rem]">
              {post.title}
            </h1>

            <p className="text-muted mt-5 text-lg leading-relaxed">
              {post.excerpt}
            </p>

            <div className="border-line/70 text-muted mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-6 text-sm">
              <span className="text-muted font-semibold">{post.author.name}</span>
              <span className="text-muted">{post.author.role}</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays aria-hidden="true" className="size-4" />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              {wasUpdated ? (
                <span className="inline-flex items-center gap-1.5">
                  <RefreshCcw aria-hidden="true" className="size-4" />
                  Updated{" "}
                  <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden="true" className="size-4" />
                {readingMinutes(post)} min read
              </span>
            </div>
          </Container>
        </header>

        <Container size="narrow" className="pb-16 sm:pb-20">
          <Prose blocks={post.body} />

          <footer className="border-line mt-14 border-t pt-8">
            <p className="text-muted eyebrow">
              Topics
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="bg-surface-2 text-muted border-line rounded-xl px-3 py-1.5 text-sm font-medium border"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {relatedServices.length > 0 ? (
              <div className="mt-8">
                <p className="text-muted eyebrow">
                  Related services
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {relatedServices.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="bg-surface-2 text-ink hover:bg-surface-2 inline-flex rounded-xl px-3.5 py-1.5 text-sm font-semibold transition-colors duration-200"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </footer>
        </Container>
      </article>

      {related.length > 0 ? (
        <Section tone="panel" labelledBy="related-reading-heading">
          <SectionHeading
            id="related-reading-heading"
            label="Keep reading"
            title="Related articles."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 70} className="h-full">
                <PostCard post={item} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title="Want to talk this through for your own business?"
        description="Every business is a slightly different version of the same problem. Tell us yours and we will give you a straight opinion."
        primaryLabel="Talk to Our Team"
        secondaryLabel="Read more insights"
        secondaryHref="/insights"
      />

      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.seo?.description ?? post.excerpt,
            path: `/insights/${post.slug}`,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            authorName: post.author.name,
            image: DEFAULT_OG_IMAGE,
          }),
          breadcrumbSchema(crumbs),
        ]}
      />
    </>
  );
}

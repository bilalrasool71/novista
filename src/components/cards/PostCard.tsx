import { CalendarDays, Clock } from "lucide-react";

import { Card, CardAction, CardBody, CardTitle } from "@/components/ui/Card";
import { type Post, readingMinutes } from "@/content/insights";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card href={`/insights/${post.slug}`} as="article">
      <span className="bg-surface-2 text-accent-2 w-fit rounded-full px-2.5 py-1 text-xs font-semibold">
        {post.category}
      </span>

      <CardTitle className="mt-4">{post.title}</CardTitle>
      <CardBody className="mt-2.5">{post.excerpt}</CardBody>

      <div className="text-muted mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays aria-hidden="true" className="size-3.5" />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock aria-hidden="true" className="size-3.5" />
          {readingMinutes(post)} min read
        </span>
      </div>

      <CardAction>Read article</CardAction>
    </Card>
  );
}

import { Lightbulb } from "lucide-react";

import type { Block } from "@/content/insights";

/**
 * Renders an article body from structured blocks.
 *
 * No markdown parser and no dangerouslySetInnerHTML: article content can only
 * ever be text inside a known element, which removes a whole class of
 * injection risk from the content pipeline.
 *
 * Headings start at h2 because the article title owns the page's single h1.
 */
export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-none">
      {blocks.map((block, index) => {
        switch (block.t) {
          case "h2":
            return (
              <h2
                key={index}
                className="mt-12 mb-4 scroll-mt-28 text-2xl font-semibold sm:text-[1.75rem]"
              >
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3
                key={index}
                className="mt-8 mb-3 scroll-mt-28 text-lg font-semibold sm:text-xl"
              >
                {block.text}
              </h3>
            );

          case "p":
            return (
              <p key={index} className="mt-5 text-[1.0625rem] leading-[1.75] text-muted">
                {block.text}
              </p>
            );

          case "ul":
            return (
              <ul key={index} className="mt-5 space-y-3">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="relative pl-6 text-[1.0625rem] leading-[1.7] text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-accent-2 absolute top-[0.7em] left-0 size-1.5 rounded-full"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={index} className="mt-5 space-y-3">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={item}
                    className="relative pl-9 text-[1.0625rem] leading-[1.7] text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="border-line bg-surface-2 text-ink absolute top-[0.15em] left-0 grid size-6 place-items-center rounded-full border text-xs font-bold"
                    >
                      {itemIndex + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-accent-2 text-muted mt-8 border-l-2 pl-6 text-xl leading-relaxed font-medium italic"
              >
                {block.text}
              </blockquote>
            );

          case "callout":
            return (
              <aside
                key={index}
                className="border-line bg-surface-2 mt-8 rounded-3xl border p-6"
              >
                <p className="text-ink flex items-center gap-2 font-display font-semibold">
                  <Lightbulb aria-hidden="true" className="size-4.5 shrink-0" />
                  {block.title}
                </p>
                <p className="text-muted mt-2 text-[1.0625rem] leading-[1.7]">
                  {block.text}
                </p>
              </aside>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

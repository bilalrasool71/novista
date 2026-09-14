import { Plus } from "lucide-react";

import type { Faq } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * Built on native <details>/<summary>: keyboard and screen-reader behaviour
 * comes for free, it works without JavaScript, and the answers are real text
 * in the DOM — which matters because these questions are also emitted as
 * FAQPage structured data.
 */
export function FaqList({
  items,
  className,
}: {
  items: Faq[];
  className?: string;
}) {
  return (
    <div className={className}>
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary
            className={cn(
              "flex cursor-pointer list-none items-start justify-between gap-8 py-6 text-left",
              "[&::-webkit-details-marker]:hidden",
              "rule",
            )}
          >
            <span
              className={cn(
                "font-display flex-1 text-[clamp(1.125rem,1.9vw,1.5rem)] leading-[1.2] transition-opacity duration-200 group-hover:opacity-60",
                "text-ink",
              )}
            >
              {item.question}
            </span>
            <Plus
              aria-hidden="true"
              className={cn(
                "mt-1.5 size-5 shrink-0 transition-transform duration-300 group-open:rotate-45",
                "text-muted",
              )}
            />
          </summary>

          <div
            className={cn(
              "pb-8 text-[0.9375rem] leading-[1.7]",
              "text-muted",
            )}
          >
            <p className="max-w-2xl">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

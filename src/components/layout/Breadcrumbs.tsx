import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

/**
 * Visible breadcrumbs. Pair with `breadcrumbSchema(crumbs)` from lib/seo on
 * the same page so the markup and the structured data always agree.
 *
 * The final crumb is the current page and is not a link.
 */
export function Breadcrumbs({
  crumbs,
  className,
}: {
  crumbs: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="text-muted flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem]">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight
                  aria-hidden="true"
                  className={cn("size-3 shrink-0 opacity-60")}
                />
              ) : null}

              {isLast ? (
                <span
                  aria-current="page"
                  className={cn("text-ink font-medium")}
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="text-muted hover:text-accent-2 transition-colors duration-200"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

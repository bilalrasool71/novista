import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryNav } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you were looking for does not exist. Browse our services, products and insights, or get in touch.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <span className="bg-surface-2 text-accent-2 mx-auto grid size-14 place-items-center rounded-xl">
            <Compass aria-hidden="true" className="size-7" />
          </span>

          <p className="text-accent-2 mt-6 eyebrow text-xs">
            404
          </p>

          <h1 className="mt-3 text-[2.125rem] leading-tight font-semibold tracking-[-0.03em] sm:text-[2.75rem]">
            Looks like you&apos;ve taken a wrong turn.
          </h1>

          <p className="text-muted mt-5 text-lg leading-relaxed">
            That page does not exist, or it has moved. Nothing is broken on your
            end — here is the way back.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/" size="lg" withArrow>
              Back to Home
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              Talk to Our Team
            </Button>
          </div>

          <nav aria-label="Popular pages" className="border-line/70 mt-12 border-t pt-8">
            <p className="text-muted eyebrow">
              Or try one of these
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="border-line text-muted hover:text-accent-2 hover:border-ink group inline-flex items-center gap-1.5 rounded-xl bg-surface px-4 py-2 text-sm font-medium border transition-[color,border-color] duration-200"
                  >
                    {item.label}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
}

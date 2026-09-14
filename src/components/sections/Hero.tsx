import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Aurora } from "@/components/visuals/Aurora";
import { PlatformWall } from "@/components/visuals/PlatformWall";
import { products } from "@/content/products";
import { industries } from "@/content/site";

/**
 * The argument of this page is the estate, so the estate is the hero: twelve
 * live platforms drifting beside the proposition rather than a stock claim
 * next to a single fake dashboard.
 *
 * Nothing above the fold uses a scroll reveal or a remote image — the h1 is
 * the LCP element and paints with the first frame.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Aurora />

      <Container className="relative">
        <div className="grid items-center gap-14 pt-16 pb-20 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:pb-28">
          <div className="lg:col-span-6">
            <p className="border-line glass text-muted inline-flex items-center gap-2.5 rounded-full border px-3 py-1.5 backdrop-blur">
              <span aria-hidden="true" className="text-accent pulse-dot size-1.5">
                <span className="pulse-dot-ring" />
                <span className="bg-accent size-1.5 rounded-full" />
              </span>
              <span className="eyebrow">
                {products.length} platforms in production
              </span>
            </p>

            <h1 className="text-ink mt-7 text-[clamp(2.5rem,5.4vw,4.5rem)] leading-[1.02]">
              We don&apos;t just build software.{" "}
              <span className="text-gradient">
                We run it.
              </span>
            </h1>

            <p className="text-muted mt-6 max-w-xl text-lg leading-[1.65]">
              Novista builds custom software, AI automation and mobile
              applications — and operates twelve of its own platforms across
              education, healthcare, pharmacy, retail and distribution. The
              systems on the right are ours.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg" withArrow>
                Start a Project
              </Button>
              <Button href="/products" size="lg" variant="secondary">
                See the platforms
              </Button>
            </div>

            <dl className="border-line mt-12 grid max-w-lg grid-cols-3 gap-6 border-t pt-7">
              {[
                { value: String(products.length), label: "Platforms" },
                { value: String(industries.length), label: "Industries" },
                { value: "4", label: "Practice areas" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-ink font-display text-3xl leading-none font-bold">
                    {stat.value}
                  </dt>
                  <dd className="eyebrow text-muted mt-2">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6 lg:pl-8">
            <div className="relative">
              {/* Brand light behind the wall, so it reads as lit rather than pasted on. */}
              <div
                aria-hidden="true"
                className="glow-soft pointer-events-none absolute -inset-6 rounded-[3rem]"
              />
              <PlatformWall className="relative h-[30rem] lg:h-[38rem]" />
            </div>
          </div>
        </div>

        <div className="border-line flex flex-wrap items-center gap-x-8 gap-y-3 border-t py-6">
          <p className="eyebrow text-muted">Industries</p>
          <ul className="text-muted flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
            {industries.map((industry) => (
              <li key={industry}>{industry}</li>
            ))}
          </ul>
          <Link
            href="/about#process"
            className="text-accent-2 hover:text-ink group ml-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
          >
            How we work
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}

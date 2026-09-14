"use client";

import { useEffect } from "react";
import { RefreshCcw, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { contact } from "@/content/site";

/**
 * Route-level error boundary. The error message itself is never shown to the
 * visitor — it can contain internal detail — but it is logged so it reaches
 * whatever monitoring is configured.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[page error]", error);
  }, [error]);

  return (
    <div className="relative overflow-hidden">
      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-xl bg-notice text-notice-icon">
            <TriangleAlert aria-hidden="true" className="size-7" />
          </span>

          <h1 className="mt-6 text-[2rem] leading-tight font-semibold tracking-[-0.03em] sm:text-[2.5rem]">
            Something went wrong on our side.
          </h1>

          <p className="text-muted mt-5 text-lg leading-relaxed">
            This is our problem, not yours. Try again — and if it keeps happening,
            email{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-accent-2 hover:text-accent-2 font-medium underline underline-offset-2"
            >
              {contact.email}
            </a>{" "}
            and we will sort it out.
          </p>

          {error.digest ? (
            <p className="text-muted mt-4 font-mono text-xs">
              Reference: {error.digest}
            </p>
          ) : null}

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={reset}>
              <RefreshCcw aria-hidden="true" className="size-4" />
              Try again
            </Button>
            <Button href="/" size="lg" variant="secondary">
              Back to Home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

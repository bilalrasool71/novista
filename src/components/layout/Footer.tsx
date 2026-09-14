import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { contact, footerNav, site, socialLinks } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night text-night-muted relative overflow-hidden">
      <div
        aria-hidden="true"
        className="night-wash pointer-events-none absolute inset-0 opacity-70"
      />

      <Container className="relative">
        <div className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="lg:col-span-4">
            <Logo tone="night" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-[1.65]">
              {site.shortDescription}
            </p>

            <dl className="mt-8 space-y-3 text-[0.9375rem]">
              <div className="rule-dark flex items-baseline justify-between gap-4 pt-3">
                <dt className="eyebrow text-night-muted">Email</dt>
                <dd>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-night-ink underline-offset-4 transition-opacity duration-200 hover:opacity-60 hover:underline"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>

              {contact.phone ? (
                <div className="rule-dark flex items-baseline justify-between gap-4 pt-3">
                  <dt className="eyebrow text-night-muted">Phone</dt>
                  <dd>
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      className="text-night-ink underline-offset-4 transition-opacity duration-200 hover:opacity-60 hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              ) : null}

              {contact.locationLabel ? (
                <div className="rule-dark flex items-baseline justify-between gap-4 pt-3">
                  <dt className="eyebrow text-night-muted">Location</dt>
                  <dd className="text-night-ink">{contact.locationLabel}</dd>
                </div>
              ) : null}
            </dl>

            {socialLinks.length > 0 ? (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-night-ink inline-flex items-center gap-1.5 text-sm underline-offset-4 transition-opacity duration-200 hover:opacity-60 hover:underline"
                    >
                      {link.label}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            {Object.entries(footerNav).map(([heading, links]) => (
              <nav key={heading} aria-labelledby={`footer-${heading}`}>
                <h2
                  id={`footer-${heading}`}
                  className="eyebrow text-night-muted"
                >
                  {heading}
                </h2>
                <ul className="rule-dark mt-4 space-y-3 pt-4">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.9375rem] underline-offset-4 transition-colors duration-200 hover:text-night-ink hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div
          className={
            // The floating WhatsApp/back-to-top cluster parks over this corner
            // once the page bottoms out, so the last row keeps clear of it.
            "rule-dark flex flex-col gap-3 pt-8 pb-24 text-sm sm:flex-row " +
            "sm:items-center sm:justify-between sm:pr-36 sm:pb-8"
          }
        >
          <p>
            © {year} {site.legalName}
          </p>
          <p className="text-night-muted">
            Custom software · AI solutions · Digital transformation
          </p>
        </div>
      </Container>
    </footer>
  );
}

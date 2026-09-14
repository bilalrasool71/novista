# Novista Solutions — public website

Marketing and lead-generation site for [novista.io](https://novista.io).

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react.
No CMS, no database, no state library — content lives in typed files under
`src/content/`, and every public page is statically prerendered at build time.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values you need
npm run dev
```

Open http://localhost:3000.

| Script              | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Dev server (Turbopack)                          |
| `npm run build`     | Production build; prerenders every public page  |
| `npm start`         | Serve the production build                      |
| `npm run lint`      | ESLint                                          |
| `npm run typecheck` | TypeScript, no emit                             |

---

## Editing content

**You do not need to touch any component to change what the site says.**
Everything editable lives in `src/content/`:

| File               | Controls                                                        |
| ------------------ | --------------------------------------------------------------- |
| `site.ts`          | Company details, contact info, navigation, trust stats, CTAs     |
| `services.ts`      | The four services, their pages and their FAQs                    |
| `products.ts`      | The product range and every product page                         |
| `solutions.ts`     | Business problems, solution scenarios, AI use cases              |
| `process.ts`       | The five delivery stages                                         |
| `tech.ts`          | Technology groups shown on the site                              |
| `faqs.ts`          | General FAQs (feeds `/faq`, the homepage and FAQ structured data) |
| `site.ts` → `whatsapp` | The floating WhatsApp button: number, label, pre-filled message |
| `case-studies.ts`  | Case studies                                                     |
| `testimonials.ts`  | Testimonials (currently empty — see below)                       |
| `insights.ts`      | Blog articles                                                    |

Adding an entry to `services.ts`, `products.ts`, `case-studies.ts` or
`insights.ts` automatically creates its page, adds it to the relevant index,
puts it in `sitemap.xml` and emits its structured data. There is no second
list to update.

### Things deliberately left for you to fill in

These are unset because we will not publish claims that cannot be evidenced.
Each one appears on the site the moment it has a real value.

- **Contact details** — `contact` in `src/content/site.ts`. `email` is set to
  `hello@novista.io`; change it to the inbox you actually monitor. `phone` is
  set to `+92 339 4924171` and now appears in the footer, on the contact page
  and in the Organization structured data. `address` and `locationLabel` are
  still `null`, so they render nowhere until you fill them in.
- **Social links** — `socialLinks` in `site.ts`. Entries with a `null` href are
  filtered out. Add real URLs and they appear in the footer and in the
  Organization schema `sameAs`.
- **Trust statistics** — `trustStats` in `site.ts`. Three are populated with
  figures derived from the product range. "Years in business", "Projects
  delivered" and "Client satisfaction" are `null` and stay hidden until you
  have numbers you can stand behind.
- **Testimonials** — `src/content/testimonials.ts` is intentionally empty, so
  the section renders nothing at all rather than an empty shell. Add a real,
  approved quote and it appears on the homepage and about page.
- **Case studies** — every entry in `case-studies.ts` has
  `isPlaceholder: true`. They are illustrative scenarios, and the site labels
  them as such with a badge on each card and a notice at the top of
  `/case-studies`. When you publish a real, client-approved engagement, set
  `isPlaceholder: false` and the labelling disappears on its own.
- **Legal pages** — `/privacy-policy` and `/terms` describe what this site
  actually does today. Have them reviewed against the law that applies where
  you and your clients operate, and update the `UPDATED_AT` constant in each
  page whenever the text changes.

### Brand assets

`public/logo.png` is the only file you supply. Everything else is derived from
it, because the mark is deep navy on transparency and would disappear on the
dark theme's header and on the night-ground footer:

| File                          | Used by                                  |
| ----------------------------- | ---------------------------------------- |
| `public/logo.png`             | Header and light surfaces                |
| `public/logo-light.png`       | Dark-theme header, footer (reversed)     |
| `src/app/favicon.ico`         | Browser tabs                             |
| `src/app/icon.png`            | Modern browsers, Android                 |
| `src/app/apple-icon.png`      | iOS home screen (opaque; Apple ignores alpha) |
| `public/icon-*.png`           | Web manifest                             |
| `src/app/og-mark.ts`          | The mark inlined into the share card     |

`logo` in `src/content/site.ts` points the components at the first two. To
change the brand, replace `public/logo.png` and regenerate the rest — the
variants are plain image derivations (trim to the mark's bounds, lift the navy
for the reverse, centre on an opaque tile for the icons).

---

## Floating WhatsApp button

Bottom-right on every page, configured entirely from `whatsapp` in
`src/content/site.ts`:

```ts
export const whatsapp = {
  enabled: true,                 // false removes it site-wide
  number: "923394924171",        // digits only, full international format
  display: "+92 339 4924171",
  prefill: "Hi Novista — I'd like to discuss a project.",
  label: "Chat on WhatsApp",
};
```

`number` must have no `+`, spaces or dashes — that is the form `wa.me`
requires. The link opens in a new tab with the pre-filled message and carries
`rel="noopener noreferrer"`.

Two details worth keeping if you restyle it:

- **The green is deliberately not `#25d366`.** WhatsApp's brand green gives a
  white glyph only 1.98:1, which fails WCAG 1.4.11 for a graphic that carries
  meaning. `#17a34a` reads the same at a glance and clears 3:1.
- **The label is width-animated, not mounted on hover**, so it is always in the
  accessible tree and the button never causes a layout shift.

A back-to-top button sits above it and appears after 900px of scroll. Both hide
themselves while the mobile menu is open, coordinated through the small store
in `src/lib/menu-state.ts`.

To track clicks, the link carries `data-analytics="whatsapp-float"`.

---

## Environment variables

All optional. The site builds and runs with none of them set.

| Variable                   | Effect if unset                                     |
| -------------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | Falls back to `https://novista.io`                  |
| `RESEND_API_KEY`           | Contact form does not send email                    |
| `CONTACT_TO_EMAIL`         | Falls back to `contact.email` in `site.ts`          |
| `CONTACT_FROM_EMAIL`       | Required alongside `RESEND_API_KEY` to send email   |
| `CONTACT_WEBHOOK_URL`      | No webhook delivery                                 |
| `NEXT_PUBLIC_GA_ID`        | **No analytics script is rendered at all**          |
| `GOOGLE_SITE_VERIFICATION` | No verification meta tag                            |

**Set `NEXT_PUBLIC_SITE_URL` in production.** It is the base for canonical
URLs, Open Graph URLs, `sitemap.xml`, `robots.txt` and JSON-LD.

### Contact form delivery

`src/app/api/contact/route.ts` tries, in order:

1. **Email via Resend** — needs `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and
   `CONTACT_FROM_EMAIL`. Replies go straight back to the enquirer because the
   message sets `reply_to`.
2. **Webhook** — `CONTACT_WEBHOOK_URL` receives the submission as JSON. Works
   with Zapier, Make, n8n, a Slack workflow or your own CRM.
3. **Console log** — nothing configured, so the submission is printed to the
   server log. Fine for development; do not ship to production like this.

Protections on the endpoint: payload size cap, content-type check, rate limit
(5 per IP per 10 minutes), a honeypot field, a minimum fill-time check, and
full server-side revalidation of everything the browser already checked.

> The rate limiter is in-memory, so it is per server instance. That is a
> deliberate trade-off — no Redis to run. If you deploy across many instances
> and form spam becomes a real problem, swap the `Map` in
> `src/lib/rate-limit.ts` for a shared store; the call site does not change.

---

## Project structure

```
src/
  app/                      routes (App Router)
    api/contact/route.ts    contact form endpoint
    sitemap.ts robots.ts    generated from the content files
    opengraph-image.tsx     generated social share image
    favicon.ico icon.png    app icons, derived from public/logo.png
    apple-icon.png
    manifest.ts
  components/
    layout/                 header, mega menu, footer, logo, breadcrumbs
    sections/               page sections (hero, process, CTA band, …)
    cards/                  service / product / case study / post cards
    ui/                     Button, Section, Container, Badge, Reveal, …
    contact/ContactForm.tsx
    seo/JsonLd.tsx
  content/                  ← all editable copy
  lib/
    seo.ts                  metadata + JSON-LD builders
    contact.ts              validation shared by client and server
    theme.ts                light / dark / system preference store
    use-header-scroll.ts    condense, conceal and reading progress
    rate-limit.ts
    utils.ts
```

---

## SEO

Handled centrally so it cannot drift:

- Every page builds metadata through `buildMetadata()` in `src/lib/seo.ts`,
  which guarantees a unique title and description, a canonical URL, robots
  directives, Open Graph and a Twitter card. Page titles are brand-free; the
  root layout appends `| Novista Solutions` exactly once.
- `sitemap.xml` and `robots.txt` are generated from the content files.
- JSON-LD: Organization and WebSite site-wide, plus WebPage, Service,
  SoftwareApplication, BreadcrumbList, FAQPage, BlogPosting and ItemList where
  they apply. No ratings, review counts or prices are emitted, because we have
  no verified data for them.
- FAQ structured data is only emitted on pages where the questions and answers
  are genuinely visible.
- Redirects for alternate URLs live in `next.config.ts`. Add a line there
  whenever a public URL changes so inbound links never 404.

---

## Accessibility

Semantic landmarks, one `h1` per page, a skip link, visible focus rings on
every interactive element, labelled and described form fields with
`aria-invalid`, native `<details>` for FAQs (keyboard and screen-reader
behaviour for free), and `aria-expanded` / `aria-controls` on the mobile menu.

Every text and graphic colour pairing used in the UI was checked against
WCAG 2.2 AA and meets it. Touch targets are at least 40px.

Scroll animations respect `prefers-reduced-motion` via a CSS rule in
`globals.css`, and a `<noscript>` rule in the root layout forces revealed
content visible when JavaScript is unavailable. Nothing above the fold uses a
scroll reveal, so it cannot delay LCP.

---

## Performance

- Every public page is statically prerendered; only `/api/contact` is dynamic.
- Runtime dependencies: `next`, `react`, `react-dom`, `lucide-react`. That is
  all. No animation library, no CSS-in-JS, no form library, no icon font.
- The hero visual is markup and CSS — no image request, no decode cost, no
  layout shift next to the LCP element.
- The logo is one PNG; the reversed variant, favicon, app icons and the
  share-card mark are all derived from it (see **Brand assets**).
- Fonts are self-hosted and subset by `next/font` with `display: swap`.

---

## Security

Set in `next.config.ts` and applied to every response: Content-Security-Policy,
`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy` and HSTS. `x-powered-by` is disabled.

The CSP allows `'unsafe-inline'` for scripts because Next.js inlines its
hydration payload; a nonce-based policy would force every page to render
dynamically. That is a deliberate trade-off — the policy still blocks
third-party script injection, clickjacking and form hijacking. Google
Analytics hosts are added to the policy only when `NEXT_PUBLIC_GA_ID` is set.

No secrets reach the browser: only `NEXT_PUBLIC_*` variables are exposed, and
the only one is the analytics ID.

---

## Deploying

Any Node host works. On Vercel it is zero-config.

1. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
2. Configure contact form delivery (Resend or webhook).
3. `npm run build && npm start`.
4. Submit `https://<your-domain>/sitemap.xml` in Google Search Console.

After the first deploy, check: `/sitemap.xml`, `/robots.txt`, a share preview
on LinkedIn or X, and a real contact form submission arriving in your inbox.

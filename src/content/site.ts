/**
 * Single source of truth for company details, navigation and contact info.
 *
 * Everything a non-developer is likely to change lives in `src/content/`.
 * Nothing in `src/components/` should hard-code copy that belongs here.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://novista.io"
).replace(/\/$/, "");

/**
 * Brand logo.
 *
 * Drop your logo file at `public/logo.png` (or .svg) and set `src` below.
 * The same file is then used for the header, the footer and the browser
 * favicon — there is nothing else to change.
 *
 * While `src` is null the site falls back to a built-in wordmark, so it is
 * never broken; it just is not your mark yet.
 */
export const logo = {
  /**
   * The mark is drawn in deep navy on transparency, so it disappears on the
   * dark theme's header and on the night-ground footer. `light` is the
   * reversed variant used there; both are generated from the same file.
   */
  src: "/logo.png" as string | null,
  light: "/logo-light.png",
  /** Intrinsic size of the file, used to reserve space and avoid layout shift. */
  width: 100,
  height: 100,
  alt: "Novista Solutions",
} as const;

export const site = {
  name: "Novista Solutions",
  shortName: "Novista",
  domain: "novista.io",
  url: SITE_URL,
  legalName: "Novista Solutions",
  foundingYear: 2021,

  tagline: "Technology that moves your business forward.",

  /** Used for the default meta description and the Organization schema. */
  description:
    "Novista Solutions is a software development and technology partner. We build custom software, AI-powered automation, web and mobile applications, and the platforms that modern businesses run on.",

  shortDescription:
    "Custom software, AI automation and digital platforms built around the way your business actually works.",
} as const;

/**
 * Leave a field as `null` and it simply won't render anywhere on the site,
 * and won't appear in structured data. Never publish a channel you don't monitor.
 */
export const contact = {
  email: "hello@novista.io",
  salesEmail: "hello@novista.io",
  /** e.g. "+92 300 1234567" */
  phone: "+92 339 4924171" as string | null,
  /** Shown on the contact page and used for LocalBusiness schema when complete. */
  address: null as null | {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    countryCode: string;
  },
  /** Free-text location line, shown even when a full postal address isn't public. */
  locationLabel: null as string | null,
  /** IANA-style hours note shown next to the form. */
  responseTime: "We reply to every enquiry within one business day.",
} as const;

/**
 * Floating WhatsApp button.
 *
 * `number` must be digits only in full international format — no +, spaces or
 * dashes — because that is the form wa.me requires. Set `enabled: false` to
 * remove the button from every page.
 */
export const whatsapp = {
  enabled: true,
  number: "923394924171",
  display: "+92 339 4924171",
  /** Pre-filled first message. Keep it short; it is URL-encoded on use. */
  prefill: "Hi Novista — I'd like to discuss a project.",
  label: "Chat on WhatsApp",
} as const;

/** wa.me link with the pre-filled message, used by the floating button. */
export const whatsappUrl = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(
  whatsapp.prefill,
)}`;

/** Any entry left as `null` is hidden. Order here is the order rendered. */
export const socialLinks: { label: string; href: string }[] = (
  [
    { label: "LinkedIn", href: null },
    { label: "GitHub", href: null },
    { label: "X", href: null },
  ] as { label: string; href: string | null }[]
).filter((link): link is { label: string; href: string } => Boolean(link.href));

export const team = [
  {
    name: "Muhammad Bilal Rasool",
    role: "Founder",
    bio: "Leads Novista's direction and client partnerships, working with businesses to turn operational problems into software that pays for itself.",
    initials: "MB",
  },
  {
    name: "Moin Akmal Khan",
    role: "Chief Technology Officer",
    bio: "Owns architecture and engineering standards across every Novista platform, from data modelling and integrations through to AI systems in production.",
    initials: "MK",
  },
] as const;

/**
 * Only facts we can actually stand behind.
 *
 * `value: null` hides the stat entirely — fill these in once you have
 * verified numbers rather than shipping estimates.
 */
export const trustStats: { value: string | null; label: string; detail: string }[] = [
  {
    value: "12",
    label: "Platforms built in-house",
    detail: "From school and hospital management to ERP, HRMS and distribution.",
  },
  {
    value: "6",
    label: "Industries served",
    detail: "Education, healthcare, pharmacy, retail, distribution and professional services.",
  },
  {
    value: "4",
    label: "Core practice areas",
    detail: "Web, mobile, AI solutions and digital transformation under one team.",
  },
  // Fill these in when you have verified figures, then they appear automatically.
  { value: null, label: "Years in business", detail: "" },
  { value: null, label: "Projects delivered", detail: "" },
  { value: null, label: "Client satisfaction", detail: "" },
];

export const industries = [
  "Education",
  "Healthcare",
  "Pharmacy & Life Sciences",
  "Retail & Commerce",
  "Distribution & Logistics",
  "Professional Services",
] as const;

export const primaryNav = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
] as const;

export const footerNav = {
  Services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "Mobile Development", href: "/services/mobile-development" },
    { label: "AI Solutions", href: "/services/ai-solutions" },
    { label: "Digital Transformation", href: "/services/digital-transformation" },
  ],
  Company: [
    { label: "About Novista", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Products", href: "/products" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Solutions", href: "/solutions" },
    { label: "FAQs", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
} as const;

export const cta = {
  primary: { label: "Start a Project", href: "/contact" },
  secondary: { label: "Explore Our Services", href: "/services" },
  solutions: { label: "Explore Our Solutions", href: "/solutions" },
  ai: { label: "Explore AI Solutions", href: "/services/ai-solutions" },
  talk: { label: "Talk to Our Team", href: "/contact" },
  work: { label: "See Our Work", href: "/case-studies" },
} as const;

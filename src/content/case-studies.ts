/**
 * CASE STUDIES
 *
 * ──────────────────────────────────────────────────────────────────────────
 * IMPORTANT — READ BEFORE EDITING
 *
 * Every entry below has `isPlaceholder: true`. These are ILLUSTRATIVE
 * scenarios describing the shape of work Novista does. They are not real
 * client engagements and no client is named or implied.
 *
 * The site renders a visible "Illustrative example" badge on every entry
 * where `isPlaceholder` is true, plus a notice at the top of /case-studies.
 *
 * When you publish a real, client-approved case study:
 *   1. Replace the content with the real engagement.
 *   2. Set `isPlaceholder: false` — the badge and notice disappear on their own.
 *   3. Only quote metrics you can evidence. Never publish a client name
 *      without written permission.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type CaseStudy = {
  slug: string;
  /** Set to false only when this describes a real, approved engagement. */
  isPlaceholder: boolean;
  title: string;
  /** Anonymous descriptor while placeholder; the client name once approved. */
  client: string;
  industry: string;
  summary: string;
  challenge: string;
  approach: { title: string; description: string }[];
  /** What the delivered system does. Keep these factual and verifiable. */
  results: string[];
  technologies: string[];
  /** Slugs from src/content/services.ts */
  services: string[];
  /** Slugs from src/content/products.ts */
  relatedProducts: string[];
  seo: { title: string; description: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "multi-campus-school-operations",
    isPlaceholder: true,
    title: "Bringing four school campuses onto one operating system",
    client: "Multi-campus school group",
    industry: "Education",
    summary:
      "Four campuses, four sets of records and no group-level view. Consolidating admissions, attendance, examinations and fee collection into a single platform with per-campus permissions.",
    challenge:
      "Each campus kept its own spreadsheets for enrolment and fees, and its own paper registers for attendance. Producing a group-level figure for outstanding fees or headcount meant a manual collection exercise that was already out of date by the time it was finished. Parents had no way to check anything without phoning the office.",
    approach: [
      {
        title: "Consolidate the data model first",
        description:
          "Before any interface work, agree one definition of a student, a class, an invoice and an academic term across all four campuses — the reason the old numbers never reconciled.",
      },
      {
        title: "Migrate one campus at a time",
        description:
          "Roll out to the smallest campus first, fix what the real users find, then move the remaining three with the rough edges already resolved.",
      },
      {
        title: "Open a parent portal last",
        description:
          "Only expose data to parents once staff trust it internally. Publishing attendance or fee balances that staff know are wrong destroys confidence immediately.",
      },
    ],
    results: [
      "Single group-level view of enrolment, attendance and outstanding fees",
      "Fee invoicing and payment tracking handled in-system rather than in spreadsheets",
      "Parent portal for attendance, results and fee status",
      "Per-campus roles so staff see only their own campus data",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Docker", "Azure"],
    services: ["web-development", "digital-transformation"],
    relatedProducts: ["school-management"],
    seo: {
      title: "Case Study: Multi-Campus School Management Platform",
      description:
        "An illustrative look at consolidating admissions, attendance, examinations and fee collection for a four-campus school group onto one platform.",
    },
  },

  {
    slug: "pharmacy-chain-stock-control",
    isPlaceholder: true,
    title: "Ending manual expiry checks across a pharmacy chain",
    client: "Regional pharmacy chain",
    industry: "Pharmacy & Life Sciences",
    summary:
      "Batch and expiry tracking that depended on staff physically checking shelves, replaced with system-level batch control, automated alerts and movement-based reordering.",
    challenge:
      "Expiry losses were discovered after the fact, during stock takes. Controlled items were recorded in a paper register that could not be cross-checked against dispensing. Reordering was reactive, so fast-moving lines ran out while slow-moving stock aged on the shelf.",
    approach: [
      {
        title: "Make batch the unit of stock",
        description:
          "Track quantity by batch and expiry date rather than by product, which is what makes proactive expiry alerting possible at all.",
      },
      {
        title: "Bring the controlled register in-system",
        description:
          "Digitise the controlled substance register so every dispensing event is reconciled against received stock automatically.",
      },
      {
        title: "Reorder from actual movement",
        description:
          "Set reorder points from observed sales velocity per branch rather than a single chain-wide figure.",
      },
    ],
    results: [
      "Expiry and near-expiry alerts raised before stock is written off",
      "Controlled substance register reconciled against dispensing automatically",
      "Branch-level reorder points driven by actual movement",
      "Wastage and margin reporting available per branch and per product",
    ],
    technologies: ["React", ".NET", "SQL Server", "Docker"],
    services: ["web-development", "digital-transformation"],
    relatedProducts: ["pharmacy-management", "point-of-sale"],
    seo: {
      title: "Case Study: Pharmacy Batch & Expiry Control System",
      description:
        "An illustrative look at replacing manual expiry checks with system-level batch tracking, automated alerts and movement-based reordering across a pharmacy chain.",
    },
  },

  {
    slug: "ai-support-triage",
    isPlaceholder: true,
    title: "Cutting first-response time with an AI support agent",
    client: "B2B software company",
    industry: "Professional Services",
    summary:
      "An AI agent that reads inbound support requests, answers routine questions from the company's own documentation, and routes the rest to the right person with the context already gathered.",
    challenge:
      "A small support team handled a high volume of repeat questions already answered in the documentation. Time went on triage rather than resolution, complex tickets waited behind simple ones, and the first reply often just asked for information the customer had already supplied elsewhere.",
    approach: [
      {
        title: "Baseline before building",
        description:
          "Measure current handling time and categorise a month of real tickets, to establish which share was genuinely routine — and what improving it would actually be worth.",
      },
      {
        title: "Ground answers in real sources",
        description:
          "Build retrieval over the company's own documentation and order data so every answer cites where it came from and can be checked.",
      },
      {
        title: "Escalate rather than guess",
        description:
          "Set a confidence threshold below which the agent does not answer at all, and instead routes to a person with a summary and the relevant records attached.",
      },
    ],
    results: [
      "Routine questions answered automatically with a citation to the source",
      "Complex tickets routed with customer history and context pre-attached",
      "Confidence threshold keeps uncertain cases with a human",
      "Every agent decision logged and reviewable",
    ],
    technologies: ["Next.js", "Python", "Claude", "PostgreSQL + pgvector"],
    services: ["ai-solutions"],
    relatedProducts: ["ai-agents"],
    seo: {
      title: "Case Study: AI Support Triage Agent",
      description:
        "An illustrative look at deploying an AI support agent that answers routine questions from company documentation and escalates the rest with full context.",
    },
  },

  {
    slug: "distribution-field-operations",
    isPlaceholder: true,
    title: "Taking order booking off paper across a distribution network",
    client: "FMCG distribution network",
    industry: "Distribution & Logistics",
    summary:
      "Field order booking, route planning and proof of delivery moved to an offline-first mobile app, with dealer credit exposure visible daily instead of monthly.",
    challenge:
      "Orders were written on paper in the field and entered at the office a day later, so stock availability shown to the customer was always stale. Deliveries were confirmed by phone. Receivables across the dealer network were only compiled monthly, by which point credit exposure was larger than anyone intended.",
    approach: [
      {
        title: "Design for weak signal first",
        description:
          "An offline-first mobile app that queues orders locally and syncs on reconnection, because coverage in the field cannot be assumed.",
      },
      {
        title: "Enforce credit at the point of booking",
        description:
          "Check dealer credit limits when the order is taken rather than when it is invoiced, which is the only point at which the decision can still change.",
      },
      {
        title: "Capture delivery proof at the door",
        description:
          "Signature and photo capture on delivery, tied to the original order, so disputes are settled from the record instead of from memory.",
      },
    ],
    results: [
      "Orders booked in the field and visible at head office immediately",
      "Credit limits enforced at booking rather than at invoicing",
      "Proof of delivery captured against the originating order",
      "Daily view of receivables and exposure across the dealer network",
    ],
    technologies: ["React Native", "Node.js", "PostgreSQL", "AWS"],
    services: ["mobile-development", "digital-transformation"],
    relatedProducts: ["distribution-management", "erp"],
    seo: {
      title: "Case Study: Distribution Field Operations App",
      description:
        "An illustrative look at moving order booking, route planning and proof of delivery onto an offline-first mobile app across a distribution network.",
    },
  },
];

export const caseStudySlugs = caseStudies.map((study) => study.slug);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

/** True while any published case study is still illustrative. */
export const hasPlaceholderCaseStudies = caseStudies.some(
  (study) => study.isPlaceholder,
);

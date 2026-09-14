import {
  BrainCircuit,
  Boxes,
  FileText,
  Gauge,
  Headset,
  Lightbulb,
  LineChart,
  Link2,
  MessageSquare,
  RefreshCcw,
  Rocket,
  Search,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * The pain points we lead with. Each one is written as something a business
 * owner would actually say out loud, not as a category of service.
 */
export const businessProblems: { problem: string; consequence: string }[] = [
  {
    problem: "Manual processes are slowing your team down",
    consequence:
      "Skilled people spend their week re-keying data instead of doing the work you hired them for.",
  },
  {
    problem: "Your systems do not talk to each other",
    consequence:
      "The same record exists in four places, and none of the four agree at month end.",
  },
  {
    problem: "Your website is not converting visitors",
    consequence:
      "Traffic arrives, reads a page, and leaves without ever becoming an enquiry.",
  },
  {
    problem: "Your legacy software is getting harder to maintain",
    consequence:
      "Every change is expensive, risky, and depends on one person who knows how it works.",
  },
  {
    problem: "You want to use AI but do not know where to start",
    consequence:
      "Plenty of vendor demos, no clear answer on which of your workflows would actually benefit.",
  },
  {
    problem: "Customers expect a better digital experience",
    consequence:
      "They can self-serve everywhere else, then have to call or email you for a status update.",
  },
  {
    problem: "Your software cannot scale with the business",
    consequence:
      "What worked at 20 users breaks at 200, and growth starts costing more than it earns.",
  },
];

export type SolutionScenario = {
  slug: string;
  need: string;
  icon: LucideIcon;
  answer: string;
  detail: string;
  steps: string[];
  /** Service slug this scenario maps to. */
  service: string;
};

export const solutionScenarios: SolutionScenario[] = [
  {
    slug: "launch-a-product",
    need: "Need to launch a product?",
    icon: Rocket,
    answer: "We turn ideas into scalable digital products.",
    detail:
      "We scope a first release small enough to reach real users quickly and solid enough to build on. You get something in production, evidence of how people use it, and an architecture that will not need replacing at version two.",
    steps: [
      "Define the smallest release that proves the idea",
      "Design the core flows and data model",
      "Build, launch and instrument it",
      "Iterate on what usage actually shows",
    ],
    service: "web-development",
  },
  {
    slug: "automate-operations",
    need: "Need to automate operations?",
    icon: Workflow,
    answer:
      "We identify repetitive workflows and automate them with modern technology and AI.",
    detail:
      "We map where hours and errors accumulate, rank the workflows by what automating them is worth, and start with the one that pays back fastest. Exceptions still reach a person — automation should remove the routine, not hide the unusual.",
    steps: [
      "Map the current process end to end",
      "Rank workflows by time cost and error rate",
      "Automate the highest-value one first",
      "Measure the before and after",
    ],
    service: "ai-solutions",
  },
  {
    slug: "modernise-legacy-software",
    need: "Need to modernise outdated software?",
    icon: RefreshCcw,
    answer:
      "We gradually transform legacy systems without unnecessarily disrupting your business.",
    detail:
      "We wrap the existing system in an API layer, move one capability at a time, and retire old parts only once their replacement is proven. The legacy system keeps running throughout, and every phase has a tested way back.",
    steps: [
      "Audit the current system and its real constraints",
      "Agree a phased target architecture",
      "Migrate capability by capability in parallel",
      "Decommission the old system in stages",
    ],
    service: "digital-transformation",
  },
  {
    slug: "integrate-systems",
    need: "Need to integrate disconnected systems?",
    icon: Link2,
    answer:
      "We connect your tools, data and workflows into one streamlined ecosystem.",
    detail:
      "Most operational pain is not a missing feature, it is a missing connection. We establish which system owns each piece of data, build the integration layer, and make sure a change in one place is reflected everywhere it matters.",
    steps: [
      "Inventory systems and where data is duplicated",
      "Decide the system of record for each entity",
      "Build and monitor the integration layer",
      "Retire the manual reconciliation steps",
    ],
    service: "digital-transformation",
  },
  {
    slug: "adopt-ai",
    need: "Need AI?",
    icon: BrainCircuit,
    answer:
      "We identify practical AI opportunities and turn them into working business solutions.",
    detail:
      "We start from your workflows rather than from a model. If AI is not the right answer for a given problem we will say so — and often the honest answer is a better-designed process or a straightforward integration.",
    steps: [
      "Assess and score candidate workflows",
      "Prove the case on your real data",
      "Ship to production with guardrails",
      "Monitor accuracy, cost and adoption",
    ],
    service: "ai-solutions",
  },
  {
    slug: "make-sense-of-data",
    need: "Need your numbers in one place?",
    icon: LineChart,
    answer:
      "We consolidate fragmented data into reporting people actually trust.",
    detail:
      "When three departments produce three different totals, the problem is the data model, not the dashboard. We consolidate to one definition per metric, then build the reporting on top of it.",
    steps: [
      "Agree one definition per metric",
      "Consolidate sources into a single model",
      "Build the operational dashboards",
      "Automate the recurring reports",
    ],
    service: "digital-transformation",
  },
];

/**
 * Concrete AI applications, used on the homepage AI band and the AI
 * service page. Deliberately specific — each one is a job, not a buzzword.
 */
export const aiUseCases: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "AI Customer Support",
    description:
      "Answers grounded in your own documentation and order data, resolving routine requests and escalating the rest with full context attached.",
    icon: Headset,
  },
  {
    title: "AI Sales Assistant",
    description:
      "Qualifies inbound enquiries, drafts responses in your tone, and keeps the CRM updated without a rep having to remember to log it.",
    icon: MessageSquare,
  },
  {
    title: "AI Knowledge Assistant",
    description:
      "Search across policies, manuals and historical records that returns a sourced answer rather than a list of documents to read.",
    icon: Search,
  },
  {
    title: "Document Intelligence",
    description:
      "Invoices, prescriptions, purchase orders and lab reports read automatically and written straight into the system that needs them.",
    icon: FileText,
  },
  {
    title: "Workflow Automation",
    description:
      "Classification, routing and data entry handled end to end, with anything uncertain sent to a person instead of guessed at.",
    icon: Workflow,
  },
  {
    title: "Internal AI Agents",
    description:
      "Private assistants for operations and finance that work inside your systems, with permissions and an audit log for every action.",
    icon: Boxes,
  },
];

/** Why clients choose to work with us — used on the About page. */
export const differentiators: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "We start with the business problem",
    description:
      "Before architecture, before technology choice, we want to understand what it currently costs you to do this the way you do it now. If software is not the cheapest fix, we will say so.",
    icon: Lightbulb,
  },
  {
    title: "We have built these systems before",
    description:
      "Twelve platforms across education, healthcare, pharmacy, retail and distribution. We are rarely meeting your domain for the first time, which shows up in how quickly we get to the real requirements.",
    icon: Boxes,
  },
  {
    title: "We ship in stages you can stop between",
    description:
      "Every phase delivers something usable on its own. You are never twelve months into a project with nothing in production and no way to change direction.",
    icon: Gauge,
  },
  {
    title: "We hand over work you can maintain",
    description:
      "Conventional structure, typed code, documented decisions and real handover. A different developer should be able to pick this up — and you should be free to choose one.",
    icon: FileText,
  },
];

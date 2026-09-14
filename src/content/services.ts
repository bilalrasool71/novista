import {
  Bot,
  Globe,
  RefreshCcw,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  /** Short name used in navigation, cards and breadcrumbs. */
  name: string;
  icon: LucideIcon;
  /** The one-line promise from the brand voice. */
  promise: string;
  /** 2-3 sentences, used on the homepage and services index cards. */
  summary: string;
  /** Four short bullets shown on the card. */
  capabilities: string[];
  /** Detail page */
  eyebrow: string;
  h1: string;
  intro: string;
  offerings: { title: string; description: string }[];
  outcomes: { title: string; description: string }[];
  deliverables: string[];
  techGroups: { label: string; items: string[] }[];
  faqs: Faq[];
  /** Slugs of the two most relevant sibling services. */
  related: string[];
  seo: { title: string; description: string };
};

export const services: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    icon: Globe,
    promise: "Web experiences designed to turn visitors into customers.",
    summary:
      "We build the websites, portals and web applications your business runs on — fast, accessible and built to convert. Every build starts with the commercial outcome you need, then works backwards to the architecture.",
    capabilities: [
      "SaaS platforms",
      "Customer portals",
      "E-commerce",
      "Admin dashboards",
    ],
    eyebrow: "Web Development",
    h1: "Custom Web Application Development",
    intro:
      "A website that looks good but does not sell is an expense. A web platform that cannot scale becomes a liability. We build both sides properly: front-end experiences that convert, and the systems behind them that hold up when your business grows.",
    offerings: [
      {
        title: "Business & corporate websites",
        description:
          "Fast, search-optimised sites that explain what you do and turn interest into enquiries, with content your team can update without a developer.",
      },
      {
        title: "SaaS platforms",
        description:
          "Multi-tenant products with billing, roles, onboarding and analytics built in — architected so adding your next feature does not mean rewriting the last one.",
      },
      {
        title: "E-commerce platforms",
        description:
          "Storefronts and checkouts tuned for conversion, integrated with your inventory, payments, shipping and accounting rather than sitting apart from them.",
      },
      {
        title: "Custom web applications",
        description:
          "Line-of-business software shaped around your actual workflow, replacing the spreadsheets and workarounds your team has quietly built up over years.",
      },
      {
        title: "Customer & partner portals",
        description:
          "Self-service areas where clients check status, download documents and raise requests — removing the email back-and-forth from your support load.",
      },
      {
        title: "Admin dashboards & reporting",
        description:
          "Operational views that surface the numbers people actually make decisions on, with the drill-downs and exports finance and ops keep asking for.",
      },
      {
        title: "API design & integrations",
        description:
          "Clean, documented APIs and reliable connections to the payment, logistics, accounting and CRM systems already in your stack.",
      },
      {
        title: "Website modernisation",
        description:
          "Bringing dated sites and applications up to current standards for performance, security and mobile, without a risky big-bang rebuild.",
      },
      {
        title: "Performance optimisation",
        description:
          "Core Web Vitals work on real pages: what is slow, why it is slow, what it costs you in rankings and conversions, and what we changed.",
      },
      {
        title: "Ongoing support",
        description:
          "Dependency updates, security patches, monitoring and a roadmap of improvements after launch — not a handover and a goodbye.",
      },
    ],
    outcomes: [
      {
        title: "Measurable conversion, not vague engagement",
        description:
          "We agree on what a win looks like before design starts — enquiries, signups, completed checkouts — and instrument the site so you can see it.",
      },
      {
        title: "Search visibility built in from day one",
        description:
          "Semantic markup, clean URLs, structured data and genuinely fast pages. SEO is part of the build, not a phase bolted on afterwards.",
      },
      {
        title: "A codebase your next developer can read",
        description:
          "Conventional structure, typed components and documented decisions, so you are never held hostage by whoever built it.",
      },
    ],
    deliverables: [
      "Technical architecture and data model",
      "Responsive UI design system",
      "Production application and admin tooling",
      "Documented API and integration layer",
      "Analytics and conversion tracking",
      "Deployment pipeline and environments",
      "Handover documentation and training",
    ],
    techGroups: [
      { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", ".NET", "Python", "REST & GraphQL APIs"] },
      { label: "Data", items: ["PostgreSQL", "SQL Server", "MySQL", "Redis"] },
      { label: "Delivery", items: ["Docker", "CI/CD pipelines", "Vercel", "Azure & AWS"] },
    ],
    faqs: [
      {
        question: "How long does it take to build a web application?",
        answer:
          "A focused marketing site is typically 3–6 weeks. A first release of a custom web application is usually 8–16 weeks depending on how many workflows it covers and how many systems it has to integrate with. We scope a first release deliberately small so you get something usable in production early, then build out from there.",
      },
      {
        question: "Can you work with our existing website or codebase?",
        answer:
          "Yes. A large share of our work is improving software someone else started. We begin with a short technical review covering architecture, dependencies, security and performance, then give you an honest recommendation on whether to extend, refactor or replace — including when replacing is not worth it.",
      },
      {
        question: "Will our team be able to update content ourselves?",
        answer:
          "Yes. We separate content from code so pages, copy, images and SEO metadata can be edited without a deployment. Where a CMS makes sense we integrate one; where it does not, we use a simple structured content layer your team can edit directly.",
      },
    ],
    related: ["mobile-development", "digital-transformation"],
    seo: {
      title: "Web Development & Custom Web Applications",
      description:
        "Custom web application development, SaaS platforms, e-commerce and customer portals. Novista Solutions builds fast, search-optimised web software that converts.",
    },
  },

  {
    slug: "mobile-development",
    name: "Mobile Development",
    icon: Smartphone,
    promise:
      "Turn your idea into a mobile experience your customers actually want to use.",
    summary:
      "Native and cross-platform apps for customers and field teams, connected properly to the systems behind them. We ship apps people keep on their home screen, not ones they install once.",
    capabilities: [
      "iOS & Android",
      "Cross-platform",
      "Field & ops apps",
      "Backend integration",
    ],
    eyebrow: "Mobile App Development",
    h1: "Mobile App Development Services",
    intro:
      "Most apps fail for business reasons, not technical ones: unclear purpose, a signup flow nobody finishes, or data that never quite matches the back office. We start with who opens the app and why, then build the experience and the backend to match.",
    offerings: [
      {
        title: "iOS applications",
        description:
          "Native Swift apps for products where platform performance, offline behaviour or device features genuinely matter.",
      },
      {
        title: "Android applications",
        description:
          "Native Kotlin apps built for the wide range of devices your customers and field staff actually carry.",
      },
      {
        title: "Cross-platform applications",
        description:
          "One React Native or Flutter codebase across iOS and Android, which usually means faster releases and a lower long-term maintenance bill.",
      },
      {
        title: "Customer-facing apps",
        description:
          "Booking, ordering, loyalty, account management and support — the everyday jobs customers would rather do from their phone.",
      },
      {
        title: "Field & operations apps",
        description:
          "Tools for people away from a desk: stock counts, deliveries, inspections, visits and approvals, with offline-first sync for weak signal.",
      },
      {
        title: "SaaS mobile companions",
        description:
          "A focused mobile surface for an existing web product, doing the few things users need on the move properly rather than everything badly.",
      },
      {
        title: "Backend & API integration",
        description:
          "Secure authentication, sync, push notifications and the API layer that connects the app to your ERP, CRM or in-house systems.",
      },
      {
        title: "App maintenance & modernisation",
        description:
          "Rescuing apps that have drifted out of store compliance, fallen behind on SDK versions, or been abandoned by a previous developer.",
      },
    ],
    outcomes: [
      {
        title: "Users who come back",
        description:
          "We instrument activation and retention from the first release, so decisions about what to build next are based on behaviour rather than opinion.",
      },
      {
        title: "One source of truth",
        description:
          "The app reads and writes the same data as the rest of your business. No separate spreadsheet, no reconciliation at month end.",
      },
      {
        title: "Releases that do not get rejected",
        description:
          "We handle store submission, privacy declarations and review requirements, and keep the app current as Apple and Google change their rules.",
      },
    ],
    deliverables: [
      "User flows and interaction design",
      "iOS and Android builds",
      "Secure API and sync layer",
      "Push notification infrastructure",
      "App Store and Play Store submission",
      "Crash reporting and analytics",
      "Release and update process",
    ],
    techGroups: [
      { label: "Cross-platform", items: ["React Native", "Flutter", "Expo"] },
      { label: "Native", items: ["Swift (iOS)", "Kotlin (Android)"] },
      { label: "Backend", items: ["Node.js", ".NET", "Python", "PostgreSQL"] },
      { label: "Services", items: ["Push notifications", "Offline sync", "App analytics"] },
    ],
    faqs: [
      {
        question: "Should we build native or cross-platform?",
        answer:
          "It depends on what the app does. Cross-platform covers most business and customer apps well and costs less to maintain because there is one codebase. We recommend native when the app leans heavily on device hardware, needs sustained high-performance graphics, or has to match platform conventions exactly. We will tell you which applies to your case before you commit.",
      },
      {
        question: "Do you handle App Store and Play Store submission?",
        answer:
          "Yes — developer account setup, store listings, screenshots, privacy declarations, review responses and the release process itself. We also set up the pipeline so your future updates go out without drama.",
      },
      {
        question: "Can the app work without a connection?",
        answer:
          "Yes, and for field teams it usually should. We design an offline-first data layer that queues work locally and syncs when the device reconnects, with clear conflict rules so two people editing the same record does not corrupt your data.",
      },
    ],
    related: ["web-development", "ai-solutions"],
    seo: {
      title: "Mobile App Development | iOS & Android",
      description:
        "iOS, Android and cross-platform mobile app development. Novista Solutions builds customer apps, field operations tools and SaaS mobile products.",
    },
  },

  {
    slug: "ai-solutions",
    name: "AI Solutions",
    icon: Bot,
    promise: "Put AI to work where it creates real business value.",
    summary:
      "We find the repetitive, expensive, slow parts of how your business runs and rebuild them with AI agents, automation and LLM integrations. Applied where it pays back — not sprinkled on for the announcement.",
    capabilities: [
      "AI agents",
      "Workflow automation",
      "Document intelligence",
      "LLM integrations",
    ],
    eyebrow: "AI Solutions",
    h1: "AI Solutions & AI Agent Development",
    intro:
      "Plenty of AI projects produce an impressive demo and no change to the business. We work the other way round: find the workflow that costs you the most hours or the most errors, prove AI can improve it, then put that into production with the monitoring and guardrails to keep it reliable.",
    offerings: [
      {
        title: "AI agents",
        description:
          "Agents that carry out real multi-step work inside your systems — triaging requests, preparing records, chasing missing information — with a human approving anything consequential.",
      },
      {
        title: "Customer support automation",
        description:
          "Assistants that answer from your own documentation and order data, resolve the routine majority, and hand over to a person with full context when they cannot.",
      },
      {
        title: "Document intelligence",
        description:
          "Extracting structured data from invoices, prescriptions, purchase orders, lab reports and contracts, then pushing it straight into the system that needs it.",
      },
      {
        title: "AI knowledge assistants",
        description:
          "Retrieval-augmented search across your policies, manuals and historical records, so staff get a sourced answer in seconds instead of asking a colleague.",
      },
      {
        title: "Workflow automation",
        description:
          "Removing the copy-paste between systems: routing, classification, summarisation and data entry handled automatically, with exceptions escalated.",
      },
      {
        title: "Internal AI assistants",
        description:
          "Private assistants grounded in your own data for sales, operations and finance teams, deployed so your data never becomes someone else's training set.",
      },
      {
        title: "Business intelligence",
        description:
          "Natural-language reporting over your operational data, so managers can ask a question directly rather than queue for a report.",
      },
      {
        title: "LLM integration into existing products",
        description:
          "Adding drafting, summarising, classification or search to software you already own, behind a proper evaluation and cost model.",
      },
    ],
    outcomes: [
      {
        title: "Hours back, measured",
        description:
          "We baseline how long a workflow takes before we touch it, then measure the same thing after. If the numbers do not move, it is not finished.",
      },
      {
        title: "Accuracy you can audit",
        description:
          "Every AI output is traceable to its source, with evaluation sets, confidence thresholds and a defined path for when the model is unsure.",
      },
      {
        title: "Costs that stay predictable",
        description:
          "Model choice, caching and routing are designed around your usage, so the bill scales with value rather than surprising you at month end.",
      },
    ],
    deliverables: [
      "AI opportunity assessment across your workflows",
      "Working proof of concept on your real data",
      "Production agent or automation with guardrails",
      "Evaluation suite and accuracy benchmarks",
      "Human-in-the-loop review interface",
      "Monitoring, logging and cost controls",
      "Team enablement and documentation",
    ],
    techGroups: [
      { label: "Models", items: ["Claude", "OpenAI", "Open-weight models", "Fine-tuning"] },
      { label: "Patterns", items: ["RAG", "Agentic workflows", "Tool use", "Evaluations"] },
      { label: "Data", items: ["Vector databases", "PostgreSQL + pgvector", "Embeddings"] },
      { label: "Orchestration", items: ["Model Context Protocol", "Queues & workers", "Webhooks"] },
    ],
    faqs: [
      {
        question: "Can you integrate AI into a business we already run on other software?",
        answer:
          "Almost always, yes. AI usually sits alongside your existing systems rather than replacing them — reading from your database, calling your APIs, writing results back. What matters is whether the data it needs is accessible and reasonably clean. We check that first, because it is the most common reason AI projects stall.",
      },
      {
        question: "How do we know where to start with AI?",
        answer:
          "We run a short assessment across your workflows and score each one on volume, time cost, error rate and how well-defined the task is. That produces a ranked shortlist. The first project should be something narrow enough to ship in weeks and visible enough that the result is obvious.",
      },
      {
        question: "What happens to our data?",
        answer:
          "Your data stays yours. We use enterprise API tiers that exclude your inputs from model training, and for sensitive workloads we can run open-weight models in your own environment. Data handling, retention and access are agreed in writing before any integration is built.",
      },
      {
        question: "What if the AI gets something wrong?",
        answer:
          "We design for that from the start rather than hoping it does not happen. Outputs cite their sources, confidence thresholds route uncertain cases to a person, and anything with financial, legal or clinical consequence requires human approval. You get logs of every decision the system made.",
      },
    ],
    related: ["digital-transformation", "web-development"],
    seo: {
      title: "AI Solutions & AI Agent Development",
      description:
        "AI agent development, workflow automation, document intelligence and LLM integration. Novista Solutions builds AI systems that measurably reduce operational cost.",
    },
  },

  {
    slug: "digital-transformation",
    name: "Digital Transformation",
    icon: RefreshCcw,
    promise:
      "Modernise the way your business works — from outdated systems to connected digital operations.",
    summary:
      "Legacy modernisation, process automation, cloud migration and systems integration, delivered in stages. We change how your business runs without stopping it while we do.",
    capabilities: [
      "Legacy modernisation",
      "Systems integration",
      "Cloud migration",
      "Process automation",
    ],
    eyebrow: "Digital Transformation",
    h1: "Digital Transformation Services",
    intro:
      "Most businesses do not need a transformation programme. They need three specific things fixed: a system nobody can maintain, data trapped in four places, and a process still running on email. We work in that order — highest cost first, in stages you can stop between.",
    offerings: [
      {
        title: "Legacy system modernisation",
        description:
          "Moving off software that is expensive to change or impossible to hire for, incrementally, with the old and new systems running in parallel until you are confident.",
      },
      {
        title: "Systems integration",
        description:
          "Connecting ERP, CRM, accounting, e-commerce and in-house tools so data flows once instead of being re-keyed three times.",
      },
      {
        title: "Process automation",
        description:
          "Approvals, handoffs, reconciliations and reporting that currently depend on someone remembering to do them, turned into reliable automated steps.",
      },
      {
        title: "Cloud migration",
        description:
          "Moving from on-premise servers to cloud infrastructure with a real plan for cost, security, backups and the day something fails.",
      },
      {
        title: "Data modernisation",
        description:
          "Consolidating fragmented data into one trustworthy model, so reports across departments finally agree with each other.",
      },
      {
        title: "Internal business platforms",
        description:
          "Replacing the spreadsheet-and-shared-drive layer with proper internal tools that have permissions, an audit trail and a search box.",
      },
      {
        title: "Digital workflow design",
        description:
          "Mapping how work actually moves through your business today, then redesigning it before automating it — automating a bad process just makes it faster.",
      },
      {
        title: "Technology consulting",
        description:
          "Independent advice on architecture, build-versus-buy, vendor selection and technical due diligence, with no incentive to sell you more build than you need.",
      },
    ],
    outcomes: [
      {
        title: "Staged delivery, not a two-year bet",
        description:
          "Each phase ships something usable and can stand on its own. If priorities change after phase two, you keep the value of phases one and two.",
      },
      {
        title: "Operations that do not stop",
        description:
          "Parallel running, phased cutover and tested rollback. Your team keeps working through the migration, and we plan for the bad day in advance.",
      },
      {
        title: "Lower cost to change",
        description:
          "The point of modernising is not new technology — it is that your next request takes days instead of months and does not need the one person who understands the old system.",
      },
    ],
    deliverables: [
      "Current-state systems and process audit",
      "Target architecture and phased roadmap",
      "Integration layer between core systems",
      "Migrated data with validation reports",
      "Automated workflows and monitoring",
      "Cutover, rollback and continuity plan",
      "Team training and operating documentation",
    ],
    techGroups: [
      { label: "Cloud", items: ["AWS", "Azure", "Google Cloud", "Docker"] },
      { label: "Integration", items: ["REST & GraphQL APIs", "Message queues", "Webhooks", "ETL pipelines"] },
      { label: "Data", items: ["PostgreSQL", "SQL Server", "Data warehousing", "Reporting"] },
      { label: "Operations", items: ["CI/CD", "Monitoring & alerting", "Backup & recovery"] },
    ],
    faqs: [
      {
        question: "Can you modernise our legacy software without a full rebuild?",
        answer:
          "Usually, yes. We put an API layer in front of the existing system, move one capability at a time onto modern infrastructure, and retire the old parts as they are replaced. The legacy system keeps running throughout. A full rewrite is sometimes genuinely the cheaper option, and when it is we will say so with the reasoning.",
      },
      {
        question: "How disruptive is this to day-to-day operations?",
        answer:
          "Less than most people expect, because we do not do big-bang cutovers. Phases are scoped to a few weeks, new and old run side by side during transition, and every phase has a tested rollback. The heaviest demand on your team is time from the people who know the current process.",
      },
      {
        question: "Do you work with the systems we already have?",
        answer:
          "Yes. Transformation work is mostly integration work. If a system has an API, a database or even a scheduled export, we can usually connect it. Where a vendor system is genuinely closed, we will tell you what that constrains before you plan around it.",
      },
    ],
    related: ["ai-solutions", "web-development"],
    seo: {
      title: "Digital Transformation Services",
      description:
        "Legacy system modernisation, systems integration, cloud migration and process automation. Novista Solutions modernises business operations in staged, low-risk phases.",
    },
  },
];

export const serviceSlugs = services.map((service) => service.slug);

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

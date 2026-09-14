import {
  Bot,
  Calculator,
  FlaskConical,
  GraduationCap,
  Layers,
  Pill,
  Sparkles,
  Stethoscope,
  Store,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Products Novista builds and owns, as opposed to work delivered for a client.
 *
 * To add a product: copy any entry, change the fields, done. It appears on
 * /products, gets its own page at /products/<slug>, and enters the sitemap
 * automatically.
 */

export type ProductStatus = "Available" | "Early access" | "In development";

export type Product = {
  slug: string;
  name: string;
  icon: LucideIcon;
  category: "Industry platforms" | "Business operations" | "AI products";
  /** One line for the card. */
  tagline: string;
  /** 2-3 sentences for the card and page intro. */
  description: string;
  /** The concrete pain this product removes. */
  problem: string;
  features: string[];
  audience: string[];
  status: ProductStatus;
  /** Public demo or product site. Leave null and no link is rendered. */
  demoUrl: string | null;
  seo: { title: string; description: string };
};

export const products: Product[] = [
  {
    slug: "school-management",
    name: "School Management",
    icon: GraduationCap,
    category: "Industry platforms",
    tagline: "One system for admissions, academics, fees and parents.",
    description:
      "A complete school operations platform covering student records, timetabling, attendance, examinations, fee collection and parent communication. Built for single schools and multi-campus groups that need one consistent view across all of them.",
    problem:
      "Student data, fee ledgers and attendance registers live in separate files, so nobody can answer a simple question — who owes what, which class is short a teacher, how a cohort is actually performing — without an afternoon of reconciliation.",
    features: [
      "Student information and enrolment records",
      "Admissions pipeline and document management",
      "Class scheduling and timetable management",
      "Attendance tracking for students and staff",
      "Examinations, grading and report cards",
      "Fee structures, invoicing and payment tracking",
      "Parent and student portals",
      "Multi-campus reporting and role-based access",
    ],
    audience: [
      "Schools and colleges",
      "Multi-campus school groups",
      "Academies and training institutes",
    ],
    status: "Available",
    demoUrl: null,
    seo: {
      title: "School Management System",
      description:
        "School management software for admissions, attendance, examinations, fee collection and parent portals — built for single schools and multi-campus groups.",
    },
  },

  {
    slug: "point-of-sale",
    name: "Point of Sale",
    icon: Store,
    category: "Business operations",
    tagline: "Fast retail checkout that keeps stock and accounts in step.",
    description:
      "A point-of-sale system for retail counters and multi-branch operations, with barcode scanning, split payments, returns and shift reconciliation. Sales update inventory and the accounting ledger as they happen, not overnight.",
    problem:
      "The till, the stock sheet and the accounts never agree. Shrinkage goes unnoticed for weeks, popular lines run out, and closing the month means manually reconciling three sets of numbers.",
    features: [
      "Barcode scanning and fast keyboard checkout",
      "Multi-branch and multi-counter support",
      "Cash, card and split payment handling",
      "Returns, exchanges and credit notes",
      "Real-time inventory deduction and stock alerts",
      "Discounts, promotions and loyalty",
      "Shift close and cash reconciliation",
      "Daily sales, margin and branch performance reports",
    ],
    audience: [
      "Retail stores and chains",
      "Supermarkets and grocery",
      "Restaurants and quick service",
    ],
    status: "Available",
    demoUrl: null,
    seo: {
      title: "Point of Sale (POS) Software",
      description:
        "Retail point of sale software with barcode checkout, multi-branch inventory, loyalty and shift reconciliation — synced with stock and accounting in real time.",
    },
  },

  {
    slug: "hospital-management",
    name: "Hospital Management System",
    icon: Stethoscope,
    category: "Industry platforms",
    tagline: "Patient flow, clinical records and billing in one place.",
    description:
      "A hospital information system spanning registration, appointments, OPD and IPD workflows, electronic medical records, pharmacy, diagnostics and billing. Designed so the front desk, the ward and the accounts office are working from the same record.",
    problem:
      "Patient history sits in paper files, the pharmacy and lab run their own systems, and billing is assembled by hand at discharge — which is slow for patients and where most revenue quietly leaks.",
    features: [
      "Patient registration and unique medical record numbers",
      "Appointment scheduling and doctor rosters",
      "OPD and IPD workflows with bed management",
      "Electronic medical records and prescriptions",
      "Integrated pharmacy and diagnostics ordering",
      "Insurance, panel and cash billing",
      "Discharge summaries and follow-up tracking",
      "Role-based clinical access and audit trail",
    ],
    audience: [
      "Hospitals and nursing homes",
      "Multi-speciality clinics",
      "Diagnostic and day-care centres",
    ],
    status: "Available",
    demoUrl: null,
    seo: {
      title: "Hospital Management System (HMS)",
      description:
        "Hospital management software covering registration, appointments, OPD and IPD, electronic medical records, pharmacy, diagnostics and integrated billing.",
    },
  },

  {
    slug: "laboratory-management",
    name: "Laboratory Management System",
    icon: FlaskConical,
    category: "Industry platforms",
    tagline: "From sample collection to verified report, tracked end to end.",
    description:
      "A LIMS covering test ordering, sample barcoding, workflow status, result entry, validation and report delivery. Every sample has a traceable chain of custody and every result has a named verifier.",
    problem:
      "Samples get mislabelled, turnaround time is a guess, results are typed twice, and patients call the front desk to ask where their report is because there is no way for them to check.",
    features: [
      "Test catalogue, panels and pricing",
      "Sample barcoding and chain of custody",
      "Worklists by department and analyser",
      "Result entry with reference ranges and flags",
      "Two-step verification before release",
      "Automated report delivery by portal, email or SMS",
      "Analyser and instrument interfacing",
      "Turnaround time and quality control reporting",
    ],
    audience: [
      "Pathology and diagnostic laboratories",
      "Hospital laboratory departments",
      "Collection centre networks",
    ],
    status: "Available",
    demoUrl: null,
    seo: {
      title: "Laboratory Management System (LIMS)",
      description:
        "Laboratory information management software for sample tracking, result verification, analyser interfacing and automated report delivery.",
    },
  },

  {
    slug: "erp",
    name: "ERP",
    icon: Layers,
    category: "Business operations",
    tagline: "The operational backbone, configured to how you actually work.",
    description:
      "An enterprise resource planning platform tying together inventory, procurement, sales, production, finance and reporting. Modular, so you can start with the two areas that hurt most and add the rest as you go.",
    problem:
      "Each department runs its own system and its own spreadsheet. Nobody trusts the numbers in the monthly report because three versions exist and none of them reconcile.",
    features: [
      "Inventory and multi-warehouse management",
      "Procurement, purchase orders and supplier records",
      "Sales orders, quotations and invoicing",
      "Production planning and bill of materials",
      "General ledger and financial reporting",
      "Approval workflows and audit trail",
      "Role-based permissions across departments",
      "Configurable dashboards and exports",
    ],
    audience: [
      "Manufacturers",
      "Trading and distribution businesses",
      "Multi-department SMEs",
    ],
    status: "Available",
    demoUrl: null,
    seo: {
      title: "ERP Software",
      description:
        "Modular ERP software covering inventory, procurement, sales, production and finance — configured around your operations rather than the other way round.",
    },
  },

  {
    slug: "crm",
    name: "CRM",
    icon: Users,
    category: "Business operations",
    tagline: "Every lead, conversation and deal in one pipeline.",
    description:
      "Customer relationship management built for teams that sell and support at the same time. Leads, activities, quotations and post-sale tickets sit on one timeline per customer, so nobody has to ask what was last agreed.",
    problem:
      "Leads live in a sales rep's phone and a shared inbox. When someone leaves, their pipeline leaves with them, and there is no reliable forecast because nothing is recorded consistently.",
    features: [
      "Lead capture from web forms and campaigns",
      "Configurable pipelines and deal stages",
      "Activity, call and meeting logging",
      "Quotation and proposal generation",
      "Email and WhatsApp conversation history",
      "Task assignment and follow-up reminders",
      "Support ticketing linked to the customer record",
      "Forecasting and sales performance reporting",
    ],
    audience: [
      "Sales-led B2B businesses",
      "Service companies with recurring clients",
      "Distributors managing a dealer network",
    ],
    status: "Available",
    demoUrl: null,
    seo: {
      title: "CRM Software",
      description:
        "CRM software with configurable pipelines, quotations, conversation history, support ticketing and sales forecasting on one customer timeline.",
    },
  },

  {
    slug: "pharmacy-management",
    name: "Pharmacy Management",
    icon: Pill,
    category: "Industry platforms",
    tagline: "Dispensing, batch control and expiry tracking without the manual checks.",
    description:
      "Pharmacy software covering dispensing, prescription records, batch and expiry control, supplier purchasing and regulated stock handling. Built for retail pharmacies and in-hospital dispensaries alike.",
    problem:
      "Expiry and batch tracking depends on someone physically checking shelves. Stock is written off after the fact, controlled items are logged in a paper register, and reordering is reactive.",
    features: [
      "Dispensing against prescriptions",
      "Batch, lot and expiry tracking with alerts",
      "Controlled substance register",
      "Supplier purchasing and goods receipt",
      "Substitute and generic suggestions",
      "Insurance and panel claim handling",
      "Automatic reorder levels by movement",
      "Margin, wastage and expiry loss reporting",
    ],
    audience: [
      "Retail pharmacies and chains",
      "Hospital and clinic dispensaries",
      "Pharmaceutical distributors",
    ],
    status: "Available",
    demoUrl: null,
    seo: {
      title: "Pharmacy Management Software",
      description:
        "Pharmacy management software with dispensing, batch and expiry control, controlled substance records, purchasing and claim handling.",
    },
  },

  {
    slug: "hrms",
    name: "HRMS",
    icon: Users,
    category: "Business operations",
    tagline: "Attendance, payroll and people records that agree with each other.",
    description:
      "A human resource management system covering the employee lifecycle: onboarding, attendance, leave, payroll, appraisals and exit. Attendance feeds payroll directly, so the two can never drift apart.",
    problem:
      "Attendance comes off a biometric export, leave is approved over chat, and payroll is rebuilt in a spreadsheet every month — which is slow, error-prone and impossible to audit.",
    features: [
      "Employee records and document management",
      "Onboarding and exit checklists",
      "Biometric and shift-based attendance",
      "Leave policies, balances and approvals",
      "Payroll with tax, deductions and payslips",
      "Loans, advances and reimbursements",
      "Appraisals and goal tracking",
      "Employee self-service portal",
    ],
    audience: [
      "Growing SMEs",
      "Multi-branch organisations",
      "Businesses with shift-based workforces",
    ],
    status: "Available",
    demoUrl: null,
    seo: {
      title: "HRMS & Payroll Software",
      description:
        "HR management software covering onboarding, biometric attendance, leave, payroll, appraisals and employee self-service in one connected system.",
    },
  },

  {
    slug: "accounting",
    name: "Accounting",
    icon: Calculator,
    category: "Business operations",
    tagline: "Books that close on time because the data arrives already correct.",
    description:
      "Double-entry accounting with receivables, payables, banking, tax and financial statements. Designed to sit underneath the rest of the Novista stack so sales, purchasing and payroll post automatically.",
    problem:
      "Finance re-enters the same transactions the operations team already recorded, month-end close drags on for a week, and the management accounts are too late to act on.",
    features: [
      "Chart of accounts and double-entry ledger",
      "Accounts receivable and payable ageing",
      "Bank reconciliation",
      "Tax handling and statutory reports",
      "Multi-currency transactions",
      "Cost centres and departmental reporting",
      "Trial balance, P&L and balance sheet",
      "Automatic posting from POS, ERP and payroll",
    ],
    audience: [
      "SMEs and growing businesses",
      "Accounting and bookkeeping practices",
      "Multi-entity groups",
    ],
    status: "Available",
    demoUrl: null,
    seo: {
      title: "Accounting Software",
      description:
        "Double-entry accounting software with receivables, payables, bank reconciliation, tax reporting and automatic posting from POS, ERP and payroll.",
    },
  },

  {
    slug: "distribution-management",
    name: "Distribution Management",
    icon: Truck,
    category: "Industry platforms",
    tagline: "Orders, routes and receivables across a whole dealer network.",
    description:
      "Distribution software for businesses moving stock through warehouses, vans and dealers. Covers order booking, route planning, van sales, delivery confirmation and credit control across the network.",
    problem:
      "Order booking happens on paper in the field, deliveries are confirmed by phone, and outstanding receivables across dealers are only visible once a month — by which point the exposure is already too large.",
    features: [
      "Multi-warehouse stock and transfers",
      "Order booking with mobile field app",
      "Route planning and van sales",
      "Delivery confirmation and proof of delivery",
      "Dealer and distributor hierarchy",
      "Credit limits and receivables control",
      "Scheme, discount and claim management",
      "Territory and salesperson performance reporting",
    ],
    audience: [
      "FMCG distributors",
      "Pharmaceutical distribution",
      "Wholesale and trading networks",
    ],
    status: "Available",
    demoUrl: null,
    seo: {
      title: "Distribution Management Software",
      description:
        "Distribution management software for order booking, route planning, van sales, proof of delivery and dealer receivables across a full network.",
    },
  },

  {
    slug: "ai-agents",
    name: "AI Agents",
    icon: Bot,
    category: "AI products",
    tagline: "Agents that do the routine work inside your systems.",
    description:
      "A framework for deploying AI agents against your own data and tools — handling support queues, document processing, data entry and follow-ups, with human approval on anything that carries risk.",
    problem:
      "A meaningful share of your team's day goes on work that is high-volume, rules-based and mind-numbing: reading the same forms, routing the same requests, chasing the same missing fields.",
    features: [
      "Agents grounded in your documents and databases",
      "Tool and API access to act inside your systems",
      "Human-in-the-loop approval for sensitive steps",
      "Full decision logging and traceability",
      "Evaluation sets to measure accuracy before rollout",
      "Escalation rules and confidence thresholds",
      "Usage and cost monitoring",
      "Deployment in your cloud where required",
    ],
    audience: [
      "Operations and support teams",
      "Businesses with high-volume document workflows",
      "Companies scaling without scaling headcount",
    ],
    status: "Available",
    demoUrl: null,
    seo: {
      title: "AI Agents for Business",
      description:
        "Deploy AI agents that work inside your existing systems — support triage, document processing and data entry, with human approval and full audit logging.",
    },
  },

  {
    slug: "ai-enabled-solutions",
    name: "AI-Enabled Solutions",
    icon: Sparkles,
    category: "AI products",
    tagline: "AI built into the software you already run.",
    description:
      "Every Novista platform can be extended with an AI layer — natural-language reporting, document extraction, smart search and assisted data entry — added to the product you already use rather than bolted on as a separate tool.",
    problem:
      "Teams have to leave the system they work in, paste data into a separate AI tool, then paste the result back. The value is real but the workflow is broken, so adoption never sticks.",
    features: [
      "Natural-language reporting across your operational data",
      "Document extraction into existing forms",
      "Smart search across records and attachments",
      "Assisted data entry and validation",
      "Summarisation of long records and histories",
      "Anomaly and exception detection",
      "Available across the Novista product range",
      "Configurable per role and permission level",
    ],
    audience: [
      "Existing Novista platform users",
      "Businesses modernising in-house software",
      "Teams evaluating a first AI use case",
    ],
    status: "Available",
    demoUrl: null,
    seo: {
      title: "AI-Enabled Business Solutions",
      description:
        "Add natural-language reporting, document extraction, smart search and assisted data entry to the business software your team already uses every day.",
    },
  },

];

export const productCategories = [
  "Industry platforms",
  "Business operations",
  "AI products",
] as const;

export const productSlugs = products.map((product) => product.slug);

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

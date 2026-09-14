import type { Faq } from "./services";

/**
 * General FAQs. These power the /faq page, the homepage FAQ block and the
 * FAQPage structured data. Keep answers specific — vague answers rank badly
 * and convert worse.
 *
 * Answers must reflect what is actually visible on the page, because they are
 * also emitted as JSON-LD.
 */
export type FaqCategory = {
  category: string;
  items: Faq[];
};

export const faqCategories: FaqCategory[] = [
  {
    category: "Working with us",
    items: [
      {
        question: "How do we start a project?",
        answer:
          "Send us a short description of what you are trying to achieve through the contact form. We will reply within one business day to arrange a call. That first conversation is free and is about understanding the problem — if we are not the right fit, we will tell you and, where we can, point you somewhere better. If it is a fit, we follow up with a written scope, timeline and cost for a first phase.",
      },
      {
        question: "Do you work with startups?",
        answer:
          "Yes. For early-stage companies we deliberately scope a small first release that gets something real in front of users quickly, rather than spending the budget on a feature set nobody has validated yet. We are equally clear when an off-the-shelf tool would serve you better than custom software at this stage.",
      },
      {
        question: "Do you work with international clients?",
        answer:
          "Yes. We work remotely with clients in other countries and time zones as a matter of routine, with a fixed overlap window each day for calls and a written record of decisions so progress does not depend on being in the same room.",
      },
      {
        question: "Who will actually be working on our project?",
        answer:
          "The same small team throughout, with one point of contact who knows your project. Our CTO sets and reviews the architecture on every engagement. We do not hand projects to a different team after the sales conversation.",
      },
    ],
  },
  {
    category: "Cost and timelines",
    items: [
      {
        question: "How much does custom software development cost?",
        answer:
          "It depends on scope, integrations and how much of the process is already well defined — which is why we do not publish a price list that would be wrong for most projects. What we can do quickly is give you a costed first phase after one scoping conversation, so you are comparing a real number rather than a range. Where a smaller build or an existing product would meet the need for less, we will say so.",
      },
      {
        question: "How long does it take to build a web application?",
        answer:
          "A focused marketing website is typically 3–6 weeks. A first production release of a custom web application is usually 8–16 weeks, depending on how many workflows it covers and how many systems it integrates with. Larger platforms are delivered in phases, each one usable on its own rather than waiting for a single launch date.",
      },
      {
        question: "How do you handle changes to scope?",
        answer:
          "Each phase has a fixed, written scope. When something new comes up mid-phase we price it and you decide whether it goes into the current phase or the next one. Nothing gets added silently and nothing gets billed without being agreed first.",
      },
    ],
  },
  {
    category: "Services and capability",
    items: [
      {
        question: "Do you develop mobile applications?",
        answer:
          "Yes — native iOS and Android, and cross-platform builds in React Native or Flutter. We also handle App Store and Play Store submission, store listings and the release process, and take on existing apps that need modernising or rescuing after a previous developer.",
      },
      {
        question: "Can you integrate AI into an existing business?",
        answer:
          "In most cases, yes. AI usually sits alongside your current systems rather than replacing them — reading from your database, calling your APIs and writing results back. The practical question is whether the data it needs is accessible and reasonably clean, which we assess before proposing anything, because it is the most common reason AI projects stall.",
      },
      {
        question: "Can you modernise legacy software?",
        answer:
          "Yes, and usually without a full rebuild. We put an API layer in front of the existing system, move one capability at a time onto modern infrastructure, and retire the old parts as their replacements are proven. The legacy system keeps running throughout. When a rewrite genuinely is the cheaper route, we will show you the reasoning rather than just recommending it.",
      },
      {
        question: "Can you integrate our existing systems?",
        answer:
          "Yes. Connecting ERP, CRM, accounting, e-commerce and in-house tools is a large part of what we do. If a system has an API, a database or even a scheduled export, we can usually integrate it. Where a vendor system is genuinely closed we will tell you what that constrains before you plan around it.",
      },
    ],
  },
  {
    category: "After launch",
    items: [
      {
        question: "Do you provide ongoing maintenance and support?",
        answer:
          "Yes. Support covers security patches, dependency updates, monitoring, bug fixes and a prioritised backlog of improvements. It is offered as an ongoing arrangement but is never a condition of working with us — you can take the system in-house whenever you want.",
      },
      {
        question: "Who owns the code and the data?",
        answer:
          "You do, in full. Source code, data, cloud accounts and domains are yours and are handed over at any point on request. We do not hold projects hostage through accounts registered in our name.",
      },
      {
        question: "What happens if something breaks in production?",
        answer:
          "Monitoring and alerting go live with the product, so in most cases we see a problem before you report it. Support agreements define response times by severity, and every release has a tested rollback path so a bad deployment can be reversed quickly rather than debugged under pressure.",
      },
    ],
  },
];

/** Flat list, used for structured data and the homepage excerpt. */
export const allFaqs: Faq[] = faqCategories.flatMap((group) => group.items);

/**
 * The subset shown on the homepage, selected by question so that reordering
 * or adding entries above never silently changes what the homepage shows.
 */
const HOMEPAGE_FAQ_QUESTIONS = [
  "How much does custom software development cost?",
  "How long does it take to build a web application?",
  "Can you integrate AI into an existing business?",
  "Can you modernise legacy software?",
  "How do we start a project?",
  "Do you provide ongoing maintenance and support?",
];

export const homepageFaqs: Faq[] = HOMEPAGE_FAQ_QUESTIONS.map((question) =>
  allFaqs.find((faq) => faq.question === question),
).filter((faq): faq is Faq => Boolean(faq));

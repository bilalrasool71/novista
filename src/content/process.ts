import {
  Compass,
  Hammer,
  Map,
  Rocket,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type ProcessStep = {
  number: string;
  title: string;
  summary: string;
  detail: string;
  icon: LucideIcon;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    summary: "Understand your business, users, goals and constraints.",
    detail:
      "We sit with the people who do the work today and map how it actually happens — including the workarounds. Most of the value in a project is decided here, before anyone writes code.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Plan",
    summary: "Define the solution, architecture, roadmap and priorities.",
    detail:
      "You get a scoped first release, a target architecture, a phased roadmap and a cost picture. Anything we are unsure about is named as a risk rather than buried in an estimate.",
    icon: Map,
  },
  {
    number: "03",
    title: "Build",
    summary: "Design and develop using modern, scalable technologies.",
    detail:
      "Short iterations with working software you can click through at the end of each one. Code review, automated checks and a staging environment are part of the process, not optional extras.",
    icon: Hammer,
  },
  {
    number: "04",
    title: "Launch",
    summary: "Test, deploy, monitor and optimise.",
    detail:
      "Data migration, user training, a rehearsed cutover and a rollback plan we have actually tested. Monitoring and analytics go live with the product, not a month later.",
    icon: Rocket,
  },
  {
    number: "05",
    title: "Grow",
    summary: "Keep improving the product as your business evolves.",
    detail:
      "Ongoing support, security updates and a prioritised backlog shaped by how the system is really being used. Most of our long-running work started as a small first release.",
    icon: TrendingUp,
  },
];

/** Shown alongside the process — what you can expect from working with us. */
export const engagementPrinciples: string[] = [
  "One point of contact who knows your project, not a rotating account manager",
  "Weekly progress you can see, in working software rather than status decks",
  "Fixed scope per phase, with changes priced before they are started",
  "Your code, your data and your accounts — handed over in full at any point",
];

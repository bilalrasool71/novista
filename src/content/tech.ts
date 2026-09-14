import {
  Bot,
  Cloud,
  Database,
  Layers,
  Smartphone,
  Server,
  type LucideIcon,
} from "lucide-react";

/**
 * Keep this list honest — only technologies the team actually works in.
 * Removing a line here removes it from the website; nothing else to change.
 */
export type TechGroup = {
  label: string;
  icon: LucideIcon;
  description: string;
  items: string[];
};

export const techGroups: TechGroup[] = [
  {
    label: "Frontend",
    icon: Layers,
    description: "Interfaces that stay fast on real devices and real connections.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Angular"],
  },
  {
    label: "Backend",
    icon: Server,
    description: "Application and API layers built for load, not just for demos.",
    items: ["Node.js", ".NET", "Python", "REST APIs", "GraphQL"],
  },
  {
    label: "Mobile",
    icon: Smartphone,
    description: "Cross-platform where it saves money, native where it matters.",
    items: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    label: "AI",
    icon: Bot,
    description: "Applied model work with evaluation and cost control attached.",
    items: [
      "Claude",
      "OpenAI",
      "RAG pipelines",
      "AI agents",
      "Vector databases",
      "Model Context Protocol",
    ],
  },
  {
    label: "Data",
    icon: Database,
    description: "One trustworthy model underneath the reports people act on.",
    items: ["PostgreSQL", "SQL Server", "MySQL", "Redis", "Data warehousing"],
  },
  {
    label: "Cloud & DevOps",
    icon: Cloud,
    description: "Deployment, monitoring and recovery planned before launch day.",
    items: ["AWS", "Azure", "Google Cloud", "Docker", "CI/CD", "Vercel"],
  },
];

export const techPhilosophy =
  "We choose technology based on your business requirements — not the other way round. A stack that is unfashionable but well understood by your team will usually beat one that is new and impressive.";

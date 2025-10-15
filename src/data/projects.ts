export interface Project {
  id: string;
  name: string;
  description: string;
  impact: string[];
  tech: string[];
  categories: string[];
  links: {
    type: "article" | "github" | "demo" | "website";
    url: string;
    label: string;
  }[];
  period?: string;
  relatedPostIds?: string[];
}

export const featuredProjects: Project[] = [
  {
    id: "ehealth",
    name: "eHealth: National Health Service of Ukraine",
    description:
      "Delivered national-scale healthcare systems used daily by 35M+ patients across 16K+ healthcare facilities",
    impact: [
      "35M+ patients, 400K+ medical professionals",
      "16K+ healthcare facilities nationwide",
      "Medical reimbursements, records, e-prescriptions",
      "Built in 6 months, open-sourced",
    ],
    tech: ["Elixir", "Phoenix", "Kubernetes", "PostgreSQL"],
    categories: ["Architecture", "Engineering", "DevOps"],
    links: [
      {
        type: "website",
        url: "https://ehealth.gov.ua/",
        label: "Website",
      },
      {
        type: "website",
        url: "https://uk.wikipedia.org/wiki/EHealth",
        label: "Wikipedia",
      },
    ],
    period: "Apr 2017 - Aug 2017",
    relatedPostIds: ["national-health-service", "blockchain-properties"],
  },
  {
    id: "firezone",
    name: "Firezone",
    description: "Zero Trust access platform, open source (YC W22)",
    impact: [
      "Built control plane & dashboard (~70% of codebase)",
      "99.99%+ uptime, fault-tolerant architecture",
      "Owned infrastructure end-to-end with IaC",
    ],
    tech: ["Elixir", "Phoenix", "LiveView", "GCP", "Terraform"],
    categories: ["Security", "Engineering", "DevOps"],
    links: [
      {
        type: "github",
        url: "https://github.com/firezone/firezone/",
        label: "View on GitHub",
      },
    ],
    period: "Dec 2022 - Nov 2024",
  },
  {
    id: "blitz",
    name: "Blitz",
    description:
      "Large-scale infrastructure transformation and cost optimization",
    impact: [
      "Saved $1M+ on infrastructure costs",
      "Migrated everything to Infrastructure as Code",
      "70+ services, ~25k RPS (peaks 120k)",
    ],
    tech: ["Elixir", "Terraform", "Kubernetes", "IaC"],
    categories: ["DevOps", "Architecture", "Engineering"],
    links: [],
    period: "Date TBD",
  },
  {
    id: "hammer",
    name: "Hammer Corp",
    description: "AI-enhanced CRM for remote sales teams built during COVID",
    impact: [
      "300% revenue growth to 8 figures in year one",
      "Virtual collaboration platform for sales teams",
      "Built internal tool, turned into product",
    ],
    tech: ["Elixir", "Phoenix", "Terraform", "SQL"],
    categories: ["Engineering"],
    links: [],
    period: "Aug 2021 - Present",
  },
];

export const allProjects: Project[] = [
  ...featuredProjects,
  {
    id: "sage",
    name: "Sage - Sagas Pattern in Elixir",
    description: "Open source distributed transaction library",
    impact: [
      "1.8M+ downloads on Hex.pm",
      "🏆 Spawnfest 2017 Winner",
      "Maintainer of Nebo15 org projects",
    ],
    tech: ["Elixir", "Functional Programming", "Distributed Systems"],
    categories: ["Architecture", "Engineering"],
    links: [
      { type: "github", url: "http://github.com/nebo15", label: "GitHub" },
      {
        type: "article",
        url: "https://medium.com/nebo-15/introducing-sage-a-sagas-pattern-implementation-in-elixir-3ad499f236f6",
        label: "Read article",
      },
    ],
    period: "Jan 2018 - Present",
    relatedPostIds: ["introducing-sage"],
  },
  {
    id: "4finance",
    name: "4Finance P2P Lending Platform",
    description:
      "Large fintech platform for Europe's largest lender (9B$ portfolio)",
    impact: [
      "P2P lending across 27 countries",
      "Million+ dollar project",
      "Event-driven architecture at scale",
    ],
    tech: ["Elixir", "Phoenix", "Event-Driven Architecture", "PostgreSQL"],
    categories: ["Architecture", "Engineering", "Database"],
    links: [
      {
        type: "article",
        url: "https://medium.com/nebo-15/designing-a-p2p-lending-platform-with-elixir-in-mind-ffb323bf7252",
        label: "Read more",
      },
    ],
    period: "Jun 2016 - Feb 2017",
    relatedPostIds: ["p2p-lending-platform"],
  },
  {
    id: "talkinTo",
    name: "TalkInto",
    description: "Omnichannel messaging and calling platform",
    impact: [
      "Built messaging/eCommerce/advertising products",
      "Multi-domain business platform",
      "Powers HammerTime.com and Bullpen.io",
    ],
    tech: ["Elixir", "SQL"],
    categories: ["Engineering"],
    links: [],
    period: "Aug 2018 - Present",
  },
  {
    id: "man",
    name: "Man - Template Rendering Engine",
    description: "Template rendering microservice with localization support",
    impact: [
      "Renders iex, mustache, markdown to HTML/PDF",
      "REST JSON API with management UI",
      "One-click Heroku deployment",
    ],
    tech: ["Elixir", "SQL", "CSS"],
    categories: ["Engineering"],
    links: [],
    period: "Apr 2017 - Present",
  },
  {
    id: "annon",
    name: "Annon API Gateway",
    description: "Configurable API gateway with plugin system",
    impact: [
      "Reverse proxy with ACL, Auth, Validation plugins",
      "Stores requests/responses with key metrics",
      "Management UI and authentication provider",
    ],
    tech: ["Elixir", "SQL", "Distributed Systems"],
    categories: ["Security", "Architecture", "Engineering"],
    links: [],
    period: "Jun 2016 - Present",
  },
];

export const projectCategories = [
  "All",
  ...Array.from(new Set(allProjects.flatMap((p) => p.categories))).sort(),
];

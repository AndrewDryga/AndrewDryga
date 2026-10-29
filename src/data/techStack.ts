export interface TechItem {
  name: string;
  years?: number;
  note?: string;
  barColor?: "cyan" | "green" | "yellow";
}

export interface TechCategory {
  label: string;
  color: "cyan" | "green" | "yellow";
  items: TechItem[];
}

export interface TechHighlight {
  label: string;
  value: string;
}

export const techHighlights: TechHighlight[] = [
  { label: "YOE", value: "18+ years" },
  { label: "Packages", value: "19 on hex.pm (21M+ downloads)" },
  {
    label: "GitHub",
    // Yearly contribution and star figures supplied by Andrew.
    // Total checked against GitHub's 2012–2026 calendars on 2026-10-29.
    value:
      "29k contributions (13k this year), 5k+ stars, too many repos",
  },
  { label: "Scale", value: "25k–120k RPS, 70+ services" },
  { label: "AI token spend", value: "~$42k/mo" },
];

export const techCategories: TechCategory[] = [
  {
    label: "Backend",
    color: "cyan",
    items: [
      {
        name: "Elixir/Phoenix/LiveView\nErlang/OTP",
        years: 11,
        note: "primary",
        barColor: "cyan",
      },
      { name: "PHP", years: 8, note: "2006–2014" },
      { name: "Node.js", years: 1, note: "2014–2015" },
    ],
  },
  {
    label: "Infra",
    color: "green",
    items: [
      { name: "Terraform, GCP/AWS", years: 9, barColor: "cyan" },
      { name: "Kubernetes/Helm/Nomad", years: 6 },
      { name: "Linux, Nginx/HAProxy, CI/CD", years: 12 },
      { name: "Prometheus, Metabase", years: 8 },
    ],
  },
  {
    label: "Data",
    color: "yellow",
    items: [
      { name: "PostgreSQL", years: 11, barColor: "cyan" },
      { name: "Redis, RabbitMQ", years: 9 },
      { name: "MongoDB", years: 2 },
      { name: "Cassandra/ScyllaDB", years: 2 },
      { name: "TypeSense, Sphinx Search", years: 3 },
    ],
  },
  {
    label: "Frontend",
    color: "cyan",
    items: [{ name: "HTML/CSS/JS, Tailwind", years: 17 }],
  },
  {
    label: "AI",
    color: "cyan",
    items: [
      {
        name: "Claude / Codex / ChatGPT",
        // Earliest release in this group: original Codex, August 10, 2021.
        // https://openai.com/index/openai-codex/
        years: 5,
        barColor: "cyan",
      },
    ],
  },
  {
    label: "Security",
    color: "cyan",
    items: [{ name: "Cybersecurity", years: 15 }],
  },
  // {
  //   label: "Mobile",
  //   color: "green",
  //   items: [
  //     {
  //       name: "iOS (Obj-C), Android (Java), Apache Cordova, Ionic",
  //       years: 3,
  //       note: "2013–2014",
  //     },
  //   ],
  // },
];

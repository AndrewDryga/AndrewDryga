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
  { label: "YOE", value: "17+ years" },
  { label: "Packages", value: "19 on hex.pm (21M+ downloads)" },
  { label: "GitHub", value: "16k+ contributions, 5k+ stars, too many repos" },
  { label: "Scale", value: "25k–120k RPS, 70+ services" },
];

export const techCategories: TechCategory[] = [
  {
    label: "Backend",
    color: "cyan",
    items: [
      {
        name: "Elixir/Phoenix/LiveView\nErlang/OTP",
        years: 10,
        note: "primary",
        barColor: "cyan",
      },
      // { name: "PHP", years: 8, note: "2006–2014" },
      { name: "Node.js", years: 1, note: "2014–2015" },
    ],
  },
  {
    label: "Infra",
    color: "green",
    items: [
      { name: "Terraform, GCP/AWS", years: 8, barColor: "cyan" },
      { name: "Kubernetes/Helm", years: 5 },
      { name: "Linux, Nginx/HAProxy, CI/CD", years: 12 },
      { name: "Prometheus, Metabase", years: 8 },
    ],
  },
  {
    label: "Data",
    color: "yellow",
    items: [
      { name: "PostgreSQL", years: 10, barColor: "cyan" },
      { name: "Redis, RabbitMQ", years: 8 },
      { name: "MongoDB", years: 2 },
      { name: "Cassandra/ScyllaDB", years: 1 },
      { name: "TypeSense, Sphinx Search", years: 2 },
    ],
  },
  {
    label: "Frontend",
    color: "cyan",
    items: [{ name: "HTML/CSS/JS, Tailwind", years: 16 }],
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

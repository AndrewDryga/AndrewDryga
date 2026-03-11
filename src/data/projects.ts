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
  hasDetailPage?: boolean; // Set to true if a matching MDX file exists in src/content/projects/
}

export const featuredProjects: Project[] = [
  {
    id: "blitz",
    name: "Blitz",
    description:
      "Single-handedly owned ~20 high-traffic backends end-to-end (77 Elixir umbrella apps, 70+ Redis/50+ PostgreSQL instances) serving ~25k RPS with peaks to 120k for a 7-figure DAU product.",
    impact: [
      "Cut cloud spend ~91% ($220k/mo to $20k/mo), saving >$2M/yr",
      "Drove daily errors from six-figure to near-zero",
      "Rebuilt infra end-to-end: Terraform IaC, CI/CD with safe one-click deploys",
    ],
    tech: [
      "Elixir",
      "Terraform",
      "GCP",
      "Kubernetes",
      "Redis",
      "PostgreSQL",
      "Cassandra",
      "TypeSense",
      "Riak",
      "HAProxy",
    ],
    categories: ["AdTech"],
    links: [
      {
        type: "website",
        url: "https://blitz.gg/",
        label: "Website",
      },
    ],
    period: "Feb 2025 - Present",
    hasDetailPage: true,
  },
  {
    id: "firezone",
    name: "Firezone",
    description:
      "WireGuard-based replacement for legacy VPNs. Re-architected and developed key components of the enterprise product. Led infrastructure as code with Terraform on GCP. Open source, YC W22.",
    impact: [
      "8.4k+ GitHub stars",
      "Built control plane & dashboard with 99.99%+ uptime",
      "Owned infrastructure end-to-end with IaC on GCP",
    ],
    tech: ["Elixir", "Phoenix", "LiveView", "GCP", "Terraform", "Tailwind"],
    categories: ["Security", "Open Source"],
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
    id: "ehealth",
    name: "eHealth: National Health Service of Ukraine",
    description:
      "Co-designed and built the national platform behind reimbursements, EMR, e-prescriptions, and nationwide APIs for clinics and pharmacies. Led architecture, security, hiring, and hands-on Elixir + DevOps. All development open-sourced under Apache license.",
    impact: [
      "35M+ patients, 350k+ healthcare workers, 16k+ facilities",
      "Billions of EMRs, e-prescriptions, and medical records",
      "From zero to production in ~6 months",
    ],
    tech: ["Elixir", "Kubernetes", "Helm", "PostgreSQL", "Kafka", "Terraform"],
    categories: ["HealthTech", "Open Source", "Security"],
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
    id: "hammer",
    name: "Hammer Corp",
    description:
      "Advertising platform for thousands of US automotive dealerships: ingests inventory, syndicates ads to major channels (at peak accountable for 30%+ cars on Facebook Marketplace), measures conversion, and collects leads to a unified interface with 24/7 human first-responder reps answering within 60 seconds.",
    impact: [
      "3x+ revenue growth to 8 figures in first year",
      "60 seconds average rep response time, 24/7",
      "Built and led a team of 13 engineers across 3+ products",
    ],
    tech: [
      "Elixir",
      "Phoenix",
      "AWS",
      "GCP",
      "Terraform",
      "Kubernetes",
      "PostgreSQL",
      "Heroku",
      "RabbitMQ",
      "Redis",
      "VoIP",
    ],
    categories: ["AdTech"],
    links: [
      {
        type: "website",
        url: "https://www.hammertime.com/",
        label: "Website",
      },
    ],
    period: "Mar 2018 - Dec 2022",
  },
];

export const allProjects: Project[] = [
  ...featuredProjects,

  // AdTech
  {
    id: "bullpen",
    name: "Bullpen - Virtual Sales Floor + CRM",
    description:
      "When COVID hit, our sales team lost the buzz of the office. We built a platform that brought it back - a CRM with virtual space where reps could collaborate, learn from each other in real time, and keep the same drive. Then we turned it into a standalone product with AI sprinkled around it.",
    impact: [
      "Remote-first virtual sales floor with real-time collaboration",
      "AI-enhanced CRM with shared context",
    ],
    tech: ["Elixir", "PostgreSQL", "Terraform", "Kubernetes"],
    categories: ["AdTech"],
    links: [],
    period: "Aug 2021 - Dec 2022",
  },
  {
    id: "talkinto",
    name: "TalkInto - Omnichannel Messaging Platform",
    description:
      "Messaging/voice backbone powering products like Hammer, Bullpen, and Text2Buy: SMS, voice, Marketplace chat, and web chat with clean agent UI and APIs. Features included local numbers, call recording, and routing.",
    impact: [
      "Omnichannel: SMS, voice, Marketplace chat, web chat",
      "Powers multiple business domains and products",
    ],
    tech: ["Elixir", "Phoenix", "PostgreSQL", "Terraform", "Kubernetes"],
    categories: ["AdTech"],
    links: [],
    period: "Aug 2018 - Dec 2022",
  },

  // Open Source
  {
    id: "sage",
    name: "Sage - Sagas Pattern in Elixir",
    description:
      "Dependency-free implementation of the Sagas pattern for distributed transactions with explicit compensation. Guarantees that either all transactions complete successfully, or compensating transactions amend partial execution.",
    impact: [
      "957 GitHub stars",
      "1.83M+ all-time downloads on Hex.pm",
      "Presented at Code BEAM STO",
    ],
    tech: ["Elixir", "Distributed Systems"],
    categories: ["Open Source"],
    links: [
      {
        type: "github",
        url: "https://github.com/Nebo15/sage",
        label: "GitHub",
      },
      {
        type: "article",
        url: "/blog/introducing-sage",
        label: "Read article",
      },
    ],
    period: "2018 - Present",
    relatedPostIds: ["introducing-sage"],
  },
  {
    id: "logger-json",
    name: "LoggerJSON",
    description:
      "Structured JSON logging for Elixir with first-class formatters for Google Cloud Logging, Datadog, and Elastic (ECS). Drop-in :logger formatter/handler with runtime config helpers.",
    impact: ["11.2M+ all-time downloads on Hex.pm", "281 GitHub stars"],
    tech: ["Elixir"],
    categories: ["Open Source"],
    links: [
      {
        type: "github",
        url: "https://github.com/Nebo15/logger_json",
        label: "GitHub",
      },
    ],
    period: "2017 - Present",
  },
  {
    id: "confex",
    name: "Confex",
    description:
      "Runtime configuration from environment variables with type casting and adapters (:system, :system_file). 12-factor friendly configuration for Elixir applications.",
    impact: ["6.8M+ all-time downloads on Hex.pm", "306 GitHub stars"],
    tech: ["Elixir"],
    categories: ["Open Source"],
    links: [
      {
        type: "github",
        url: "https://github.com/Nebo15/confex",
        label: "GitHub",
      },
    ],
    period: "2016 - Present",
  },
  {
    id: "elixir-bench",
    name: "Elixir Bench",
    description:
      "Continuous benchmarking platform for the Elixir ecosystem. Automatically runs performance benchmarks on each commit to detect regressions and track language performance improvements over time. Won Spawnfest 2017 and later accepted into Google Summer of Code.",
    impact: [
      "🏆 Spawnfest 2017 Winner",
      "Accepted to Google Summer of Code",
      "Continuous performance tracking for Elixir language",
    ],
    tech: ["Elixir", "Phoenix", "PostgreSQL"],
    categories: ["Open Source"],
    links: [
      {
        type: "github",
        url: "https://github.com/elixir-bench/",
        label: "GitHub",
      },
      {
        type: "website",
        url: "https://spawnfest.github.io/",
        label: "Spawnfest",
      },
      {
        type: "website",
        url: "https://summerofcode.withgoogle.com/archive/2018/projects/4837414216400896",
        label: "Google Summer of Code",
      },
    ],
    period: "Dec 2017",
  },
  {
    id: "annon",
    name: "Annon API Gateway",
    description:
      "Configurable API gateway acting as a reverse proxy with a plugin system (ACL, Auth, Validation, CORS, Idempotency), request/response storage, metrics, management UI, and auth provider. Reduces boilerplate across services.",
    impact: [
      "334 GitHub stars on the core repo",
      "Plugin system: ACL, Auth, Validation, CORS, Idempotency",
      "Management UI and escript for cluster control",
    ],
    tech: ["Elixir", "Phoenix", "AngularJS"],
    categories: ["Open Source"],
    links: [
      {
        type: "github",
        url: "https://github.com/Nebo15/annon.api",
        label: "GitHub",
      },
    ],
    period: "Jun 2016 - 2017",
  },
  {
    id: "ecto-mnesia",
    name: "Ecto Mnesia Adapter",
    description:
      "Ecto adapter for OTP's built-in Mnesia database that works in the same memory space as the application, providing extremely low latency without deploying a separate database.",
    impact: ["247 GitHub stars", "Low-latency in-memory storage via Ecto"],
    tech: ["Elixir", "Ecto", "Mnesia", "OTP"],
    categories: ["Open Source"],
    links: [
      {
        type: "github",
        url: "https://github.com/Nebo15/ecto_mnesia",
        label: "GitHub",
      },
    ],
    period: "Sep 2016 - Dec 2016",
  },
  {
    id: "gandalf",
    name: "Gandalf - Decision Engine",
    description:
      "Open-source decision engine for big data with UI for rule tables, champion/challenger split testing, revision history, decision analytics, and debugging tools. Includes SaaS role model and OAuth 2.0.",
    impact: [
      "100+ stars across components",
      "Split testing, revision history, and decision analytics",
    ],
    tech: ["PHP", "AngularJS", "MySQL"],
    categories: ["Open Source", "FinTech"],
    links: [
      {
        type: "github",
        url: "https://github.com/Nebo15/gandalf.api",
        label: "GitHub",
      },
    ],
    period: "Feb 2016 - May 2017",
  },
  {
    id: "man",
    name: "Man - Template Rendering Engine",
    description:
      "Stores iex, mustache, or markdown templates and renders them with localization to HTML or PDF via REST JSON API. Includes an easy-to-use management UI. Free one-click deployment to Heroku.",
    impact: [
      "Renders iex, mustache, markdown to HTML/PDF",
      "REST JSON API with management UI",
    ],
    tech: ["Elixir", "Phoenix", "AngularJS"],
    categories: ["Open Source"],
    links: [
      {
        type: "github",
        url: "https://github.com/Nebo15/man.api",
        label: "GitHub",
      },
    ],
    period: "Apr 2017",
  },
  {
    id: "vagrant-box-osx",
    name: "Vagrant Box OS X",
    description:
      "macOS Vagrant boxes for VirtualBox. Run UX tests or build iOS/Mac applications on any machine with a few CLI commands. Used by many teams worldwide, including Boxen.",
    impact: ["980+ GitHub stars"],
    tech: ["Vagrant", "VirtualBox"],
    categories: ["Open Source"],
    links: [
      {
        type: "github",
        url: "https://github.com/AndrewDryga/vagrant-box-osx",
        label: "GitHub",
      },
    ],
    period: "Mar 2014",
  },

  // LegalTech
  {
    id: "contractbook",
    name: "Contractbook",
    description:
      "Built the self-service billing system, B2B API and marketing pipeline that let the business grow.",
    impact: [
      "Billing integrations for B2B clients",
      "API platform for third-party integrations",
      "CRM, BI and marketing tooling to make sure business makes informed decisions based on data",
    ],
    tech: [
      "Elixir",
      "Phoenix",
      "PostgreSQL",
      "Terraform",
      "Kubernetes",
      "BI",
      "CI/CD",
      "Heroku",
    ],
    categories: ["LegalTech"],
    links: [
      {
        type: "website",
        url: "https://contractbook.com/",
        label: "Website",
      },
    ],
    period: "Jul 2017 - Apr 2018",
  },

  // FinTech
  {
    id: "4finance",
    name: "Financial P2P Marketplace",
    description:
      "Architecture and implementation for an institutional P2P lending marketplace for one of Europe's largest lenders ($9B portfolio). Built with robust order-book matching and auditability for regulated workflows.",
    impact: [
      "P2P lending for a $9B portfolio lender",
      "Low-latency order-book matching via Mnesia",
      "Event-driven architecture at scale",
    ],
    tech: [
      "Elixir",
      "Phoenix",
      "PostgreSQL",
      "Mnesia",
      "Kubernetes",
      "RabbitMQ",
    ],
    categories: ["FinTech"],
    links: [],
    period: "Jun 2016 - Feb 2017",
    relatedPostIds: ["p2p-lending-platform"],
  },
  {
    id: "mbill",
    name: "Mbill - P2P Transfers",
    description:
      "P2P transfer service for individuals and small-to-medium online merchants. Create a page for your card and share a link to receive payments. Includes customer cabinet, payment button constructor, and transaction reports.",
    impact: [
      "Card-to-card transfers via shareable links",
      "Payment button constructor for website integrations",
    ],
    tech: ["PHP", "AngularJS", "PostgreSQL"],
    categories: ["FinTech"],
    links: [],
    period: "Oct 2016 - May 2017",
  },
  {
    id: "mastercard-moneysend",
    name: "Mastercard MoneySend",
    description:
      "Front-end application to receive P2P transfers sent via recipient phone number. Country-wide rollout of phone-number-based transfers.",
    impact: ["Country-wide rollout of phone-number-based transfers"],
    tech: ["AngularJS"],
    categories: ["FinTech"],
    links: [],
    period: "Feb 2017 - Apr 2017",
  },
  {
    id: "forza",
    name: "Forza - PayDay Loan Websites",
    description:
      "Front-end, SMS gateway, decision engine, and marketing tools for an online lending originator operating in Moldova, Bosnia, and North Macedonia.",
    impact: [
      "Multi-country launch with shared core and localized front-ends",
      "Reduced time-to-market dramatically",
    ],
    tech: ["PHP", "AngularJS"],
    categories: ["FinTech"],
    links: [
      {
        type: "website",
        url: "https://forza.md/",
        label: "Forza Moldova",
      },
    ],
    period: "Jan 2016 - Feb 2016",
  },
  {
    id: "best-wallet",
    name: "Best Wallet (ex. MBank)",
    description:
      "eWallet cloud for worldwide money transfers. For B2C: pay for 2,700+ services across Russia/CIS, send money to phone numbers, cash out via partnered banks or cards. For B2B: free SaaS white-label eWallets for banks with simple integration.",
    impact: [
      "2,700+ bill-pay services across Russia/CIS",
      "White-label eWallet SaaS for banks",
      "Available on App Store, Google Play, and web",
    ],
    tech: ["PHP", "AngularJS", "Objective-C", "Java", "PostgreSQL"],
    categories: ["FinTech", "Security"],
    links: [
      {
        type: "website",
        url: "http://wallet.best",
        label: "Website",
      },
    ],
    period: "Feb 2014 - 2015",
  },
  {
    id: "ipsp",
    name: "IPSP.com - Payment Pages",
    description:
      "Responsive landing and payment pages for an Internet Payment Service Provider. Improved conversion on payment flows via lighter UI.",
    impact: ["Improved conversion on payment flows"],
    tech: ["PHP", "CSS", "JavaScript", "HTML"],
    categories: ["FinTech"],
    links: [
      {
        type: "website",
        url: "http://ipsp.com",
        label: "Website",
      },
    ],
    period: "Aug 2014",
  },
  {
    id: "ecommpay",
    name: "ECommPay - Mobile App",
    description:
      "iOS and Android business application for partners to manage payment workflows on the go.",
    impact: ["Brought critical KPIs to mobile for faster responses"],
    tech: ["Objective-C", "Java"],
    categories: ["FinTech"],
    links: [],
    period: "Oct 2013",
  },
  {
    id: "autopayment",
    name: "Autopayment",
    description:
      "Automatically pays for bills based on two types of rules: by threshold of supplier balance (e.g., mobile top-up) or on a periodic basis.",
    impact: ["Reduced missed payments through rule-based automation"],
    tech: ["PHP", "MySQL"],
    categories: ["FinTech"],
    links: [],
    period: "Sep 2013",
  },
  {
    id: "mobile-cashier",
    name: "Mobile Cashier",
    description:
      "Turns Android devices into payment terminals for deposits and top-ups across numerous service providers, from cellular carriers to credit card loan repayments.",
    impact: ["Hardware-lite rollout for distributed cash-in networks"],
    tech: ["Java"],
    categories: ["FinTech"],
    links: [],
    period: "Jul 2013",
  },

  // Other
  {
    id: "parasport",
    name: "Parasport - Foundation Portal",
    description:
      "Medium-sized web portal for a foundation supporting Paralympic sport, physical rehabilitation, and social adaptation. Built on October CMS.",
    impact: ["Accessible content management for non-technical editors"],
    tech: ["PHP", "October CMS"],
    categories: ["Other"],
    links: [],
    period: "Dec 2015 - Jan 2016",
  },
  {
    id: "onedayofmine",
    name: "OneDayOfMine",
    description:
      "Storytelling social network that helps see other people's lives through their eyes. Capture moments through the day and share them with descriptions - from special forces in Belarus to a family visit to a film museum in South Korea.",
    impact: [
      "Invented and built Instagram before it existed",
      "Failed at marketing miserabily and learned in the process",
    ],
    tech: ["PHP", "MySQL", "HTML", "JavaScript", "CSS"],
    categories: ["Other"],
    links: [],
    period: "Jun 2012 - Jul 2014",
  },
  {
    id: "l15",
    name: "L15 - Night Club x Coworking",
    description:
      "Experimental mix of coworking space and a night club ('clubworking') in Kyiv. Turned the office into a best-in-class night club and ran terrace events with world-class DJs every weekend for an entire summer.",
    impact: [
      "1,500-person peak events",
      "Created a novel format of club-working",
    ],
    tech: [],
    categories: ["Other"],
    links: [],
    period: "Aug 2014 - May 2016",
  },
  {
    id: "happy-customer",
    name: "Happy Customer",
    description:
      "Outsource project to motivate small and medium-sized businesses to provide better customer service via public feedback and simple tracking.",
    impact: [],
    tech: ["Web", "SQL"],
    categories: ["Other"],
    links: [],
    period: "Jan 2014 - Dec 2014",
  },
  {
    id: "trubrain",
    name: "truBrain 1.0",
    description:
      "An early-stage product that needed help. I took some swings at UX and performance for free because I wanted to see them make it.",
    impact: [],
    tech: ["JavaScript", "CSS"],
    categories: ["Other"],
    links: [],
    period: "Jun 2013 - Sep 2013",
  },
];

export const projectCategories = [
  "All",
  ...Array.from(new Set(allProjects.flatMap((p) => p.categories))).sort(
    (a, b) => {
      if (a === "Other") return 1;
      if (b === "Other") return -1;
      return a.localeCompare(b);
    },
  ),
];

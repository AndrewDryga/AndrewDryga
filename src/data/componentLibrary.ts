export interface ComponentLibraryEntry {
  slug: string;
  href: string;
  label: string;
  title: string;
  description: string;
  command: string;
}

export const componentLibraryEntries: ComponentLibraryEntry[] = [
  {
    slug: "overview",
    href: "/component-library/",
    label: "Overview",
    title: "Overview",
    description:
      "Dev-only directory of the terminal-first patterns available during local development.",
    command: "$ ls -la ./component-library",
  },
  {
    slug: "foundations",
    href: "/component-library/foundations/",
    label: "Foundations",
    title: "Foundations",
    description:
      "Typography, spacing, breakpoints, accessibility, and color primitives that underpin the terminal theme.",
    command: "$ tree design",
  },
  {
    slug: "layouts",
    href: "/component-library/layouts/",
    label: "Layouts",
    title: "Layout patterns",
    description:
      "Hero shells, navigation blocks, and footer templates tuned for the terminal aesthetic.",
    command: "$ tree layouts",
  },
  {
    slug: "components",
    href: "/component-library/components/",
    label: "Components",
    title: "Components",
    description:
      "Buttons, cards, badges, menus, and keyboard affordances ready for copy-paste without React.",
    command: "$ ls components/ui",
  },
  {
    slug: "forms",
    href: "/component-library/forms/",
    label: "Forms",
    title: "Form patterns",
    description:
      "Validated inputs, field groups, and inline scripts that highlight Astro-friendly form handling.",
    command: "$ node forms/demo.ts",
  },
  {
    slug: "states",
    href: "/component-library/states/",
    label: "States",
    title: "States & feedback",
    description:
      "Loading skeletons, empty states, error fallbacks, and progress indicators.",
    command: "$ cat states.md",
  },
  {
    slug: "data",
    href: "/component-library/data/",
    label: "Data",
    title: "Data & docs",
    description:
      "Summary tables, pagination controls, documentation blocks, and terminal-ready data displays.",
    command: "$ viz data",
  },
  {
    slug: "tui",
    href: "/component-library/tui/",
    label: "TUI",
    title: "TUI elements",
    description:
      "Status bars, command palettes, context menus, and terminal shells inspired by modern terminals.",
    command: "$ tui elements",
  },
  {
    slug: "charts",
    href: "/component-library/charts/",
    label: "Charts",
    title: "Charts & flows",
    description:
      "ASCII pies, sparkline trends, vertical bars, and flow diagrams tuned for terminal dashboards.",
    command: "$ viz charts",
  },
];

export const componentLibraryCards = componentLibraryEntries.filter(
  (entry) => entry.slug !== "overview",
);

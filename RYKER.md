# RYKER.md

Written by Ryker from `ad387b9` on 2026-09-27.

## Purpose

This repository contains Andrew Dryga’s GitHub profile and dryga.com, a personal portfolio and engineering blog for readers, collaborators, and prospective clients. The website uses Astro 6, TypeScript, Tailwind CSS, and MDX, with a terminal-inspired component library and a Cloudflare Worker for contact email and analytics proxying.

## Components

- [README.md](README.md) — GitHub profile with career highlights, selected writing, and contact links.
- [src/](src/) — Active website source; the application’s package and build configuration are at the repository root.
- [src/pages/](src/pages/) — Astro routes for the homepage, blog, projects, tags, component library, feeds, robots, and 404 page.
- [src/content/](src/content/) — MDX collections for blog posts, project details, and testimonials.
- [src/content.config.ts](src/content.config.ts) — Collection loaders and validation schemas, including required blog categories and project IDs.
- [src/components/](src/components/) — Shared layouts, navigation, terminal components, UI primitives, and MDX diagram components.
- [src/component-library/](src/component-library/) — Reusable previews for the component documentation pages.
- [src/data/](src/data/) — Project metadata, technology lists, testimonial loading, and component library navigation.
- [src/lib/blog.ts](src/lib/blog.ts) — Loads blog entries, excludes production drafts, and builds sorted summaries and categories.
- [src/scripts/](src/scripts/) — Browser behavior for navigation and Mixpanel analytics.
- [src/utils/shortcuts.ts](src/utils/shortcuts.ts) — Shared keyboard shortcut handling.
- [src/styles/global.css](src/styles/global.css) — Global styles, semantic design tokens, fonts, and reduced-motion handling.
- [public/](public/) — Static fonts, images, icons, downloadable CV, LLM index, and HTTP header rules.
- [scripts/](scripts/) — Utilities for full-site text exports, icon generation, and the component library smoke check.
- [worker/index.ts](worker/index.ts) — Serves static assets, sends contact email through Resend, proxies Mixpanel requests, and redirects the sitemap URL.
- [wrangler.jsonc](wrangler.jsonc) — Configures the Cloudflare Worker entry point and binds dist as static assets.
- [astro.config.mjs](astro.config.mjs) — Sets the site URL, MDX, sitemap, critical CSS integration, prefetching, and syntax highlighting.
- [tailwind.config.ts](tailwind.config.ts) — Defines the shared Tailwind theme and animation configuration.
- [.github/workflows/ci.yml](.github/workflows/ci.yml) — Runs dependency installation, Astro checks, TypeScript checks, and a build on pull requests and main pushes.
- [astro/](astro/) — Contains tracked generated Astro metadata rather than a separate application.

## Build, test and run

- `npm ci` — Installs locked dependencies from the repository root; CI uses Node.js 22. From [.github/workflows/ci.yml](.github/workflows/ci.yml).
- `npm run dev` — Starts Astro development, normally on port 4321; predev generates a missing public text export using a .llms-cache build. From [package.json](package.json).
- `npm run build` — Builds the static site into dist and refreshes llms-full.txt in dist and public. From [package.json](package.json).
- `npm run preview` — Previews the Astro build locally; this does not start the Cloudflare Worker. From [package.json](package.json).
- `npm run check` — Runs Astro diagnostics; required by CI. From [package.json](package.json).
- `npm run typecheck` — Runs TypeScript without emitting files; required by CI, but the configured include paths omit worker. From [package.json](package.json).
- `npm run lint` — Runs ESLint with the root Astro and TypeScript configuration; not included in CI. From [package.json](package.json).
- `npm run format` — Formats files in place with Prettier. From [package.json](package.json).
- `npm run smoke:component-library` — Starts development on port 43210 and checks that /component-library/ responds successfully with its expected heading. From [package.json](package.json).
- `npm run generate:llms-full` — Exports existing dist HTML to plain text; skips when all export targets exist unless LLMS_FORCE_REBUILD is true. From [package.json](package.json).

## Deploy and release

- Pull requests and pushes to main run checks and build under Node.js 22. This workflow contains no deployment step. From [.github/workflows/ci.yml](.github/workflows/ci.yml).
- The older deployment guide describes Cloudflare Pages with npm run build and dist as output, plus PUBLIC_MIXPANEL_TOKEN in the deployment environment. From [src/README.md](src/README.md).
- Current configuration defines a Worker named andrewdryga using worker/index.ts and the dist directory through the ASSETS binding; the deployment trigger is not defined here. From [wrangler.jsonc](wrangler.jsonc).
- The deployed contact endpoint requires RESEND_API_KEY to send email through Resend; provisioning instructions are absent. From [worker/index.ts](worker/index.ts).

## Conventions

- Reuse existing UI components and Button variants; document new patterns in the component library. From [AGENTS.md](AGENTS.md).
- Use semantic HSL color tokens, terminal-style borders, and the Tailwind 4px spacing scale. From [AGENTS.md](AGENTS.md).
- Use monospace for technical content and buttons, and sans-serif for prose and headings. From [AGENTS.md](AGENTS.md).
- Keep animations in the shared Tailwind configuration, use short transitions, and respect reduced motion. From [AGENTS.md](AGENTS.md).
- Preserve keyboard access and focus rings, label controls, associate form help and errors, and maintain at least 7:1 text contrast. From [AGENTS.md](AGENTS.md).
- Validate responsive layouts from sm through xl; provide hover and focus states for interactive elements. From [AGENTS.md](AGENTS.md).
- Use terse developer-oriented labels and error messages without exclamation marks or decorative emojis. From [AGENTS.md](AGENTS.md).
- Keep analytics within the existing Mixpanel setup and its Do Not Track guard. From [AGENTS.md](AGENTS.md).
- Name components in PascalCase; place shared utilities in src/lib or src/utils with camelCase exports. From [AGENTS.md](AGENTS.md).
- Keep Astro script tags at template top level; move complex logic into shared helpers. From [AGENTS.md](AGENTS.md).
- Use shortcut buttons only for commands actually wired through the shared shortcut utility. From [AGENTS.md](AGENTS.md).

## Where to look

- Change homepage content or the contact form: [src/pages/index.astro](src/pages/index.astro)
- Write or edit a blog post: [src/content/blog/](src/content/blog/)
- Check required MDX frontmatter: [src/content.config.ts](src/content.config.ts)
- Change project metadata and listing visibility: [src/data/projects.ts](src/data/projects.ts)
- Add project detail prose with a matching projectId: [src/content/projects/](src/content/projects/)
- Add or reorder testimonials: [src/content/testimonials/](src/content/testimonials/)
- Find reusable UI primitives: [src/components/ui/](src/components/ui/)
- Document or inspect design patterns: [src/pages/component-library/](src/pages/component-library/)
- Add diagrams to MDX content: [src/components/mdx/SequenceDiagram/](src/components/mdx/SequenceDiagram/)
- Change global metadata, canonical URLs, or font loading: [src/components/BaseLayout.astro](src/components/BaseLayout.astro)
- Change analytics behavior or session replay sampling: [src/scripts/mixpanel.ts](src/scripts/mixpanel.ts)
- Change contact delivery or analytics proxying: [worker/index.ts](worker/index.ts)
- Change security headers or caching rules: [public/_headers](public/_headers)
- Change the generated full-site text export: [scripts/generate-llms-full.mjs](scripts/generate-llms-full.mjs)

## Open questions

- Is production deployed through Cloudflare Workers or the older documented Pages setup, and who owns the deployment trigger and verification steps?
- How should contributors provision RESEND_API_KEY and run the Worker locally to verify contact email and the analytics proxy?
- What validation is expected beyond CI and the component library smoke check? No npm test script exists, and the Worker is outside the current TypeScript check.

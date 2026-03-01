# dryga.com — Astro workspace

This directory contains the new Astro 4 site for dryga.com. It preserves the existing visual design while moving the stack to a fast, content‑first, SSG‑first architecture with minimal JS by default.

Key goals:
- Design parity with the current site (tokens, typography, animations).
- Content-first blog using Astro Content Collections (MD/MDX).
- SEO- and LLM-friendly pages with JSON-LD, feeds, sitemap, robots.
- Performance-first delivery with @astrojs/image, minimal JS, and self-hosted fonts.
- Host on Cloudflare Pages.

Note: This Astro app is currently scaffolded side-by-side. You can iterate here until you’re ready to cut over.

---

## Quick start

1) Install dependencies
- From this directory:
  - npm install

2) Develop
- npm run dev
- Open http://localhost:4321

3) Build and preview
- npm run build
- npm run preview

4) Type checks
- npm run check
- npm run typecheck

5) Format (Prettier)
- npm run format

Linting: A lint script exists, but an ESLint config has not been added yet in this workspace.

---

## Project structure

- astro/
  - astro.config.mjs — Integrations: Tailwind, React (for small islands), MDX, Sitemap, Image
  - package.json — Scripts: dev, build, preview, check, typecheck, format
  - postcss.config.cjs — Tailwind + Autoprefixer
  - tailwind.config.ts — Tokens, animations, typography plugin
  - tsconfig.json — Strict TS + path aliases
  - env.d.ts — Env var typing
  - public/
    - fonts/ — Place self-hosted WOFF2 fonts here
    - og-default.jpg — Placeholder; replace with the real OG image (1200x630)
    - favicon.ico, icon.svg, apple-touch-icon.png, manifest.webmanifest — add as needed
  - src/
    - components/
      - BaseLayout.astro — Global layout, meta, icons, fonts, Mixpanel (respects Do Not Track)
    - content/
      - config.ts — Content Collections schema (blog)
      - blog/
        - foundations-observability-cost-reliability.mdx — One complete post
        - scaling-teams-without-slowing.mdx — Draft scaffold
        - ship-what-matters-measure-results.mdx — Draft scaffold
        - boring-tech-high-leverage.mdx — Draft scaffold
    - pages/
      - index.astro — Home hero with design parity
      - about.astro — About page with Person JSON-LD
      - 404.astro — Not found
      - blog/
        - index.astro — Blog index with pagination and tag filtering
        - [...slug].astro — Blog post with ToC, Article + Breadcrumb JSON-LD
      - rss.xml.ts — RSS 2.0 feed
      - feed.json.ts — JSON Feed 1.1
      - robots.txt.ts — Robots with sitemap reference
      - sitemap-index.xml — Placeholder note (delete to enable integration output)
    - styles/
      - global.css — Tailwind entry + design tokens and base styles

---

## Environment variables

- PUBLIC_MIXPANEL_TOKEN
  - Client-exposed (prefixed PUBLIC_)
  - Used by BaseLayout to initialize Mixpanel in a privacy-aware way (respects Do Not Track).
  - Do not hardcode. Provide via deployment environment.
- SITE_URL
  - Optional override for server-side feed/robots generation when Astro.site isn’t available.
  - Example: https://dryga.com/

Astro site base URL is set to https://dryga.com/ in astro.config.mjs (used by @astrojs/sitemap, canonical links, etc).

---

## Design system and styling

- Tailwind tokens (HSL) are ported to ensure design parity:
  - Colors (background, foreground, terminal cyan/green/yellow)
  - Radii, gradients, shadows, animations
- Typography
  - Inter (sans), JetBrains Mono (mono)
  - Self-hosted WOFF2 expected in public/fonts:
    - /public/fonts/inter-var.woff2
    - /public/fonts/jetbrains-mono.woff2
  - BaseLayout preloads both. Add the actual files to avoid 404s.
- Animations and utilities
  - Keyframes/animations for fade-in, terminal effects, glow, etc.
  - @tailwindcss/typography enabled for post content (prose/prose-invert).

---

## Content and authoring (blog)

Content Collections schema (src/content/config.ts):

- title: string
- description: string
- publishDate: date
- updatedDate?: date
- tags?: string[]
- heroImage?: image
- draft?: boolean (drafts are excluded in production builds)

Authoring
- Create MDX posts in src/content/blog/*.mdx
- Slug derives from filename (stable permalinks).
- Include a minimal frontmatter:

---
title: "My title"
description: "A concise summary for SEO and feeds"
publishDate: 2025-01-15
updatedDate: 2025-01-20
tags: ["tag1", "tag2"]
draft: false
---

- One complete example post is included.
- Two to three draft scaffolds are included.
- Tag filtering is available on /blog/?tag=tagname

Planned: optional scaffold script to create a new post interactively.

---

## SEO, LLM and structured data

- Canonical URLs and meta tags via BaseLayout
- Open Graph + Twitter defaults; replace /public/og-default.jpg with a branded OG
- JSON-LD:
  - About page: Person
  - Blog post: Article + BreadcrumbList
- Feeds:
  - /rss.xml — RSS 2.0
  - /feed.json — JSON Feed 1.1
- Sitemap:
  - Provided by @astrojs/sitemap based on astro.config.mjs site base.
  - Important: Delete src/pages/sitemap-index.xml to allow the integration to generate the sitemap automatically at build time.
- robots:
  - /robots.txt with a sitemap reference

---

## Images

- @astrojs/image with Sharp is configured
- Use <Image /> for hero/post images
  - AVIF/WebP/PNG with sizes and loading hints to avoid CLS
- Always include width/height or use the Image component for responsive attributes

---

## Analytics (Mixpanel)

- Initialized in BaseLayout using PUBLIC_MIXPANEL_TOKEN
- Respects Do Not Track (DNT)
- Tracks:
  - Page View on load
  - Outbound Link Click (basic)
- Keep analytics minimal and privacy-aware

---

## Accessibility

- Skip to content link
- Focus outlines maintained (design tokens)
- Reduced motion support via prefers-reduced-motion
- Keyboard-first navigation is a priority; the current mobile nav remains static for now (React island can be added if needed)

---

## Deployment (Cloudflare Pages)

- Build command: npm run build
- Output directory: dist
- Environment variables:
  - PUBLIC_MIXPANEL_TOKEN
  - SITE_URL (optional; Astro.site already set to https://dryga.com/, keep sync)
- Caching
  - Static assets: hashed and immutable
  - HTML: default short max-age; consider Cloudflare edge cache config as needed

---

## Migration notes (from Lovable/Vite React to Astro)

What’s preserved
- Visual design: tokens, typography, gradients, animations, hero, terminal aesthetic
- Layout sensibilities: focus on strong content, minimal chroma noise

What’s improved
- Static-first delivery using Astro, reducing JS shipped by default
- Content Collections for blog DX (MD/MDX with type-safe schema)
- SEO/feeds/robots/sitemap integrated and consistent
- Image optimization via @astrojs/image
- Self-hostable fonts for CLS control

React islands
- The current build keeps pages static by default.
- If/when needed, introduce small React islands (e.g., mobile nav) with client:load/visible/media.

Cleanup (post-cutover)
- Remove unused Lovable/shadcn/Radix UI components from the old stack as you port features.
- Keep only assets required for parity.

---

## Roadmap / TODO

- Fonts: add Inter and JetBrains Mono WOFF2 files to public/fonts
- Replace og-default.jpg with a branded OG image
- Delete src/pages/sitemap-index.xml to enable auto-generated sitemap
- Add ESLint config for this workspace and enable npm run lint
- Optional: Pagefind search
- Optional: Analytics switch or server-side proxy if desired
- Testing:
  - Add Playwright visual baselines for Home, Blog index, Post, About, 404, nav states
  - Add basic accessibility checks in CI
- Security:
  - Add public/_headers with CSP, HSTS, Referrer-Policy, etc.
- CI:
  - typecheck, build, (future) lint and tests on PRs

---

## License

Proprietary — personal website. See repository root for details if present.
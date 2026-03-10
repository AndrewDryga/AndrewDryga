# Design System Documentation

## Overview

This is a **terminal-inspired, developer-focused design system** built with React, TypeScript, Tailwind CSS, and Radix UI. The aesthetic combines the minimalism and precision of command-line interfaces with modern web design principles.

## Core Design Principles

### 1. Clarity through Minimalism
- Clean, uncluttered interfaces with purposeful white space
- Every element serves a function
- Typography and spacing create clear visual hierarchy

### 2. Terminal Authenticity
- Monospace fonts (`JetBrains Mono`) for code and technical content
- Command-line inspired interactions (prompts, spinners, progress bars)
- Terminal color palette (cyan, green, yellow) used consistently
- Dark backgrounds with high-contrast text

### 3. Functional Aesthetics
- Borders and outlines define component boundaries
- Hover states provide clear feedback
- Animations are subtle and purposeful (100-300ms range)
- Components look "developer-made" rather than overly polished

### 4. Consistent Rhythm
- Standardized spacing scale (4px base unit via Tailwind)
- Predictable component sizing and padding
- Typography scale follows clear hierarchy

---

## Color System

All colors use **HSL format** for consistency and ease of manipulation.

### Semantic Color Tokens

| Token | HSL Value | Usage |
|-------|-----------|-------|
| `--background` | `220 15% 8%` | Main background |
| `--foreground` | `180 100% 90%` | Primary text |
| `--card` | `220 15% 10%` | Card backgrounds |
| `--primary` | `180 100% 50%` | Primary actions, links (cyan) |
| `--secondary` | `60 100% 50%` | Secondary actions, highlights (yellow) |
| `--accent` | `120 100% 50%` | Success states, accents (green) |
| `--destructive` | `0 84.2% 60.2%` | Error states, destructive actions (red) |
| `--muted` | `220 15% 15%` | Disabled states, subtle backgrounds |
| `--border` | `180 100% 50%` | All borders use primary cyan |

### Terminal-Specific Colors

| Token | HSL Value | Usage |
|-------|-----------|-------|
| `--terminal-cyan` | `180 100% 50%` | Terminal prompts, primary terminal text |
| `--terminal-green` | `120 100% 50%` | Success messages, file/directory indicators |
| `--terminal-yellow` | `60 100% 50%` | Warnings, secondary highlights |
| `--terminal-surface` | `220 15% 12%` | Terminal component backgrounds |

### Usage Guidelines

- **Always use semantic tokens** (e.g., `bg-primary`, `text-accent`) rather than hardcoded colors
- **Primary cyan** is the signature color—use it for interactive elements, borders, and key CTAs
- **Green** indicates success, completion, or positive states
- **Yellow** indicates warnings or secondary importance
- **Red (destructive)** is reserved for errors and destructive actions

---

## Typography

### Font Families

- **Monospace**: `JetBrains Mono` (or fallback to system mono)
  - Used for: code blocks, terminal components, technical data, commands
  - Applied via: `font-mono` class

- **Sans-serif**: `Inter` (or fallback to system sans)
  - Used for: body text, headings, UI labels
  - Applied via: `font-sans` class (default)

### Type Scale

| Element | Classes | Usage |
|---------|---------|-------|
| Page Title (h1) | `text-5xl font-bold` | Main page headings |
| Section Title (h2) | `text-3xl font-bold` | Major section headings |
| Subsection Title (h3) | `text-2xl font-bold` | Subsection headings |
| Body Text | `text-base` | Default paragraph text |
| Small Text | `text-sm` | Captions, helper text, form labels |
| Tiny Text | `text-xs` | Sequence diagram labels, fine print |

### Typography Rules

1. **Always pair font family with context**:
   - Use `font-mono` for anything code-related or terminal-inspired
   - Use `font-sans` (or default) for prose and UI text

2. **Hierarchy through size and weight**:
   - Titles: `font-bold`
   - Body: `font-normal`
   - Subtle text: `text-muted-foreground`

3. **Spacing**:
   - Headings: `mb-4` or `mb-6` depending on context
   - Paragraphs: `mb-4` or `mb-6`
   - Sections: `mb-24` for major sections, `mb-16` for subsections

---

## Spacing System

Uses Tailwind's standard 4px-based spacing scale.

### Common Spacing Patterns

| Context | Class | Value |
|---------|-------|-------|
| Component padding (small) | `p-4` | 16px |
| Component padding (medium) | `p-6` | 24px |
| Component padding (large) | `p-8` | 32px |
| Section bottom margin | `mb-24` | 96px |
| Subsection bottom margin | `mb-16` | 64px |
| Element bottom margin | `mb-4` or `mb-6` | 16px or 24px |
| Element gap (flex/grid) | `gap-4` or `gap-6` | 16px or 24px |

### Semantic Spacing

- **Major section spacing**: `mb-24` between top-level sections
- **Card padding**: `p-6` for standard cards
- **Button padding**: `px-6 py-3` for medium buttons
- **Form spacing**: `space-y-4` for form fields

---

## Component Patterns

### Buttons

**Standard Button Structure**:
```tsx
<button className="px-6 py-3 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 rounded font-mono">
  Button Text
</button>
```
- Variants live in `src/components/ui/Button.astro` and cover primary, outline, glow, and shortcut use cases. Always use the existing `variant` prop instead of hand-rolling styles.
- `font-mono` is required; buttons emulate terminal keycaps. Keep gap spacing to `gap-2`.
- Hover states must invert foreground/background for outline buttons (`hover:bg-terminal-cyan hover:text-background`).
- Loading affordances should use the spinning Braille character `⣾` inside a `span` with `animate-spin`.

**Rules**
- Always include `border-2` or leverage the `outline-*` variant so border weight matches the CLI aesthetic.
- Keep motion snappy: `transition-all duration-200` on hover, `duration-100` on focus rings.
- Shortcut buttons (`variant="shortcut"`) automatically render keyboard glyphs based on the `shortcut` prop. Only use this variant where the command actually exists and is wired via `utils/shortcuts.ts`.

### Cards

- Base component is `src/components/ui/Card.astro` plus header/footer exports.
- Apply `border border-border rounded-lg bg-card p-6` for standard cards; drop to `p-4` only for constrained spaces.
- Hover affordance: add `transition-all duration-200 hover:border-primary hover:shadow-glow`. Never use drop shadows that are not cyan-tinted.
- When cards contain terminal content, nest a `div` with `bg-terminal-surface border border-terminal-cyan/40 rounded` to create depth.

```astro
<Card class="border border-border bg-card p-6 transition-all duration-200 hover:border-primary hover:shadow-glow">
  <CardHeader class="mb-4">
    <CardTitle class="font-sans text-foreground">Deploy Preview</CardTitle>
    <CardDescription class="font-mono text-muted-foreground text-sm">
      git push origin main
    </CardDescription>
  </CardHeader>
  <CardContent class="space-y-4">
    <TerminalPrompt command="pnpm build" />
    <TerminalProgressBar value={72} label="Bundling" />
  </CardContent>
</Card>
```

### Terminal Components

- `TerminalPrompt.astro`
  - Props: `command`, optional `color` (`cyan` | `green` | `yellow` | `primary`).
  - Use before narrative sections or code blocks to introduce context.
  - Combine with `animate-terminal-typing` to simulate typed commands.
- `TerminalProgressBar.astro`
  - Fixed 24-character bar (`█`/`░`), auto-clamps values. For live progress, wrap in an island and stream value changes.
- `TerminalSpinner.astro`
  - Variants: `blocks`, `dots`, `cursor`, `pulse`. Respect reduced motion by suspending animation when `prefers-reduced-motion` is set.
- Compose terminal elements inside containers with `bg-terminal-surface rounded-md border border-terminal-cyan/40 px-4 py-3`.

```astro
<div class="bg-terminal-surface border border-terminal-cyan/40 rounded-md p-4 space-y-3">
  <TerminalPrompt command="deploy --target production" />
  <TerminalSpinner type="blocks" text="Processing..." class="text-terminal-cyan" />
</div>
```

### Forms

- Inputs live in `src/components/ui/Input.astro`, `Textarea.astro`, and friends.
- Wrap fields with `FormField.astro` to gain consistent label spacing and error messaging.
- Inputs must use `font-mono`, `border border-input`, `bg-background`, and `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`.
- Validation errors: `text-destructive` and add `border-destructive` to the input. Provide helper text via `FormField.Description`.
- Keep vertical rhythm with `space-y-4`; group sections with `space-y-6`.

```astro
<form class="space-y-6">
  <FormField>
    <FormField.Label class="text-sm font-medium text-foreground">Email</FormField.Label>
    <Input type="email" placeholder="~/> user@domain.dev" required />
    <FormField.Description class="text-xs text-muted-foreground">
      We never send spam - only deploy logs.
    </FormField.Description>
  </FormField>
</form>
```

### Sequence Diagrams

- Component family lives under `src/components/mdx/SequenceDiagram/` and is re-exported from `@/components/mdx/SequenceDiagram`.
- `Participants.astro`, `Participant.astro`, `Messages.astro`, `Message.astro`, and `SelfCall.astro` provide semantic sub-slots; combine them exactly as shown in the component library demos.
- Participants sit at 15% / 85% positions; adjust via CSS variables (`--participant-left`, `--participant-right`) if needed.
- Lifelines are dashed, `border-terminal-cyan/40`. Extend to bottom minus `24px` padding.
- Use semantic message types:
  - `type="request"` → cyan solid arrow (→)
  - `type="response"` → yellow dashed arrow (←)
  - `type="async"` → green dashed arrow (→)
  - `type="error"` → red dashed arrow (←)
- Notes render with `bg-terminal-surface` and `text-muted-foreground`; position via `position="center" | "left" | "right"`.

### Animation Principles

- Keyframes live in `tailwind.config.ts`. Do not redefine animations per component; extend enums under `theme.extend.animation`.
- Timing:
  - Fast (100–200 ms): hover and focus transitions.
  - Medium (300–500 ms): section reveals (`animate-fade-in`, `animate-terminal-load`).
  - Long (800 ms+): accent effects (`animate-border-glow-pulse`), use sparingly.
- Entrance animations use `ease-out`; looping animations use `ease-in-out`.
- Reduce-motion handling is already in `src/styles/global.css`. Wrap animation-heavy islands with `data-animate="false"` fallback if you add custom JS.

### Layout Patterns

- Containers: `container mx-auto px-4 py-12 max-w-6xl`. Narrow content uses `max-w-4xl`, dashboards `max-w-7xl`.
- Grid systems:
  - Two-column: `grid md:grid-cols-2 gap-6`
  - Three-column: `grid md:grid-cols-3 gap-6`
  - Auto cards: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Flex stacks:
  - Horizontal: `flex items-center gap-4`
  - Split: `flex justify-between items-center`
  - Center: `flex items-center justify-center`
- Section rhythm: `py-12` per section; `mb-24` between major sections, `mb-12` between subsections.

### Voice & Microcopy

- Use developer-centric phrasing: “$ deploy --production”, “Retry build”.
- Buttons are single words or terse verb phrases (`Deploy`, `Open logs`).
- Error copy: “Connection failed. Retry?” — no exclamation marks, no conversational filler.
- Success copy: “Deployed to production” (no emojis).

### Accessibility Requirements

- Keyboard: All interactive elements must be reachable; components already expose `focus-visible` rings. Do not strip them.
- Color contrast: Keep minimum 7:1 for text/background. Use `text-muted-foreground` for secondary copy to maintain contrast.
- Never rely on color alone; pair warnings with iconography (`TerminalPrompt` w/ `color="yellow"` plus text).
- Provide `aria-label` on icon-only buttons (e.g., `Button variant="icon"`).
- Forms: always label inputs and associate helper/error text via `aria-describedby`.
- Respect reduced motion (see animations) and avoid animating more than three properties simultaneously.

### Analytics

- Mixpanel bootstrap lives in `src/scripts/mixpanel.ts`; the layout emits the required `mixpanel-token` and `astro-dev` meta tags (src/components/BaseLayout.astro:59-60).
- Fire screens with `mixpanel.track("Page View")` already wired in the script; use the exported helper for additional events rather than creating new instances.
- Respect DNT: the helper aborts when `doNotTrack` flags are set—do not add tracking outside this guard.

### File Organization

```
src/
├── components/          # Astro components and UI primitives
│   ├── ui/              # Shadcn-derived terminals styled to match tokens
│   ├── TerminalPrompt.astro
│   ├── SectionHeader.astro
│   ├── CodeExample.astro
│   ├── DoAndDont.astro
│   └── TerminalProgressBar.astro
├── component-library/   # Live previews for documentation pages
├── data/                # Structured content (JSON/TS)
├── pages/               # Astro routes (`index.astro`, blog, component library)
├── scripts/             # Build-time utilities
├── styles/global.css    # Design tokens, base layers
└── utils/               # Shared helpers (`shortcuts.ts`)
```

- Keep new components in `src/components/` with PascalCase names.
- Store MDX content under `src/content` or `src/pages/blog`.
- Utilities belong in `src/lib` or `src/utils` (camelCase exports).

### Summary Checklist

- ✅ Ensure design consistency by reusing existing components even as part of other components
- ✅ Before building something new check if there is an existing component for it
- ✅ Semantic color tokens only (no hardcoded hex)
- ✅ Spacing follows Tailwind 4px rhythm (`mb-4`, `gap-6`, `p-6`)
- ✅ Hover + focus states present on every interactive element
- ✅ Typography matches context (`font-mono` for technical, `font-sans` for headings)
- ✅ Animations reuse shared keyframes and respect reduced motion
- ✅ Accessibility (focus rings, contrast, aria labels) verified
- ✅ Terminal aesthetic reinforced via borders, prompts, and copy
- ✅ Responsive layout validated from `sm` through `xl`
- ✅ Document new patterns in the component library after implementation

## Dev Notes

- Astro expects `<script>` tags to be top-level nodes in the template tree. Emitting them from within JSX-style expressions (ternaries, variables, etc.) causes the compiler to feed esbuild partial tokens, which surfaces as parses like `Expected ">" but found "is/data"`. Keep component-side scripts top-level (or inject via `set:html`) and push complex logic into a shared helper instead.
- Shortcut overlay toggles respond to `⌘⇧/` (aka `cmd+?`) on macOS and fall back to `Ctrl+Shift+/` on other keyboards. If nothing happens, open DevTools to inspect the `[Button]` debug logs—they’ll report whether the combo was ignored or no buttons registered / annotated with `data-shortcut-canonical`.

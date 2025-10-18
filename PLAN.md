# Design System Audit Plan

## Immediate Bugs
- [x] Ship or reference the correct touch icon; the layout now points to an actual `/apple-touch-icon.png` copy so Lighthouse no longer 404s (src/components/BaseLayout.astro:81, public/apple-touch-icon.png).
- [x] Replace hardcoded `#0b0f14` values for theme/meta colors and MDX code blocks with token-driven equivalents to stay aligned with the HSL palette (src/components/BaseLayout.astro:43-44, src/pages/blog/[...slug].astro:158).

## High-Priority Tech Debt
- [x] Refactor marketing CTAs to consume `src/components/ui/Button.astro`, keeping hover/spacing/typography consistent with the design system (src/pages/index.astro:38-117).
- [x] Align card headings with typography rules—hero metric cards now use `font-sans` rather than `font-mono` (src/pages/index.astro:165,198,232).
- [x] Solidify mobile navigation accessibility with unique IDs, focus trapping, and focus restoration when the panel closes (src/components/MobileNav.astro:14-115).

## Medium-Priority Improvements
- [x] Audit inline Tailwind colors and migrate non-token hues (e.g., `bg-black`, bespoke RGBA glows) to semantic token expressions (src/pages/index.astro:259, src/pages/projects/[id].astro:175,404).
- [~] Expand reduced-motion support by guarding long-running animations with `motion-safe:` utilities; the hero + stat cards are updated, but remaining pages still need review (src/pages/index.astro:24,143,176,209).
- [x] Add regression coverage for the component-library route via a smoke script that boots `astro dev` and asserts the gallery renders (scripts/smoke-component-library.mjs, package.json:scripts.smoke:component-library).

## Low-Priority / Future Enhancements
- [x] Document the Mixpanel integration contract in the design system docs to keep analytics consistent (AGENTS.md:219-226).
- [ ] Explore packaging terminal primitives (`TerminalPrompt`, `TerminalProgressBar`, `TerminalSpinner`) into MDX shortcodes to reduce copy/paste drift (src/components/TerminalPrompt.astro:1-40, src/components/TerminalProgressBar.astro:1-60, src/components/TerminalSpinner.astro:1-60).
- [ ] Investigate automated accessibility checks (e.g., Pa11y/Cypress axe) across hero, forms, and terminal components to ensure future changes respect the focus/contrast rules outlined in AGENTS.md.

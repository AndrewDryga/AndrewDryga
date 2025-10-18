import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Make @shikijs/twoslash optional to avoid crashes when the package isn't installed.
// Use a dynamic import with a non-literal specifier to prevent build-time resolution.
const TWOSLASH_PKG = "@shikijs/twoslash";

let twoslashTransformer = null;
try {
  const mod = await import(TWOSLASH_PKG);
  if (mod?.transformerTwoslash) {
    twoslashTransformer = mod.transformerTwoslash();
  }
} catch {
  // Silently ignore if @shikijs/twoslash is not installed
}

export default defineConfig({
  site: "https://dryga.com/",
  prefetch: true,
  integrations: [tailwind(), mdx(), sitemap()],

  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
      langs: [
        "elixir",
        "bash",
        "shell",
        "hcl",
        "json",
        "yaml",
        "toml",
        "tsx",
        "ts",
        "js",
      ],
      transformers: twoslashTransformer ? [twoslashTransformer] : [],
    },
  },
});

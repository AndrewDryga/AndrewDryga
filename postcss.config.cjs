/** PostCSS config for Astro build.
 *  - Uses Tailwind CSS with the colocated Tailwind config (TypeScript)
 *  - Autoprefixer for cross-browser CSS
 *
 *  This file lives in: astro/postcss.config.cjs
 *  Tailwind config path: astro/tailwind.config.ts
 */

/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [
    require('tailwindcss')({
      // Explicitly point to the TS Tailwind config in this Astro workspace
      config: './tailwind.config.ts',
    }),
    require('autoprefixer'),
  ],
};

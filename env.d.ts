/// <reference path="./.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "*.astro" {
  const component: import("astro").AstroComponentFactory;
  export default component;
}

/**
 * Extend Vite/ Astro environment variable types.
 *
 * Notes:
 * - Variables prefixed with PUBLIC_ are exposed to the client.
 * - Non-PUBLIC variables are only available on the server (endpoints, build).
 */
interface ImportMetaEnv {
  /**
   * Public Mixpanel token used by BaseLayout for analytics (respects DNT).
   * Provide via deployment environment variables.
   */
  readonly PUBLIC_MIXPANEL_TOKEN?: string;

  /**
   * Optional site base URL override, used server-side for feeds/robots when Astro.site
   * is not available. Example: "https://dryga.com/"
   */
  readonly SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

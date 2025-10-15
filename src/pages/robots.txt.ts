import type { APIRoute } from "astro";

export const prerender = true;

const SITE_FALLBACK = "https://dryga.com/";

export const GET: APIRoute = async ({ site }) => {
  // Prefer site from astro.config, fallback to env, then hardcoded domain
  const siteUrl =
    (site?.toString() ?? import.meta.env.SITE_URL?.toString()) ?? SITE_FALLBACK;

  const sitemap = new URL("/sitemap-index.xml", siteUrl).toString();

  const body = [
    "# robots.txt for dryga.com",
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${sitemap}`,
    "",
  ].join("\n");

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Cacheable, refresh hourly at browser, daily at edge
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
};

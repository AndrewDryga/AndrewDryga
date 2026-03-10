import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

const SITE_FALLBACK = "https://dryga.com/";

function xmlEscape(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const GET: APIRoute = async ({ site }) => {
  // Resolve site URL
  const siteUrl =
    site?.toString() ?? import.meta.env.SITE_URL?.toString() ?? SITE_FALLBACK;

  // Load blog posts (exclude drafts in production)
  const posts = await getCollection(
    "blog",
    ({ data }: CollectionEntry<"blog">) =>
      import.meta.env.PROD ? !data.draft : true,
  );

  // Sort by publishDate DESC
  const sorted = posts
    .slice()
    .sort((a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) => {
      const at = a.data.publishDate?.getTime?.() ?? 0;
      const bt = b.data.publishDate?.getTime?.() ?? 0;
      return bt - at;
    });

  // Determine lastBuildDate from the latest post date (or now)
  const lastDate =
    sorted[0]?.data.publishDate ?? sorted[0]?.data.updatedDate ?? new Date();

  const channelTitle = "Andrew Dryga - Blog";
  const channelDescription =
    "Articles on engineering leadership, reliability, and building cost-sane, observable platforms.";
  const channelLink = new URL("/blog/", siteUrl).toString();
  const selfLink = new URL("/rss.xml", siteUrl).toString();
  const imageUrl = new URL("/og-default.jpg", siteUrl).toString();

  // Build items
  const itemsXml = sorted
    .map((post: CollectionEntry<"blog">) => {
      const title = xmlEscape(post.data.title);
      const description = post.data.description ?? "";
      const link = new URL(`/blog/${post.id}/`, siteUrl).toString();
      const guid = link;
      const pubDate = (
        post.data.publishDate ??
        post.data.updatedDate ??
        new Date()
      ).toUTCString();

      const categories =
        (post.data.tags ?? [])
          .map((t: string) => `<category>${xmlEscape(t)}</category>`)
          .join("") || "";

      // Prefer full content in feeds; rendering MDX to a string isn’t available here,
      // so we include the SEO description and link back to the full article.
      const contentEncoded = `<![CDATA[
<p>${xmlEscape(description)}</p>
<p><a href="${link}">Read the full post →</a></p>
]]>`;

      return [
        "<item>",
        `<title>${title}</title>`,
        `<link>${link}</link>`,
        `<guid isPermaLink="true">${guid}</guid>`,
        `<pubDate>${pubDate}</pubDate>`,
        categories,
        `<description><![CDATA[${description}]]></description>`,
        `<content:encoded>${contentEncoded}</content:encoded>`,
        "</item>",
      ].join("");
    })
    .join("");

  // Build RSS 2.0 with Atom+Content namespaces
  const rss = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">`,
    `<channel>`,
    `<title>${xmlEscape(channelTitle)}</title>`,
    `<link>${channelLink}</link>`,
    `<description>${xmlEscape(channelDescription)}</description>`,
    `<atom:link href="${selfLink}" rel="self" type="application/rss+xml" />`,
    `<lastBuildDate>${lastDate.toUTCString()}</lastBuildDate>`,
    `<language>en-US</language>`,
    `<image><url>${imageUrl}</url><title>${xmlEscape(
      channelTitle,
    )}</title><link>${channelLink}</link></image>`,
    itemsXml,
    `</channel>`,
    `</rss>`,
  ].join("");

  return new Response(rss, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      // Cache at the edge; HTML stays short-lived elsewhere
      "Cache-Control":
        "public, max-age=0, s-maxage=600, stale-while-revalidate=600",
    },
  });
};

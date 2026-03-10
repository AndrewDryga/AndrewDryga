import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

export const prerender = true;

const SITE_FALLBACK = "https://dryga.com/";

/**
 * JSON Feed v1.1 endpoint
 * Spec: https://www.jsonfeed.org/version/1.1/
 */
export const GET: APIRoute = async ({ site }) => {
  // Resolve site URL
  const siteUrl =
    site?.toString() ?? import.meta.env.SITE_URL?.toString() ?? SITE_FALLBACK;

  // Load all blog posts (exclude drafts in production)
  const posts = await getCollection(
    "blog",
    ({ data }: CollectionEntry<"blog">) =>
      import.meta.env.PROD ? !data.draft : true,
  );

  // Sort posts by publishDate desc
  const sorted = posts
    .slice()
    .sort((a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) => {
      const at = a.data.publishDate?.getTime?.() ?? 0;
      const bt = b.data.publishDate?.getTime?.() ?? 0;
      return bt - at;
    });

  const homeUrl = new URL("/", siteUrl).toString();
  const feedUrl = new URL("/feed.json", siteUrl).toString();

  const items = sorted.map((post: CollectionEntry<"blog">) => {
    const url = new URL(`/blog/${post.id}/`, siteUrl).toString();
    const image = post.data.heroImage
      ? new URL(post.data.heroImage.src, siteUrl).toString()
      : undefined;
    const published = post.data.publishDate?.toISOString?.();
    const modified = (
      post.data.updatedDate ?? post.data.publishDate
    )?.toISOString?.();

    // Include a simple content_html with description and a link to the full article
    const description = post.data.description ?? "";
    const content_html = [
      `<p>${escapeHtml(description)}</p>`,
      `<p><a href="${url}">Read the full post →</a></p>`,
    ].join("");

    return {
      id: url, // stable permalink as ID
      url,
      title: post.data.title,
      summary: description,
      content_html,
      date_published: published,
      date_modified: modified,
      image,
      tags: post.data.tags ?? [],
      authors: [
        {
          name: "Andrew Dryga",
          url: new URL("/about", siteUrl).toString(),
        },
      ],
      language: "en-US",
    };
  });

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Andrew Dryga - Blog",
    home_page_url: homeUrl,
    feed_url: feedUrl,
    description:
      "Articles on engineering leadership, reliability, and building cost-sane, observable platforms.",
    icon: new URL("/icon.svg", siteUrl).toString(),
    favicon: new URL("/favicon.ico", siteUrl).toString(),
    language: "en-US",
    authors: [
      {
        name: "Andrew Dryga",
        url: new URL("/about", siteUrl).toString(),
      },
    ],
    items,
  };

  return new Response(JSON.stringify(feed, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=600, stale-while-revalidate=600",
    },
  });
};

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

import { getCollection, type CollectionEntry } from "astro:content";

const isProd = import.meta.env.PROD;

export type BlogEntry = CollectionEntry<"blog">;

export interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishDate: Date;
  updatedDate?: Date;
  readTime?: string;
  cardGradient?: string;
  tags: string[];
  relatedProjects: string[];
  draft: boolean;
  url: string;
}

function mapEntryToSummary(entry: BlogEntry): BlogPostSummary {
  const { data, slug } = entry;
  return {
    slug,
    title: data.title,
    description: data.description,
    category: data.category,
    publishDate: data.publishDate,
    updatedDate: data.updatedDate,
    readTime: data.readTime,
    cardGradient: data.cardGradient,
    tags: data.tags ?? [],
    relatedProjects: data.relatedProjects ?? [],
    draft: data.draft ?? false,
    url: `/blog/${slug}/`,
  };
}

export async function loadBlogEntries(): Promise<BlogEntry[]> {
  return getCollection("blog", ({ data }) => (isProd ? !data.draft : true));
}

export async function loadBlogSummaries(): Promise<BlogPostSummary[]> {
  const entries = await loadBlogEntries();
  return entries
    .map(mapEntryToSummary)
    .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
}

export function getBlogCategories(posts: BlogPostSummary[]): string[] {
  const set = new Set<string>();
  posts.forEach((post) => set.add(post.category));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function formatPublishDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

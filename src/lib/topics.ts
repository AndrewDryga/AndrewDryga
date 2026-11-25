import { getCollection } from "astro:content";
import { allProjects } from "../data/projects";
import { tagSlug } from "./urls";

export async function loadTopics() {
  const posts = await getCollection("blog", ({ data }) => !import.meta.env.PROD || !data.draft);
  const labels = [...posts.flatMap(post => post.data.tags ?? []), ...allProjects.flatMap(project => project.tech)];
  const topics = new Map<string, string>();
  for (const label of labels) {
    const slug = tagSlug(label);
    if (!topics.has(slug)) topics.set(slug, label);
  }
  return topics;
}

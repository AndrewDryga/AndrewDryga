import { getCollection, type CollectionEntry } from "astro:content";

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  relationship: string;
  quote: string;
  linkedinUrl?: string;
  featured: boolean;
  order: number;
  commitHash?: string;
  commitDateISO?: string;
  commitDateLabel?: string;
  branchName?: string;
}

type TestimonialEntry = CollectionEntry<"testimonials">;

function mapEntry(entry: TestimonialEntry): Testimonial {
  const { data, id } = entry;
  const commitDateISO = data.commitDate?.toISOString();
  const commitDateLabel = data.commitDate
    ? data.commitDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      })
    : undefined;

  return {
    id,
    name: data.name,
    title: data.title,
    company: data.company,
    relationship: data.relationship,
    quote: data.quote,
    linkedinUrl: data.linkedinUrl,
    featured: data.featured ?? true,
    order: data.order ?? 0,
    commitHash: data.commitHash,
    commitDateISO,
    commitDateLabel,
    branchName: data.branchName,
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const entries = await getCollection("testimonials");
  return entries
    .map(mapEntry)
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const testimonials = await getTestimonials();
  return testimonials.filter((t) => t.featured);
}

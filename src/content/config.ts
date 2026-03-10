import { defineCollection, z } from "astro:content";

/**
 * Content Collections configuration
 *
 * Blog schema fields (Plan-aligned):
 * - title: string
 * - description: string
 * - publishDate: date
 * - updatedDate?: date
 * - tags?: string[]
 * - heroImage?: image
 * - draft?: boolean
 *
 * Notes:
 * - Slugs are derived from file names by default (permalink stability).
 * - Tags are normalized as strings; keep authoring simple and flexible.
 */
const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1, "title is required"),
      description: z.string().min(1, "description is required"),
      publishDate: z.date(),
      updatedDate: z.date().optional(),
      category: z.string().min(1, "category is required"),
      readTime: z.string().min(1).optional(),
      cardGradient: z.string().min(1).optional(),
      tags: z.array(z.string().min(1)).default([]).optional(),
      heroImage: image().optional(),
      relatedProjects: z.array(z.string().min(1)).default([]).optional(),
      draft: z.boolean().default(false),
    }),
});

const testimonials = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      name: z.string().min(1),
      title: z.string().min(1),
      company: z.string().min(1),
      relationship: z.string().min(1),
      quote: z.string().min(1),
      linkedinUrl: z.string().url().optional(),
      featured: z.boolean().default(true),
      order: z.number().int().nonnegative().default(0),
      commitHash: z.string().min(1).optional(),
      commitDate: z.date().optional(),
      authorEmail: z.string().email().optional(),
      branchName: z.string().min(1).optional(),
    }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      projectId: z
        .string()
        .min(1, "projectId is required - must match the id in projects.ts"),
      title: z.string().min(1).optional(),
      heroImage: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  blog,
  testimonials,
  projects,
};

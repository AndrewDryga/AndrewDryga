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
      tags: z.array(z.string().min(1)).default([]).optional(),
      heroImage: image().optional(),
      relatedProjects: z.array(z.string().min(1)).default([]).optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  blog,
};

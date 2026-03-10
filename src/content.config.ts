import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro:schema";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1, "title is required"),
      shortTitle: z.string().min(1).optional(),
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/testimonials" }),
  schema: () =>
    z.object({
      name: z.string().min(1),
      title: z.string().min(1),
      company: z.string().min(1),
      relationship: z.string().min(1),
      quote: z.string().min(1),
      linkedinUrl: z.url().optional(),
      featured: z.boolean().default(true),
      order: z.number().int().nonnegative().default(0),
      commitHash: z.string().min(1).optional(),
      commitDate: z.date().optional(),
      branchName: z.string().min(1).optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
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

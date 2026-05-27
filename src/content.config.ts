import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    cover: z.string().optional(),
    categories: z.union([z.string(), z.array(z.string())]).optional(),
    tags: z.union([z.string(), z.array(z.string())]).optional(),
    brief: z.string().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    abbrlink: z.union([z.string(), z.number()]).optional(),
    comments: z.boolean().optional(),
    copyright: z.boolean().optional()
  })
});

export const collections = { blog };

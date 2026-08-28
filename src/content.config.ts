import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.union([z.date(), z.string()]).optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    tags: z.union([z.string(), z.array(z.string())]).optional(),
    categories: z.union([z.string(), z.array(z.string())]).optional(),
    cover: z.string().optional(),
    abbrlink: z.string().optional(),
    subtitle: z.string().optional(),
    comments: z.boolean().optional(),
    brief: z.string().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { blog };

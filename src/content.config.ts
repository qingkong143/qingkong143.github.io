import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    description: z.string().optional(),
    cover: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    sticky: z.number().default(0),
    draft: z.boolean().default(false),
    comments: z.boolean().default(true),
    copyright: z.boolean().default(true),
    aside: z.boolean().optional(),
    toc: z.boolean().optional(),
    top_img: z.union([z.string(), z.boolean()]).optional(),
    ai: z.string().optional(),
    main_color: z.string().optional(),
    location: z.string().optional(),
    swiper_index: z.number().optional(),
    top_group_index: z.number().optional(),
    abbrlink: z.union([z.string(), z.number()]).optional(),
    keywords: z.union([z.string(), z.array(z.string())]).optional(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/about" }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

const todo = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/todo" }),
  schema: z.object({
    title: z.string().optional(),
    lastUpdate: z.string().optional(),
  }),
});

export const collections = { posts, about, todo };

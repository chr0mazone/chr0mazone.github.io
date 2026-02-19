import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    // Accepts either a local relative path (./assets/img.png) or an external URL string
    image: z.union([image(), z.string().url()]).optional(),
    draft: z.boolean().default(false),
    // For subposts (index.md files), this indicates total subpost count
    subposts: z.number().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};



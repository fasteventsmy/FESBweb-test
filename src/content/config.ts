import { defineCollection, z } from 'astro:content';

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    brand: z.string(),
    event: z.string(),
    date: z.string().or(z.date()),
    category: z.array(z.string()).default([]),
    location: z.string().optional(),
    thumbnail: z.string().optional(),
  }),
});

export const collections = { work };

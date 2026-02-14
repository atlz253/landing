import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const musicNews = defineCollection({
  loader: glob({ pattern: "*.json", base: "./collections/musicNews" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { musicNews };

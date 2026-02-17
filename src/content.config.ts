import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { newsSchema } from "./features/viewNews/schemas";

const musicNews = defineCollection({
  loader: glob({ pattern: "*.md", base: "./collections/musicNews" }),
  schema: newsSchema,
});

export const collections = { musicNews };

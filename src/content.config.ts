import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { newsSchema } from "./features/viewNews/schemas";
import { projectSchema } from "./features/viewPortfolio/schemas";

const musicNews = defineCollection({
  loader: glob({ pattern: "*.md", base: "./collections/musicNews" }),
  schema: newsSchema,
});

const portfolio = defineCollection({
  loader: glob({ pattern: "*.md", base: "./collections/portfolio" }),
  schema: projectSchema,
});

export const collections = { musicNews, portfolio };

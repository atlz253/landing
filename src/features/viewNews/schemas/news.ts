import { z } from "astro/zod";

export const newsSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
});

export type News = z.infer<typeof newsSchema>;

import { z } from "astro/zod";

export const newsSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  images: z.array(z.string()).optional(),
  yandexVideos: z.array(z.string()).optional(),
  vkVideos: z.array(z.string()).optional(),
  audio: z
    .array(
      z.object({
        src: z.array(z.string()),
        title: z.string().optional(),
      }),
    )
    .optional(),
  previewType: z.enum(["images", "yandexVideos", "text"]).optional(),
});

export type News = z.infer<typeof newsSchema>;

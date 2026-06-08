import { z } from "astro/zod";

const projectCodeLanguageSchema = z.enum(["bash", "c"]);

export const projectSchema = z.object({
  title: z.string(),
  order: z.number(),
  href: z.string().url().optional(),
  description: z.union([z.string(), z.array(z.string())]).optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  items: z
    .array(
      z.object({
        text: z.string(),
        href: z.string().optional(),
      }),
    )
    .optional(),
  code: z
    .object({
      value: z.string(),
      lang: projectCodeLanguageSchema.optional(),
    })
    .optional(),
});

export type Project = z.infer<typeof projectSchema>;

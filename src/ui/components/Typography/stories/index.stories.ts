import type { ComponentProps } from "astro/types";

import TypographyStory from "./TypographyStory.astro";

type TypographyStoryProps = ComponentProps<typeof TypographyStory>;

export default {
  component: TypographyStory,
};

export const Default = {
  args: {} satisfies TypographyStoryProps,
};

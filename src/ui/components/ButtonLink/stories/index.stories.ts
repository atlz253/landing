import type { ComponentProps } from "astro/types";

import ButtonLinkStory from "./ButtonLinkStory.astro";
import ButtonLink from "../index.astro";

type ButtonLinkProps = ComponentProps<typeof ButtonLink>;

export default {
  component: ButtonLinkStory,
};

export const Default = {
  args: {} satisfies ButtonLinkProps,
};

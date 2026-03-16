import type { ComponentProps } from "astro/types";

import ButtonStory from "./ButtonStory.astro";
import Button from "../index.astro";

type ButtonProps = ComponentProps<typeof Button>;

export default {
  component: ButtonStory,
};

export const Default = {
  args: {} satisfies ButtonProps,
};

export const Size1 = {
  args: { size: 1 } satisfies ButtonProps,
};

export const Size2 = {
  args: { size: 2 } satisfies ButtonProps,
};

export const Size3 = {
  args: { size: 3 } satisfies ButtonProps,
};

import type { ComponentProps } from "astro/types";

import Select from "../index.astro";
import SelectStory from "./SelectStory.astro";

type SelectProps = ComponentProps<typeof Select>;

export default {
  component: SelectStory,
};

export const Default = {
  args: {
    placeholder: "Choose an option",
  } satisfies Omit<SelectProps, "id" | "label">,
};

export const Selected = {
  args: {
    value: "first",
  } satisfies Omit<SelectProps, "id" | "label">,
};

export const Disabled = {
  args: {
    disabled: true,
    placeholder: "Choose an option",
  } satisfies Omit<SelectProps, "id" | "label">,
};

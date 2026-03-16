const BUTTON_SIZE_TO_CLASS = {
  1: "button_size1",
  2: "button_size2",
  3: "button_size3",
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZE_TO_CLASS;

export default BUTTON_SIZE_TO_CLASS;

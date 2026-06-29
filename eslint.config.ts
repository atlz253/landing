import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

const {
  recommendedTypeChecked: [tsBase, tsEslintRecommended, tsTypeChecked],
} = tseslint.configs;

export default defineConfig([
  { ignores: ["dist/**", ".astro/**", "node_modules/**", "public/**", "collections/**"] },

  js.configs.recommended,

  {
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
    ...tsBase,
  },

  tsEslintRecommended,

  {
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
    ...tsTypeChecked,
    languageOptions: {
      parserOptions: { projectService: true },
    },
  },

  ...astro.configs.recommended,

  {
    files: ["**/*.astro"],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: { project: true },
    },
  },

  {
    files: ["**/*.astro", "**/*.tsx", "**/*.jsx"],
    ...jsxA11y.flatConfigs.recommended,
  },

  {
    files: ["**/stories/**"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },

  {
    rules: {
      "no-console": "off",
    },
  },
]);

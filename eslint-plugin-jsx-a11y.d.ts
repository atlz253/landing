declare module "eslint-plugin-jsx-a11y" {
  import type { Linter } from "eslint";
  const plugin: {
    configs: Record<string, Linter.Config>;
    flatConfigs: Record<string, Linter.Config>;
  };
  export default plugin;
}

import { defineConfig } from "astro/config";

export default defineConfig({
  image: {
    responsiveStyles: true,
  },
  server: {
    host: true,
  },
});

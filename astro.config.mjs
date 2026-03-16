import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import astrobook from "astrobook";

export default defineConfig({
  image: {
    responsiveStyles: true,
  },
  server: {
    host: true,
  },
  integrations: [
    react(),
    astrobook({ subpath: "/astrobook", css: ["./src/styles/index.css"] }),
  ],
});

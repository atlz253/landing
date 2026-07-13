import { defineConfig } from "astro/config";
import astrobook from "astrobook";

export default defineConfig({
  site: "https://italekseev.ru",
  image: {
    responsiveStyles: true,
  },
  server: {
    host: true,
  },
  integrations: [
    astrobook({ subpath: "/astrobook", css: ["./src/styles/index.css"] }),
  ],
});

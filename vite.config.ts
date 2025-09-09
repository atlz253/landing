import { defineConfig } from "vite";
import simpleHtmlPlugin from "vite-plugin-simple-html";

export default defineConfig({
  build: {
    minify: "terser",
    outDir: "dist",
    cssMinify: true,
  },
  plugins: [
    simpleHtmlPlugin({
      minify: true,
    }),
  ],
});

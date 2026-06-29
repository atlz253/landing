import { defineConfig } from "vite";
import simpleHtmlPlugin from "vite-plugin-simple-html";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default defineConfig({
  build: {
    minify: "terser",
    outDir: "dist",
    cssMinify: true,
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    simpleHtmlPlugin({
      minify: {
        collapseWhitespaces: "all",
        minifyCss: true,
        minifyJs: true,
        minifyJson: true,
        quotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: "all",
        tagOmission: false,
      },
    }),
  ],
});

import { defineConfig } from "astro/config";
import { loadSite } from "./src/lib/load-site.mjs";

const site = loadSite();

const lineNumberTransformer = {
  name: "line-numbers",
  line(node, line) {
    node.children.unshift({
      type: "element",
      tagName: "span",
      properties: { class: "line-number" },
      children: [{ type: "text", value: String(line) }],
    });
  },
};

export default defineConfig({
  site: site.url,
  trailingSlash: "always",
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: "light",
      wrap: false,
      transformers: [lineNumberTransformer],
    },
  },
  build: {
    format: "directory",
  },
});

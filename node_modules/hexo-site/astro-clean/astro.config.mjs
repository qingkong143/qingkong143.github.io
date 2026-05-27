import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  site: 'https://blog.318670.xyz',
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkGfm],
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});

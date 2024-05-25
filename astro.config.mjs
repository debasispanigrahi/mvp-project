import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import node from "@astrojs/node";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), vue({ appEntrypoint: '/src/pages/_app' }), tailwind(), icon()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});
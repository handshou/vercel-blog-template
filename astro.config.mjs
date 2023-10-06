import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
const tina = ({
  directiveName = 'tina'
} = {}) => ({
  name: 'tina-cms',
  hooks: {
    'astro:config:setup': ({
      addClientDirective,
      opts
    }) => {
      addClientDirective({
        name: directiveName,
        entrypoint: './client-directives/tina.mjs'
      });
    }
  }
});

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: 'https://hansel.co',
  integrations: [mdx({}), react(), tina()],
  output: "server",
  adapter: vercel()
});
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
import react from "@astrojs/react";

const tina = ({
 directiveName = 'tina'
} = {}) => ({
  name: 'tina-cms',
  hooks: {
    'astro:config:setup': ({ addClientDirective, opts }) => {
      addClientDirective({
        name: directiveName,
        entrypoint: './client-directives/tina.mjs',
      })
    }
  }
})

// https://astro.build/config
export default defineConfig({
  site: 'https://hansel.co',
  integrations: [mdx({}), react(), tina()],
  output: "server",
  adapter: cloudflare()
});

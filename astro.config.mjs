import { defineConfig } from 'astro/config';
import content from '@astrojs/content';

export default defineConfig({
  integrations: [content()],
  output: 'static'
});

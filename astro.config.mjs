import { defineConfig } from 'astro/config';
export default defineConfig({ output:'static', server:{port:4321}, integrations:[], vite:{ server:{ fs:{ strict:false }}}});

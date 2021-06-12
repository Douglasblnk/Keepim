import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import ViteComponents from 'vite-plugin-components';
import Pages from 'vite-plugin-pages';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    WindiCSS(),
    VitePWA(),
    ViteComponents({
      dirs: [
        'src/components',
        'src/pages',
      ],
    }),
  ],
});

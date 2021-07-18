import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import ViteComponents from 'vite-plugin-components';
import Pages from 'vite-plugin-pages';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    WindiCSS(),
    VitePWA({
      manifest: {
        name: 'PhotoKeep',
        icons: [],
        start_url: '/index.html',
        display: 'standalone',
      },
    }),
    ViteComponents({
      dirs: [
        'src/components',
        'src/pages',
      ],
    }),
  ],
});

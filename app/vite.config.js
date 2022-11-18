import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import Unocss from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  resolve: {
    alias: {
      '@': [ resolve(__dirname, './src') ],
      '@composables': [ resolve(__dirname, './src/composables') ],
    },
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'axios',
      'swiper',
      '@vueuse/core',
      '@vueuse/integrations/useAxios',
    ],
  },
  plugins: [
    vue(),

    Pages({
      dirs: [ { dir: 'src/pages', baseRoute: '' } ],

      // extendRoute(route) {
      //   const { path } = route

      //   if (path === '/')
      //     return route

      //   return {
      //     ...route,
      //     meta: { auth: true },
      //   }
      // },
    }),

    AutoImport({
      dirs: [
        'src/composables/**',
      ],

      vueTemplate: true,

      eslintrc: {
        enabled: true,
      },

      dts: 'src/auto-imports.d.ts',

      imports: [
        'vue',
        'vue-router',
      ],
    }),

    VitePWA({
      manifest: {
        name: 'PhotoKeep',
        icons: [],
        start_url: '/index.html',
        display: 'standalone',
      },
    }),

    Components({
      dirs: [ 'src/components' ],

      dts: 'src/components.d.ts',

      resolvers: [
        IconsResolver(),
      ],
    }),

    Icons({
      autoInstall: true,
    }),

    Unocss(),
  ],
})

import { resolve } from 'node:path'
import { quasar as Quasar, transformAssetUrls } from '@quasar/vite-plugin'
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
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@composables': resolve(__dirname, './src/composables'),
      '@utils': resolve(__dirname, './src/utils'),
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
      '@vueuse/head',
    ],
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    Pages({
      dirs: [ { dir: 'src/pages', baseRoute: '' } ],
    }),

    AutoImport({
      dirs: [
        'src/composables/**/**',
      ],

      vueTemplate: true,

      eslintrc: {
        enabled: true,
      },

      dts: 'src/auto-imports.d.ts',

      imports: [
        'vue',
        'vue-router',
        'vue/macros',
        'quasar',
        'vee-validate',
        '@vueuse/head',
        '@vueuse/core',
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

    Icons(),

    Quasar({
      autoImportComponentCase: 'pascal',
      sassVariables: 'src/styles/variables.sass',
    }),

    Unocss(),
  ],
})

import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import Unocss from 'unocss/vite'
import presetWind from '@unocss/preset-wind'
import presetAttributify from '@unocss/preset-attributify'
import transformerDirective from '@unocss/transformer-directives'
import presetMini from '@unocss/preset-mini'
import presetCore from './src/unocss/index'

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
    ],
  },
  plugins: [
    vue(),

    Pages({
      extendRoute(route) {
        const { path } = route

        if (path === '/')
          return route

        return {
          ...route,
          meta: { auth: true },
        }
      },
    }),

    AutoImport({
      include: [
        /\.vue\??/, // .vue
      ],

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
      dirs: [
        'src/components',
        'src/pages',
      ],
    }),

    Unocss({
      presets: [
        presetMini(),
        presetWind(),
        presetCore(),
        presetAttributify({

        }),
      ],
      transformers: [
        transformerDirective(),
      ],
    }),
  ],
})

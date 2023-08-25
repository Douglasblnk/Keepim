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
      '@stores': resolve(__dirname, './src/stores'),
      '@utils': resolve(__dirname, './src/utils'),
      '@datasource': resolve(__dirname, './src/datasource'),
      '@middleware': resolve(__dirname, './src/middleware'),
      '@constants': resolve(__dirname, './src/constants'),
      '@type': resolve(__dirname, './src/types'),
    },
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'axios',
      'swiper',
      '@vueuse/core',
      '@vueuse/head',
      '@vueuse/gesture',
      'uuid',
    ],
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),

    Pages({
      dirs: [ { dir: 'src/pages', baseRoute: '' } ],
      extendRoute(route) {
        const { path } = route

        if (path === '/login')
          return route

        return {
          ...route,
          meta: { auth: true, ...route.meta },
        }
      },
    }),

    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
      ],
      dirs: [
        'src/composables/**',
        'src/datasource/**',
        'src/stores/**',
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
        'pinia',
        '@vueuse/head',
        '@vueuse/core',
        {
          '@tanstack/vue-query': [
            'useQuery',
            'useInfiniteQuery',
            'useMutation',
            'useQueryClient',
          ],
        },
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
      compiler: 'vue3',
    }),

    Quasar({
      autoImportComponentCase: 'pascal',
      sassVariables: 'src/styles/variables.sass',
    }),

    Unocss(),
  ],
})

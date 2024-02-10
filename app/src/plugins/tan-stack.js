import { VueQueryPlugin } from '@tanstack/vue-query'

export function install(app) {
  const vueQueryOptions = {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          retry: false,
          staleTime: 60 * 60 * 1000,
        },
      },
    },
  }

  app.use(VueQueryPlugin, vueQueryOptions)
}

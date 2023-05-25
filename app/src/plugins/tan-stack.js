import { VueQueryPlugin } from '@tanstack/vue-query'

export function install(app) {
  const vueQueryOptions = {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          retry: false,
          staleTime: Infinity,
        },
      },
    },
  }

  app.use(VueQueryPlugin, vueQueryOptions)
}

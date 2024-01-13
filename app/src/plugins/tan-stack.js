import { VueQueryPlugin } from '@tanstack/vue-query'

export function install(app) {
  const vueQueryOptions = {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          retry: false,
          staleTime: Number.POSITIVE_INFINITY,
        },
      },
    },
  }

  app.use(VueQueryPlugin, vueQueryOptions)
}

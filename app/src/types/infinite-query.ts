import type { UseInfiniteQueryReturnType } from '@tanstack/vue-query'

export type CustomInfiniteQueryReturnType<TData = any> = UseInfiniteQueryReturnType<TData, any> & {
  data: Ref<TData>
}

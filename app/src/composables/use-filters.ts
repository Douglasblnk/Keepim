import type { MaybeRef } from 'vue'

const filters = ref<Record<string, any>>({})

export default function<TFilterType = any>(module: string, defaultFilters?: Record<string, any> | undefined) {
  const addFilter = (filter: MaybeRef<Record<string, any>>) => {
    filters.value[module] = unref(filter)
  }

  const removeFilter = () => {
    const index = filters.value.indexOf(module)
    filters.value.splice(index, 1)
  }

  if (defaultFilters !== undefined)
    addFilter(defaultFilters)

  return {
    filters: computed<TFilterType>({
      get: () => filters.value[module],
      set: (value) => {
        filters.value[module] = value
      },
    }),
    addFilter,
    removeFilter,
  }
}

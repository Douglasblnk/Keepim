<script setup lang="ts">
import type { CollectionsParams } from '@/types/collection'

const { filters } = useFilters<CollectionsParams>('collections', {
  search: '',
  sortBy: 'collectionDate',
  orderBy: 'DESC',
})

const sortOptions = [
  {
    label: 'Data da coleção',
    value: 'collectionDate',
  },
  {
    label: 'Nome',
    value: 'collectionName',
  },
]

const filteringFor = computed(() => {
  const sortOption = sortOptions.find(option => option.value === filters.value.sortBy)

  return sortOption?.label
})

function clearSort() {
  console.log('poxa')
  filters.value.sortBy = 'collectionDate'
  filters.value.orderBy = 'DESC'
}

watch(() => filters.value.search, (value) => {
  if (value)
    filters.value.sortBy = 'collectionName'

  else
    filters.value.sortBy = 'collectionDate'
})

watch(() => filters.value.sortBy, (value) => {
  if (value === 'collectionDate')
    filters.value.search = ''
})
</script>

<template>
  <div un-flex="~ col">
    <KInput
      v-model="filters.search"
      label="Busque por coleções"
      icon="i-mdi-magnify"
      debounce="1000"
    />

    <div
      un-flex
      un-items-center
      un-justify-between
    >
      <div un-text-gray-text>
        Exibindo por:

        <span un-font-bold>
          {{ filteringFor }}
        </span>
      </div>

      <KSort
        v-model:order-by="filters.orderBy"
        v-model:sort-by="filters.sortBy"
        :sort-options="sortOptions"
        @clear="clearSort"
      />
    </div>
  </div>
</template>

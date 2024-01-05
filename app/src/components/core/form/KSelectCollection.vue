<script setup lang="ts">
import type { QSelect } from 'quasar'
import type { CollectionsParams, CollectionsResponse, CustomInfiniteQueryReturnType } from '@/types'

const queryVariables = ref<CollectionsParams>({
  orderBy: 'DESC',
  sortBy: 'collectionDate',
  search: '',
})

const {
  data: collections,
  isInitialLoading,
  fetchNextPage,
} = useInfiniteQuery({
  queryKey: [ 'collections-list-select', queryVariables ],
  queryFn: ({ pageParam }) => getCollectionsRequest(queryVariables.value, pageParam),
  select: ({ pages }) => pages?.flatMap((page: any) => page.data) as any,
  getNextPageParam: value => value?.lastEvaluatedKey,
}) as CustomInfiniteQueryReturnType<CollectionsResponse[]>

function onFilter(val: string, update: (_callbackFn: () => void) => void) {
  update(() => {
    queryVariables.value.search = val
  })
}

function onScroll(details: {
  index: number
  from: number
  to: number
  direction: 'increase' | 'decrease'
  ref: QSelect
}) {
  const lastIndex = collections.value.length - 1

  if (details.index === lastIndex)
    fetchNextPage()
}
</script>

<template>
  <KSelect
    label="Coleções"
    option-label="collectionName"
    name="coleção"
    use-input
    :options="collections"
    :loading="isInitialLoading"
    @virtual-scroll="onScroll"
    @filter="onFilter"
  >
    <template #option="{ itemProps, opt }">
      <QItem v-bind="itemProps">
        <QItemSection avatar>
          <QIcon name="i-mdi-folder-outline" />
        </QItemSection>

        <QItemSection un-space-y-sm>
          <span un-font-bold>{{ opt.collectionName }}</span>
          <span un-text="sm gray">{{ opt.collectionDate }}</span>
        </QItemSection>
      </QItem>
    </template>
  </KSelect>
</template>

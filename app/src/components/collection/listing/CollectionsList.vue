<script setup lang="ts">
import { capitalizeFirstLetter, dayjs } from '@utils/index'
import type { CollectionsParams, CollectionsResponse, CustomInfiniteQueryReturnType } from '@type/index'

const { push } = useRouter()

const { filters } = useFilters<CollectionsParams>('collections')

const foldersWrapper = ref<HTMLDivElement | null>()

const { folderSize } = useListSize(foldersWrapper, 8)

const {
  data,
  isLoading,
  fetchNextPage,
} = useInfiniteQuery({
  queryKey: [ 'collections-list', filters ],
  queryFn: ({ pageParam }) => getCollectionsRequest(filters.value, pageParam),
  select: ({ pages }) => pages?.flatMap((page: any) => page.data) as any,
  getNextPageParam: value => value?.lastEvaluatedKey,
}) as CustomInfiniteQueryReturnType<CollectionsResponse[]>

const showDateLabel = computed(() => {
  return filters.value.sortBy === 'collectionDate' && !filters.value.search
})

const collections = computed(() => {
  return showDateLabel.value
    ? data.value?.reduce((acc: Record<string, CollectionsResponse[]>, value) => {
      const month = capitalizeFirstLetter(dayjs(value.collectionDate).format('MMMM [de] YYYY'))

      if (!acc[month])
        acc[month] = []

      acc[month] = [ ...acc[month], value ]

      return acc
    }, {})
    : { '': data.value }
})

async function onLoad(_: number, done: (_stop?: boolean | undefined) => void) {
  await fetchNextPage()

  done()
}

function navigateToCollection(folder: CollectionsResponse) {
  push(`/colecoes/${folder.id}`)
}
</script>

<template>
  <CollectionListSkeleton
    v-if="isLoading"
    :folder-size="folderSize"
    un-mb-80px
  />

  <div
    v-else
    ref="foldersWrapper"
    un-mb-80px
  >
    <QInfiniteScroll
      v-if="data?.length"
      :offset="150"
      @load="onLoad"
    >
      <template #loading>
        <div
          un-mt-xl
          un-flex
          un-justify-center
        >
          <QSpinnerDots
            color="primary"
            size="40px"
          />
        </div>
      </template>

      <div
        v-for="(folders, key) in collections"
        :key="`collection-${key}`"
        un-mb-lg
      >
        <span
          v-if="showDateLabel"
          un-font-bold
          un-color-gray-text
        >
          {{ key }}
        </span>

        <div
          un-mt-sm
          un-flex="~ wrap"
          un-gap-sm
        >
          <CollectionFolder
            v-for="(folder, index) in folders"
            :key="`folder-${index}`"
            :name="folder.collectionName"
            :thumbnail="folder.thumbnail"
            :style="folderSize"
            un-max-w-200px
            un-max-h-200px
            un-min-w-85px
            un-min-h-85px
            @click="navigateToCollection(folder)"
          />
        </div>
      </div>
    </QInfiniteScroll>

    <div
      v-else
      un-mt-6xl
      un-text-center
    >
      <span un-text="md gray-text">
        Nenhuma coleção encontrada
      </span>
    </div>
  </div>
</template>

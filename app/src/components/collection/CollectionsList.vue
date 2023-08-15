<script setup lang="ts">
import { useScreenOrientation } from '@vueuse/core'
import { capitalizeFirstLetter, dayjs } from '@utils/index'
import type { CollectionsParams, CollectionsResponse, CustomInfiniteQueryReturnType } from '@type/index'

const miniState = inject<ComputedRef<boolean>>('miniState')

const { filters } = useFilters<CollectionsParams>('collections')

const { orientation } = useScreenOrientation()
const $q = useQuasar()

const foldersWrapper = ref<HTMLDivElement | null>()

const {
  data,
  isLoading,
  fetchNextPage,
} = useInfiniteQuery({
  queryKey: [ 'collections-list', filters ],
  queryFn: getCollectionsRequest,
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

const folderSize = reactive({
  width: '',
  height: '',
})

const sizesEnum = {
  xs: 3,
  sm: 3,
  md: 4,
  lg: 4,
  xl: 5,
}

function calcFolderSize() {
  if (foldersWrapper.value?.clientWidth) {
    const size = (foldersWrapper.value?.clientWidth / sizesEnum[$q.screen.name]) - 8

    folderSize.width = `${size}px`
    folderSize.height = `${size}px`
  }
}

async function onLoad(_: number, done: (_stop?: boolean | undefined) => void) {
  await fetchNextPage()

  done()
}

watch(
  () => [ $q.screen.width, foldersWrapper.value, miniState?.value, orientation.value ],
  calcFolderSize,
)
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
            :style="folderSize"
            un-max-w-200px
            un-max-h-200px
            un-min-w-85px
            un-min-h-85px
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

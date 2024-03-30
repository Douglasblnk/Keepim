<script setup lang="ts">
import { capitalizeFirstLetter, dayjs } from '@utils/index'
import type { CollectionsParams, CollectionsResponse } from '@type/index'
import gsap from 'gsap'

const { push } = useRouter()

const { filters } = useFilters<CollectionsParams>('collections')

const foldersWrapper = ref<HTMLDivElement | null>()

const { folderSize } = useListSize(foldersWrapper, 8)

const {
  folderSize: fixedFolderSize,
  folderQtd,
} = useListSize(foldersWrapper, 8, true)

const {
  data,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
} = useInfiniteQuery({
  initialPageParam: {},
  queryKey: [ 'collections-list', filters ],
  queryFn: ({ pageParam }) => getCollectionsRequest(filters.value, pageParam),
  getNextPageParam: value => value?.lastEvaluatedKey,
})

const showDateLabel = computed(() => {
  return (filters.value.sortBy === 'collectionDate' || filters.value.sortBy === 'favorite')
    && !filters.value.search
})

const showFixedCollection = ref(false)

const fixedCollections = computed(() => {
  const fixed = data.value?.pages[0]?.fixedCollections || []

  return fixed.reduce((acc: { shown: CollectionsResponse[]; hidden: CollectionsResponse[] }, value) => {
    if (acc.shown.length === folderQtd.value)
      acc.hidden.push(value)

    else
      acc.shown.push(value)

    return acc
  }, { shown: [], hidden: [] })
})

const collections = computed(() => {
  const flattenCollection = data.value?.pages?.flatMap(page => page?.data) as CollectionsResponse[]

  return showDateLabel.value
    ? flattenCollection.reduce((acc: Record<string, CollectionsResponse[]>, value) => {
      const month = capitalizeFirstLetter(dayjs(value.collectionDate).format('MMMM [de] YYYY'))

      if (!acc[month])
        acc[month] = []

      acc[month] = [ ...acc[month], value ]

      return acc
    }, {})
    : { '': flattenCollection }
})

function toggleAllFixedCollections() {
  showFixedCollection.value = !showFixedCollection.value
}

async function onLoad(_: number, done: (_stop?: boolean | undefined) => void) {
  await fetchNextPage()

  done(!hasNextPage.value)
}

function navigateToCollection(folder: CollectionsResponse) {
  push(`/colecoes/${folder.id}`)
}

function onBeforeEnter(el: any) {
  el.style.opacity = '0'

  gsap.set(el, { y: '-20%' })
}

function onEnter(el: any, done: () => void) {
  const index = +(el.dataset.index || 0)

  gsap.to(el, {
    opacity: 1,
    y: '0%',
    delay: index * 0.03,
    onComplete: done,
  })
}

function onLeave(el: any, done: () => void) {
  const index = +(el.dataset.index || 0)

  const reverseIndex = fixedCollections.value.hidden.length - index - 1

  gsap.to(el, {
    opacity: 0,
    y: '-20%',
    delay: reverseIndex * 0.03,
    onComplete: done,
  })
}
</script>

<template>
  <CollectionListSkeleton
    v-if="isLoading"
    :folder-size="folderSize"
    un-mb-80px
  />

  <div v-else-if="isError">
    <!-- todo implementar componente de error -->

    Error
  </div>

  <template v-else>
    <div
      v-if="fixedCollections.shown.length"
      un-m="t-md b-lg"
    >
      <div
        un-flex
        un-justify-between
        un-items-center
      >
        <span
          un-font-bold
          un-color-gray-text
        >
          Coleções fixadas
        </span>

        <QBtn
          v-if="fixedCollections.hidden.length"
          flat
          un-px-md
          un-py-xs
          un-cursor-pointer
          @click="toggleAllFixedCollections"
        >
          <span un-text-gray-text>
            {{ showFixedCollection ? 'Esconder' : 'Mostrar todas' }}
          </span>

          <QIcon
            :name="showFixedCollection ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down'"
            size="sm"
          />
        </QBtn>
      </div>

      <div
        un-mt-sm
        un-relative
      >
        <div
          un-flex="~ wrap"
          un-gap-sm
        >
          <CollectionFolder
            v-for="folder in fixedCollections.shown"
            :key="folder.id"
            :name="folder.collectionName"
            :thumbnail="folder.thumbnail"
            :favorite="folder.favorite"
            :style="fixedFolderSize"
            un-bg-dark="!primary"
            un-max-w-200px
            un-max-h-200px
            un-min-w-85px
            un-min-h-85px
            @click="navigateToCollection(folder)"
          />
        </div>

        <TransitionGroup
          tag="div"
          un-flex="~ wrap"
          un-gap-sm
          un-mt-sm
          :css="false"
          @before-enter="onBeforeEnter"
          @enter="onEnter"
          @leave="onLeave"
        >
          <template v-if="showFixedCollection">
            <CollectionFolder
              v-for="(folder, index) in fixedCollections.hidden"
              :key="folder.id"
              :name="folder.collectionName"
              :thumbnail="folder.thumbnail"
              :favorite="folder.favorite"
              :style="fixedFolderSize"
              :data-index="index"
              un-bg-dark="!primary"
              un-max-w-200px
              un-max-h-200px
              un-min-w-85px
              un-min-h-85px
              @click="navigateToCollection(folder)"
            />
          </template>
        </TransitionGroup>
      </div>
    </div>

    <div
      ref="foldersWrapper"
      un-mb-80px
      un-relative
    >
      <QInfiniteScroll
        v-if="Object.keys(collections).length"
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
              :favorite="folder.favorite"
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
</template>

<style>
.collection-enter-active,
.collection-leave-active {
  transition: all 0.5s;
}
.collection-enter-from,
.collection-leave-to /* .collection-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

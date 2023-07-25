<script setup lang=ts>
import { isObjectEmpty } from '@utils/index'

const props = defineProps<{
  title: string
  withBlur?: boolean
  isLoading?: boolean
  subItems?: { collections?: number; images?: number; categories?: number }
}>()

const { getStorageState } = useLocalStorage()

const user = computed(() => getStorageState('user-info'))

const subItemsTranslated = {
  collections: props.subItems?.collections === 1 ? 'coleção' : 'coleções',
  images: props.subItems?.images === 1 ? 'imagem' : 'imagens',
  categories: props.subItems?.categories === 1 ? 'categoria' : 'categorias',
}
</script>

<template>
  <div
    un-p-lg
    un-flex
    un-justify-between
    :class="withBlur ? 'backdrop-blur-md' : 'bg-background'"
  >
    <div>
      <h1
        un-title
        un-max-w-160px
      >
        {{ title }}
      </h1>

      <div
        v-if="!isObjectEmpty(subItems)"
        un-flex
        un-gap-sm
      >
        <div
          v-for="(subitem, key) in subItems"
          :key="`subitem-${key}`"
        >
          <template v-if="!isLoading">
            {{ subitem }}
            <span un-text-gray>{{ subItemsTranslated[key] }}</span>
          </template>

          <QSkeleton
            v-else
            un-w-14
            un-h-4
            un-rounded-md
          />
        </div>
      </div>
    </div>

    <KAvatar
      size="lg"
      color="primary"
      :img="user.avatar"
      :label="user.name"
    />
  </div>
</template>

<script setup lang=ts>
import { isObjectEmpty } from '@utils/index'

const props = defineProps<{
  title: string
  isLoading?: boolean
  subItems?: { collections?: number; images?: number; categories?: number }
}>()

const isMobile = inject('isMobile') as ComputedRef<boolean>

const { push } = useRouter()
const { userStorage } = useLocalStorage()

const subItemsTranslated = computed(() => ({
  collections: props.subItems?.collections === 1 ? 'coleção' : 'coleções',
  images: props.subItems?.images === 1 ? 'imagem' : 'imagens',
  categories: props.subItems?.categories === 1 ? 'categoria' : 'categorias',
}))
</script>

<template>
  <div
    un-flex
    un-justify-between
  >
    <div>
      <h1
        un-title
        :class="isMobile && 'max-w-160px'"
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
      v-if="isMobile"
      size="xl"
      color="primary"
      un-cursor-pointer
      :img="userStorage.avatar"
      :label="userStorage.name"
      @click="push('/perfil')"
    />
  </div>
</template>

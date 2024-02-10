<script setup lang="ts">
import { capitalizeFirstLetter, dayjs } from '@utils'

defineProps<{ isLoading: boolean }>()

const { push } = useRouter()
const { setDialog } = useDialog()

const store = useCollectionStore()

const { collection } = storeToRefs(store)

const collectionDate = computed(() => {
  const date = dayjs(collection?.value?.collectionDate)

  return `
    ${date.format('DD')}
    de
    ${capitalizeFirstLetter(date.format('MMMM [de] YYYY'))}
  `.trim()
})

function openAddImageDialog() {
  setDialog({ component: 'AddImageDialog' })
}

function addCoverAction() {
  store.tab = 'photos'
  store.isRemoving = false
  store.isAddingCover = true
}

function removePhotoAction() {
  store.tab = 'photos'
  store.isAddingCover = false
  store.isRemoving = true
}
</script>

<template>
  <div
    un-flex
    un-items-center
    un-justify-between
    un-pt-lg
    un-px-md
    un-relative
    un-z-10
  >
    <div
      un-absolute
      un-top-0
      un-pt-lg
    >
      <QBtn
        icon="i-mdi-arrow-left"
        un-rounded-full
        un-p-none
        round
        flat
        @click="push({ path: '/colecoes' })"
      />
    </div>

    <div
      un-flex="~ col"
      un-items-center
      un-w-full
    >
      <h1
        v-if="!isLoading"
        un-title
        un-m-none
        un-max-w="70%"
        un-truncate
      >
        {{ collection?.collectionName }}
      </h1>

      <QSkeleton
        v-else
        un-w="40%"
        un-h="24px"
        un-rounded-full
        un-mx-auto
        un-my-sm
      />

      <span v-if="!isLoading">{{ collectionDate }}</span>

      <QSkeleton
        v-else
        un-w="20%"
        un-h="14px"
        un-rounded-full
        un-mx-auto
        un-mb-sm
      />
    </div>

    <div
      un-absolute
      un-right-0
      un-top-0
      un-pr-md
      un-pt-lg
    >
      <QBtn
        id="menu-actions"
        icon="i-mdi-dots-vertical"
        un-rounded-full
        un-p-none
        round
        flat
      />

      <CollectionViewHeaderOptions
        target="#menu-actions"
        anchor="bottom end"
        cover
        @open-add-image-dialog="openAddImageDialog"
        @add-cover-action="addCoverAction"
        @remove-photo-action="removePhotoAction"
      />
    </div>
  </div>

  <div
    v-if="!isLoading"
    style="background: rgba(160, 160, 160, 0.24);"
    un-mx-auto
    un-mt-60px
    un-z-10
    un-px-lg
    un-py-sm
    un-backdrop-blur-5px
    un-rounded-full
  >
    {{ collection?.photos?.imgs?.length || 0 }} fotos
  </div>

  <QSkeleton
    v-else
    un-w="20%"
    un-h="24px"
    un-rounded-full
    un-mx-auto
    un-mt-60px
    un-mb-sm
  />

  <div
    un-absolute
    un-w-full
  >
    <QImg
      height="270px"
      fit="cover"
      :img-style="{ filter: 'brightness(0.5) blur(6px)' }"
      :src="collection?.cover"
    />
  </div>
</template>

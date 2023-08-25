<script setup lang="ts">
import { capitalizeFirstLetter, dayjs } from '@utils'

defineProps<{ isLoading: boolean }>()

const { back } = useRouter()

const state = useCollectionStore()

const collectionDate = computed(() => {
  const dayjsDate = dayjs(state.collection?.collectionDate)

  return `
    ${dayjsDate.format('DD')}
    de
    ${capitalizeFirstLetter(dayjsDate.format('MMMM [de] YYYY'))}
  `.trim()
})
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
      <QIcon
        name="i-mdi-arrow-left"
        size="md"
        un-cursor-pointer
        @click="back"
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
        {{ state.collection?.collectionName }}
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
      <QIcon
        name="i-mdi-dots-vertical"
        size="md"
        un-cursor-pointer
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
    0 fotos
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
      :img-style="{ filter: 'brightness(0.5) blur(3px)' }"
      src="https://thumbs.dreamstime.com/z/colheita-do-campo-de-trigo-15537614.jpg?w=768"
    />
  </div>
</template>

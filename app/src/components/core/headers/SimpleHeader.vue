<script setup lang="ts">
defineProps<{
  title?: string
  isLoading?: boolean
}>()

const { back } = useRouter()
</script>

<template>
  <div
    un-relative
    un-flex
    un-items-center
    un-justify-between
    un-pb-md
  >
    <QIcon
      name="i-mdi-arrow-left"
      size="md"
      un-absolute
      un-cursor-pointer
      @click="back"
    />

    <h1
      v-if="!isLoading"
      un-title
      un-mx-auto
      un-max-w="70%"
      un-truncate
    >
      {{ title }}
    </h1>

    <QSkeleton
      v-else
      un-w="40%"
      un-h="24px"
      un-rounded-full
      un-mx-auto
      un-my-md
    />
  </div>
</template>

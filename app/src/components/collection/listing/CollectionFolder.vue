<script setup lang="ts">
defineProps<{
  name: string
  thumbnail?: string
  favorite?: number
}>()

const hover = ref(false)
</script>

<template>
  <div
    un-rounded-2xl
    un-shadow
    un-bg-dark-secondary
    un-relative
    un-overflow-hidden
    un-flex
    un-justify-center
    un-cursor-pointer
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div
      v-if="!thumbnail"
      un-p-md
      un-flex
      un-items-center
    >
      <QIcon
        name="i-mdi-image-off-outline"
        size="lg"
      />
    </div>

    <div
      v-else
      un-absolute
      top-0
      un-w-full
      un-h-full
      un-transition
      :class="hover && 'transform-scale-110'"
    >
      <QImg
        ratio="1"
        :src="thumbnail"
      />
    </div>

    <div
      v-if="favorite"
      un-absolute
      un-top-0
      un-right-0
      un-w-6
      un-h-6
      un-flex
      un-justify-center
      un-items-center
      un-m-xs
      un-rounded-full
      un-backdrop-blur-8px
      class="bg-dark-primary/10"
    >
      <QIcon name="i-mdi-heart" />
    </div>

    <div
      un-absolute
      un-bottom-2
      un-p="y-xs x-sm"
      un-max-w="90%"
      un-rounded-lg
      un-backdrop-blur-8px
      class="bg-dark-primary/30"
    >
      <span
        un-line-clamp-1
        un-truncate-1
        un-select-none
        un-text="xs center"
      >
        {{ name }}
      </span>
    </div>
  </div>
</template>

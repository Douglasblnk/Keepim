<script setup lang="ts">
const ImgListingSkeletonRef = ref<HTMLDivElement | null>()

const { folderSize } = useListSize(ImgListingSkeletonRef, 16)
</script>

<template>
  <div
    ref="ImgListingSkeletonRef"
    un-w-full
    un-flex
    un-flex-wrap
    un-gap-md
  >
    <QSkeleton
      v-for="index in 18"
      :key="index"
      un-max-w-200px
      un-max-h-200px
      un-min-w-85px
      un-min-h-85px
      :style="folderSize"
      un-rounded-3xl
    />
  </div>
</template>

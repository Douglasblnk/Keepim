<script setup lang="ts">
defineProps<{ folderSize: object }>()
</script>

<template>
  <div>
    <div
      v-for="item in [4, 7, 2, 4]"
      :key="item"
      un-space-y-md
      un-mt-lg
    >
      <QSkeleton
        un-w-110px
        un-rounded-full
      />

      <div
        un-flex
        un-flex-wrap
        un-gap-sm
      >
        <QSkeleton
          v-for="(skeleton) in item"
          :key="skeleton"
          :style="folderSize"
          un-max-w-200px
          un-max-h-200px
          un-min-w-85px
          un-min-h-85px
          un-rounded-2xl
        />
      </div>
    </div>
  </div>
</template>

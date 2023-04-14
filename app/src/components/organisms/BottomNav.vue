<script setup>
import { useRoute } from 'vue-router'

const { name } = useRoute()

function isSelected(option) {
  return name === option
}
</script>

<template>
  <div
    un-pos="fixed bottom-6"
    un-w-full
    un-flex
    un-justify-center
    un-mx-auto
    un-z-10
  >
    <div
      un-w="col-6 md:1/4"
      un-p="x-xl y-md"
      un-bg="gray-100 opacity-5"
      un-backdrop="~ blur-lg"
      un-flex
      un-md-justify-around
      un-justify-between
      un-items-center
      un-rounded-full
      un-text-white
    >
      <div
        :class="isSelected('explore') && 'selected'"
        un-cursor-pointer
      >
        <Icon
          icon="i-mdi-folder-table"
          un-text-md
        />
      </div>

      <div
        :class="isSelected('home') && 'selected'"
        un-cursor="pointer"
        un-mx-md
      >
        <Icon
          icon="i-mdi-home"
          un-text-md
        />
      </div>

      <div
        :class="isSelected('folders') && 'selected'"
        un-cursor="pointer"
      >
        <Icon
          icon="i-mdi-format-list-bulleted"
          un-text-md
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.selected
  @apply bg-primary rounded-full py-sm px-lg
</style>

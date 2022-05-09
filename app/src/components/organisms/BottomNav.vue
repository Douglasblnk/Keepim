<script setup>
import { useRoute } from 'vue-router'

const { name } = useRoute()

const isSelected = (option) => {
  return name === option
}
</script>

<template>
  <div
    un-pos="fixed bottom-4"
    un-w="full"
    un-flex="~"
    un-justify="center"
    un-m="x-auto"
    un-z="marginals"
  >
    <div
      un-flex="~"
      un-justify="between"
      un-align="items-center"
      un-w="4/5 md:1/5"
      un-p="x-xl y-md"
      un-rounded="full"
      un-bg="gray-100 opacity-5"
      un-backdrop="~ blur-lg"
      un-text="white"
    >
      <div
        :class="isSelected('explore') && 'selected'"
        un-cursor="pointer"
      >
        <FIcon
          icon="th-large"
          size="lg"
        />
      </div>

      <div
        :class="isSelected('home') && 'selected'"
        un-cursor="pointer"
      >
        <FIcon
          icon="home"
          size="lg"
        />
      </div>

      <div
        :class="isSelected('folders') && 'selected'"
        un-cursor="pointer"
      >
        <FIcon
          icon="th-list"
          size="lg"
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.selected
  @apply bg-primary rounded-full py-sm px-lg
</style>

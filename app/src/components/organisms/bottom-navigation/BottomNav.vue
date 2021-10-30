<script setup>
import { useRoute } from 'vue-router';

const { name } = useRoute();

const isSelected = (option) => {
  return name === option;
};
</script>

<template>
  <div
    w:pos="fixed bottom-4"
    w:w="full"
    w:flex="~"
    w:justify="center"
    w:m="x-auto"
    w:z="marginals"
  >
    <div
      w:flex="~"
      w:justify="between"
      w:align="items-center"
      w:w="4/5 md:1/5"
      w:p="x-xl y-md"
      w:rounded="full"
      w:bg="gray-100 opacity-5"
      w:backdrop="~ blur-lg"
      w:text="white"
    >
      <div
        :class="isSelected('explore') && 'selected'"
        w:cursor="pointer"
      >
        <FIcon
          icon="th-large"
          size="lg"
        />
      </div>

      <div
        :class="isSelected('home') && 'selected'"
        w:cursor="pointer"
      >
        <FIcon
          icon="home"
          size="lg"
        />
      </div>

      <div
        :class="isSelected('folders') && 'selected'"
        w:cursor="pointer"
      >
        <FIcon
          icon="th-list"
          size="lg"
        />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.selected {
  @apply
    bg-primary
      rounded-full
      py-sm
      px-lg;
}
</style>

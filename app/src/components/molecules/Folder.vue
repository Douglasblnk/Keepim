<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },

  date: {
    type: String,
    default: '',
  },

  images: {
    type: Array,
    default: () => [],
  },
});

const reducedImgs = computed(() => {
  return props.images.splice(0, 5);
});
</script>

<template>
  <div
    class="p-folder"
    w:w="200px"
    w:flex="~ col"
    w:p="x-md y-md"
    w:bg="ascendent active:gray-500 md:hover:gray-500"
    w:cursor="pointer"
    w:transition="~"
    w:rounded="md"
  >
    <div
      w:w="full"
      w:flex="~"
      w:justify="between"
    >
      <div w:flex="~ col">
        <p>{{ title }}</p>
        <small w:text="gray-400">{{ date }}</small>
      </div>

      <FIcon icon="folder" />
    </div>

    <div
      w:flex="~"
      w:m="t-lg"
    >
      <Img
        v-for="(image, index) in reducedImgs"
        :key="`folder-images-${index}`"
        :url="image.url"
        class="p-folder__img"
        w:w="35px"
        ratio="1"
        rounded
        elevated
      />
    </div>
  </div>
</template>

<style lang="postcss">
.p-folder {
  &__img {
    &:not(:first-child) {
      @apply
        -ml-sm
    }
  }
}
</style>

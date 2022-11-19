<script setup>
const props = defineProps({
  name: {
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
})

const reducedImgs = computed(() => {
  return props.images.splice(0, 5)
})
</script>

<template>
  <div
    class="p-folder"
    un-w="200px"
    un-flex="~ col"
    un-p="x-md y-md"
    un-bg="accent active:gray-500 md:hover:gray-500"
    un-cursor="pointer"
    un-transition="~"
    un-rounded="md"
  >
    <div
      un-w="full"
      un-flex="~"
      un-justify="between"
    >
      <div un-flex="~ col">
        <p>{{ name }}</p>
        <small un-text="gray-400">{{ date }}</small>
      </div>

      <FIcon icon="folder" />
    </div>

    <div
      un-flex="~"
      un-m="t-lg"
    >
      <Img
        v-for="(image, index) in reducedImgs"
        :key="`folder-images-${index}`"
        :url="image.url"
        class="p-folder__img"
        un-w="35px"
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

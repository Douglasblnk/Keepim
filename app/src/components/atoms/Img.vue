<script setup>
defineProps({
  url: String,

  style: String,

  alt: String,

  rounded: Boolean,

  elevated: Boolean,

  clickable: Boolean,

  ratio: {
    type: [String, Number],
    default: 16 / 9,
  },

  objectFit: {
    type: String,
    default: 'cover',
  },
});
</script>

<template>
  <div
    un-pos="relative"
    un-w="full"
    un-h="full"
    un-display="inline-block"
    un-text="middle"
    un-overflow="hidden"
    :un-shadow="elevated ? '6' : 'none'"
    :un-rounded="rounded ? 'full' : 'md'"
  >
    <div
      v-if="ratio"
      :style="{ paddingBottom: `${ 100 / Number(ratio) }%` }"
    />

    <div un-pos="absolute top-0 left-0 right-0 bottom-0">
      <img
        un-w="full"
        un-h="full"
        un-border="none"
        un-transition="~"
        :un-opacity="clickable ? 'active:50 md:hover:50' : ''"
        :un-cursor="clickable ? 'pointer' : ''"
        :src="url"
        :style="{ objectFit: objectFit, ...style }"
        :alt="alt"
      >
    </div>
  </div>
</template>

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
    w:pos="relative"
    w:w="full"
    w:h="full"
    w:display="inline-block"
    w:text="middle"
    w:overflow="hidden"
    :w:shadow="elevated ? '6' : 'none'"
    :w:rounded="rounded ? 'full' : 'md'"
  >
    <div
      v-if="ratio"
      :style="{ paddingBottom: `${ 100 / Number(ratio) }%` }"
    />

    <div w:pos="absolute top-0 left-0 right-0 bottom-0">
      <img
        w:w="full"
        w:h="full"
        w:border="none"
        w:transition="~"
        :w:opacity="clickable ? 'active:50 md:hover:50' : ''"
        :w:cursor="clickable ? 'pointer' : ''"
        :src="url"
        :style="{ objectFit: objectFit, ...style }"
        :alt="alt"
      >
    </div>
  </div>
</template>

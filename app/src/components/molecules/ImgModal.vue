<script setup>
defineProps({
  url: {
    type: String,
    default: '',
  },

  categories: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['close']);
</script>

<template>
  <div
    w:flex="~ col"
    w:justify="between"
    w:h="90vh"
    w:w="90vw md:50vw"
  >
    <div
      w:flex="~ 1"
      w:justify="center"
      w:align="items-center"
    >
      <Img
        :url="url"
        object-fit="contain"
      />
    </div>

    <div
      w:flex="~ 2"
      w:p="t-lg"
      w:justify="center"
    >
      <Button
        icon="times"
        icon-size="lg"
        w:w="!xxl"
        w:h="!xxl"
        circle
        primary
        @click="$emit('close')"
      />
    </div>
  </div>
</template>

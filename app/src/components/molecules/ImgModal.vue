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
    un-flex="~ col"
    un-justify="between"
    un-h="90vh"
    un-w="90vw md:50vw"
  >
    <div
      un-flex="~ 1"
      un-justify="center"
      un-align="items-center"
    >
      <Img
        :url="url"
        object-fit="contain"
      />
    </div>

    <div
      un-flex="~ 2"
      un-p="t-lg"
      un-justify="center"
    >
      <Button
        icon="times"
        icon-size="lg"
        un-w="!xxl"
        un-h="!xxl"
        circle
        primary
        @click="$emit('close')"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  url: String,

  style: String,

  alt: String,
});
</script>

<template>
  <div>
    <img
      w:rounded="md"
      :src="url"
      :style="style"
      :alt="alt"
    >
  </div>
</template>

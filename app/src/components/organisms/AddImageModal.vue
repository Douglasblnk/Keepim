<script setup>
defineProps({
  folders: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['close', 'confirm']);
</script>

<template>
  Add image modal
</template>

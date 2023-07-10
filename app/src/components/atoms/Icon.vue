<script setup>
defineProps({
  icon: String,
  loading: Boolean,
})
</script>

<template>
  <template v-if="loading">
    <span class="i-mdi-loading" />
  </template>

  <template v-else>
    <span :class="icon" />
  </template>
</template>

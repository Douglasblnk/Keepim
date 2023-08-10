<script setup lang="ts">
const props = defineProps<{
  id: string
}>()

useHead({
  title: computed(() => `Keepim - ${props.id}`),
})
</script>

<template>
  <KLayoutPage :default-header="id">
    poxa
  </KLayoutPage>
</template>

<route lang="yaml">
meta:
  transition: slide-up
  backTransition: slide-down-back
</route>

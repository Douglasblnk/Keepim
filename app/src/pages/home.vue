<script setup lang="ts">
const collections = ref(1)
</script>

<template>
  <div>
    <TopHeader
      title="Últimas Atualizações"
      :sub-items="{ collections }"
    />
  </div>
</template>

<route lang="yaml">
path: /
meta:
  title: Home
</route>

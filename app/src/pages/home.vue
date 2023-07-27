<script setup lang="ts">
const { data, isLoading } = useQuery({
  queryKey: [ 'collections-count' ],
  queryFn: getCollectionsCountRequest,
})
</script>

<template>
  <div un-p-lg>
    <TopHeader
      title="Últimas Atualizações"
      :is-loading="isLoading"
      :sub-items="{ collections: data }"
    />
  </div>
</template>

<route lang="yaml">
path: /
meta:
  title: Home
</route>

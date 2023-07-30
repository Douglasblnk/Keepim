<script setup lang="ts">
const { data, isLoading } = useQuery({
  queryKey: [ 'collections-count' ],
  queryFn: getCollectionsCountRequest,
})
</script>

<template>
  <KLayoutPage>
    <TopHeader
      title="Últimas Atualizações"
      :is-loading="isLoading"
      :sub-items="{ collections: data }"
    />
  </KLayoutPage>
</template>

<route lang="yaml">
path: /
meta:
  title: Home
</route>

<script setup lang="ts">
const { data, isLoading } = useQuery({
  queryKey: [ 'collections-count' ],
  queryFn: getCollectionsCountRequest,
})
</script>

<template>
  <div>
    <div
      un-pos-sticky
      un-top-0
      un-z-10
    >
      <TopHeader
        title="Coleções"
        :is-loading="isLoading"
        :sub-items="{ collections: data }"
      />
    </div>
  </div>
</template>

<route lang="yaml">
path: /colecoes
meta:
  title: Coleções
</route>

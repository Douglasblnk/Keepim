<script setup lang="ts">
const collectionCount = useQuery({
  queryKey: [ 'collections-count' ],
  queryFn: getCollectionsCountRequest,
})
</script>

<template>
  <KLayoutPage>
    <template #header>
      <TopHeader
        title="Coleções"
        :is-loading="collectionCount.isLoading.value"
        :sub-items="{ collections: collectionCount.data.value }"
      />

      <CollectionFilter
        un-mt-xl
        un-mb-md
      />
    </template>

    <CollectionsList />
  </KLayoutPage>
</template>

<route lang="yaml">
path: /colecoes
meta:
  title: Coleções
</route>

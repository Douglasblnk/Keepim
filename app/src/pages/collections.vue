<script setup lang="ts">
const { data, isLoading } = useQuery({
  queryKey: [ 'collections-count' ],
  queryFn: getCollectionsCountRequest,
})

const search = ref('')
</script>

<template>
  <KLayoutPage>
    <template #header>
      <TopHeader
        title="Coleções"
        :is-loading="isLoading"
        :sub-items="{ collections: data }"
      />
    </template>

    <div un-mt-xl>
      <KInput
        v-model="search"
        label="Busque por coleções"
        icon="i-mdi-magnify"
        debounce="1000"
      />
    </div>
  </KLayoutPage>
</template>

<route lang="yaml">
path: /colecoes
meta:
  title: Coleções
</route>

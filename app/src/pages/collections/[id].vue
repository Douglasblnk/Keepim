<script setup lang="ts">
const props = defineProps<{
  id: string
}>()

useHead({ title: computed(() => `Keepim - ${props.id}`) })

const { setCollection } = useCollectionStore()

const { data, isLoading } = useQuery({
  queryKey: [ 'collection', props.id ],
  queryFn: ({ queryKey }) => getCollectionRequest(queryKey[1]),
})

watch(data, setCollection)

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <div
    un-flex="~ col grow"
    un-w="sm:col-8 lg:col-6 col-12"
    un-relative
  >
    <CollectionViewHeader :is-loading="isLoading" />

    <CollectionView :is-loading="isLoading" />
  </div>
</template>

<route lang="yaml">
meta:
  transition: slide-up
  backTransition: slide-down-back
</route>

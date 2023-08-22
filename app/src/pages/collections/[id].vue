<script setup lang="ts">
import { capitalizeFirstLetter, dayjs } from '@utils'

const props = defineProps<{
  id: string
}>()

useHead({ title: computed(() => `Keepim - ${props.id}`) })

const { data, isLoading } = useQuery({
  queryKey: [ 'collection', props.id ],
  queryFn: () => getCollectionRequest(props.id),
})

const collectionDate = computed(() => {
  const dayjsDate = dayjs(data.value?.collectionDate)

  return `
    ${dayjsDate.format('DD')}
    de
    ${capitalizeFirstLetter(dayjsDate.format('MMMM [de] YYYY'))}
  `.trim()
})

provide('collection', data)

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
    <CollectionViewHeader
      :collection-name="data?.collectionName"
      :collection-date="collectionDate"
      :is-loading="isLoading"
    />

    <CollectionView
      :collection="data"
      :is-loading="isLoading"
    />
  </div>
</template>

<route lang="yaml">
meta:
  transition: slide-up
  backTransition: slide-down-back
</route>

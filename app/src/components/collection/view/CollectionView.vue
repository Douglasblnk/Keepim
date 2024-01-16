<script setup lang="ts">
defineProps<{ isLoading: boolean }>()

const containerMarginTop = ref(60)
const tab = ref('photos')
const isDragging = ref(false)

const store = useCollectionStore()

const isPerformingAction = computed(() => {
  return store.isRemoving || store.isAddingCover
})

watch(isPerformingAction, (value) => {
  if (value)
    containerMarginTop.value = -75

  else
    containerMarginTop.value = 60
})

function toggleContainerMargin() {
  if (!isPerformingAction.value)
    containerMarginTop.value = containerMarginTop.value === 60 ? -75 : 60
}
</script>

<template>
  <div
    un-bg-dark-secondary
    un-px-lg
    un-border="rounded-t-36px"
    un-z-10
    un-grow
    un-flex="~ col"
    :un-transition="!isDragging && 'all 0.3s ease'"
    :style="{ marginTop: `${containerMarginTop}px` }"
  >
    <div
      v-show="!isPerformingAction"
      un-flex
      un-justify-center
    >
      <div
        un-w-10
        un-h-10
        un-flex
        un-items-center
        un-justify-center
        un-rounded-full
        un-bg-dark-secondary
        un-cursor="pointer"
        un-mt="-20px"
        @click="toggleContainerMargin"
      >
        <QIcon
          :name="containerMarginTop === 60 ? 'i-mdi-arrow-expand-up' : 'i-mdi-arrow-expand-down'"
          un-text-gray-text
        />
      </div>
    </div>

    <div un-flex="~ col grow">
      <QTabs
        v-model="tab"
        inline-label
        align="justify"
        no-caps
        indicator-color="transparent"
        active-color="primary"
        un-rounded-xl
        un-mb-md
      >
        <QTab
          name="photos"
          icon="i-mdi-image-outline"
          label="Fotos"
        />
        <QTab
          name="info"
          icon="i-mdi-information-outline"
          label="Detalhes"
        />
      </QTabs>

      <QTabPanels
        v-model="tab"
        class="collection-tab-panel"
        animated
        swipeable
        un-bg-transparent
        un-flex
        un-grow
      >
        <QTabPanel
          name="photos"
          un-flex
          un-p-none
        >
          <div un-flex="~ grow">
            <QScrollArea un-grow>
              <CollectionViewPhotosSkeleton v-if="isLoading" />

              <CollectionViewPhotos v-else />
            </QScrollArea>
          </div>
        </QTabPanel>

        <QTabPanel
          name="info"
          un-p-none
          un-flex
        >
          <QScrollArea un-grow>
            <CollectionViewDetailsSkeleton v-if="isLoading" />

            <CollectionViewDetails v-else />
          </QScrollArea>
        </QTabPanel>
      </QTabPanels>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.collection-tab-panel :deep(> div)
  height: auto !important
  flex-grow: 1
</style>

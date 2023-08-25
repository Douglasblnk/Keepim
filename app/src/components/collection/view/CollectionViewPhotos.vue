<script setup lang="ts">
const { collection } = storeToRefs(useCollectionStore())

const isMobile = inject<ComputedRef<boolean>>('isMobile')
const filesToUpload = ref<File[]>([])

const uploaderLabel = computed(() => {
  return isMobile?.value ? 'Clique para selecionar um arquivo' : 'Arraste ou clique selecionar um arquivo'
})

function uploadPhotos() {
  console.log(filesToUpload)
}
</script>

<template>
  <div>
    <div v-if="collection?.photos?.length">
      Photos goes here
    </div>

    <div
      v-else
      un-flex="~ col"
      un-items-center
    >
      <span
        un-mt-3xl
        un-text="xl gray-text"
      >
        Esta coleção está vazia.
      </span>

      <KUploader
        v-model="filesToUpload"
        :label="uploaderLabel"
        un-mt-xl
        un-mx-md
        un-p-2xl
      />

      <Transition
        name="fade"
        mode="out-in"
      >
        <div v-if="filesToUpload.length">
          <QBtn
            label="Fazer upload"
            icon="i-mdi-upload"
            un-mt-lg
            un-bg-primary
            @click="uploadPhotos"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

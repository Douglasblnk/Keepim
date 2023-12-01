<script setup lang="ts">
import { notify } from '@/utils'
import { getErrorMsg } from '@/utils/handle-error'

const store = useCollectionStore()

const { collection, inUploading } = storeToRefs(store)

const isMobile = inject<ComputedRef<boolean>>('isMobile')

const filesToUpload = ref<File[]>([])

const { mutate, isLoading } = useMutation({
  mutationFn: getSignedUploadUrlRequest,
  onError: (error) => {
    notify({
      type: 'negative',
      message: getErrorMsg(error) as string,
    })
  },
  onSuccess: async (data) => {
    if (data !== undefined)
      store.initiatePhotosUploadProcess(data, [ ...filesToUpload.value ])
  },
  onSettled: () => {
    store.uploading[store.collection?.collectionName as string].queue.forEach((item) => {
      item.retryLoading = false
    })
  },
})

const uploaderLabel = computed(() => {
  return isMobile?.value ? 'Clique para selecionar um arquivo' : 'Arraste ou clique selecionar um arquivo'
})

function uploadPhotos() {
  const files = filesToUpload.value.map(file => ({
    name: file.name,
    type: file.type,
    size: file.size,
  }))

  mutate({
    collectionName: collection?.value?.collectionName,
    files,
  })
}

function retryFailedUploads(failures: string[]) {
  const files = filesToUpload.value
    .filter(file => failures.includes(file.name))
    .map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
    }))

  if (files.length) {
    store.uploading[store.collection?.collectionName as string].queue.forEach((item) => {
      if (files.some(file => file.name === item.fileName))
        item.retryLoading = true
    })

    mutate({
      collectionName: collection?.value?.collectionName,
      files,
    })
  }
}

function retryFailedUpload(failed: string) {
  const file = filesToUpload.value.find(file => file.name === failed)

  if (file) {
    store.uploading[store.collection?.collectionName as string].queue.forEach((item) => {
      if (item.fileName === file.name)
        item.retryLoading = true
    })

    mutate({
      collectionName: collection?.value?.collectionName,
      files: [ {
        name: file.name,
        type: file.type,
        size: file.size,
      } ],
    })
  }
}
</script>

<template>
  <div>
    <Transition
      name="fade"
      mode="out-in"
    >
      <div v-if="collection?.photos?.length">
        Photos goes here
      </div>

      <CollectionViewUploadProcess
        v-else-if="inUploading?.isUploading"
        @retry-failed-uploads="retryFailedUploads"
        @retry-failed-upload="retryFailedUpload"
      />

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
              :loading="isLoading"
              @click="uploadPhotos"
            />
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { CollectionResponse, CollectionsResponse } from '@/types'
import { notify } from '@/utils'
import { getErrorMsg } from '@/utils/handle-error'

const isMobile = inject<ComputedRef<boolean>>('isMobile')

const { close } = useDialog()
const { validate } = useForm()
const { push } = useRouter()

const store = useCollectionStore()

const { filesToUpload, collectionName } = storeToRefs(store)

const collection = ref<CollectionsResponse>()

const uploaderLabel = computed(() => {
  return isMobile?.value ? 'Clique para selecionar um arquivo' : 'Arraste ou clique para selecionar um arquivo'
})

const shouldShowCollectionsSelect = computed(() => {
  return collectionName.value === undefined
})

const isUploadBtnDisabled = computed(() => {
  if (shouldShowCollectionsSelect.value)
    return !filesToUpload.value.length || !collection.value

  return !filesToUpload.value.length
})

const { mutate, isPending } = useMutation({
  mutationFn: getSignedUploadUrlRequest,
  onError: (error) => {
    notify({
      type: 'negative',
      message: getErrorMsg(error) as string,
    })
  },
  onSuccess: async (data) => {
    if (data !== undefined) {
      if (shouldShowCollectionsSelect.value) {
        setTimeout(() => {
          push({ path: `/colecoes/${collection.value?.id}` })
        })

        store.setCollection(collection.value as CollectionResponse)
      }

      store.initiatePhotosUploadProcess(data, [ ...filesToUpload.value ])

      close()
    }
  },
  onSettled: () => {
    store.uploading[collectionName.value].queue.forEach((item) => {
      item.retryLoading = false
    })
  },
})

async function uploadPhotos() {
  const { valid } = await validate()

  if (!valid)
    return

  const files = filesToUpload.value.map(file => ({
    name: file.name,
    type: file.type,
    size: file.size,
  }))

  mutate({
    collectionName: collectionName.value || collection.value?.collectionName,
    files,
  })
}

function cancel() {
  store.clearUploadingState()
  close()
}
</script>

<template>
  <div
    un-flex="~ col"
    un-items-center
    un-gap-sm
  >
    <QIcon
      name="i-mdi-image-plus-outline"
      size="xl"
    />

    <span un-title>Adicionar imagens</span>
  </div>

  <div
    v-if="shouldShowCollectionsSelect"
    un-mt-xl
    un-mx-md
    un-space-y-sm
  >
    <label un-font-bold>Para qual coleção deseja adicionar as imagens?</label>

    <KSelectCollection
      v-model="collection"
      vee-rules="required"
    />
  </div>

  <KUploader
    v-model="filesToUpload"
    :label="uploaderLabel"
    vee-rules="required"
    un-mb-xl
    un-mt-sm
    un-mx-md
    un-p-2xl
  />

  <div
    un-mt-md
    un-flex
    un-items-center
    un-gap-sm
  >
    <QBtn
      label="Cancelar"
      color="cancel"
      un-w-full
      :disable="isPending"
      @click="cancel"
    />

    <QBtn
      label="Fazer upload"
      color="primary"
      un-w-full
      :loading="isPending"
      :disable="isUploadBtnDisabled"
      @click="uploadPhotos"
    />
  </div>
</template>

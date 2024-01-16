<script setup lang="ts">
import { notify } from '@/utils'
import { getErrorMsg } from '@/utils/handle-error'

const { setDialog } = useDialog()

const store = useCollectionStore()

const queryClient = useQueryClient()

const {
  collection,
  inUploading,
  collectionName,
  filesToUpload,
} = storeToRefs(store)

const isMobile = inject<ComputedRef<boolean>>('isMobile')

const ImgListingRef = ref<HTMLDivElement | null>()
const toBeCover = ref()
const toBeRemoved = ref<Record<string, string>>({})

const { folderSize } = useListSize(ImgListingRef, 16)

const { mutate, isPending } = useMutation({
  mutationFn: getSignedUploadUrlRequest,
  onError,
  onSuccess: async (data) => {
    if (data !== undefined)
      store.initiatePhotosUploadProcess(data, [ ...filesToUpload.value ])
  },
  onSettled: () => {
    store.uploading[collectionName.value].queue.forEach((item) => {
      item.retryLoading = false
    })
  },
})

const { mutate: updateCover, isPending: isLoadingCover } = useMutation({
  mutationFn: updateCollectionCoverRequest,
  onError,
  onSuccess: data => (data === true) && invalidateQueries(),
  onSettled: cancelAddCover,
})

const { mutate: deletePhotos, isPending: isLoadingDeletion } = useMutation({
  mutationFn: deleteCollectionPhotoRequest,
  onError,
  onSuccess: data => (data === true) && invalidateQueries(),
  onSettled: () => {
    store.isRemoving = false
  },
})

function onError(error: unknown) {
  notify({
    type: 'negative',
    message: getErrorMsg(error) as string,
  })
}

function invalidateQueries() {
  queryClient.invalidateQueries({ queryKey: [ 'collection', collection?.value?.id ] })
  queryClient.resetQueries({ queryKey: [ 'collections-list' ] })
}

const uploaderLabel = computed(() => {
  return isMobile?.value ? 'Clique para selecionar um arquivo' : 'Arraste ou clique para selecionar um arquivo'
})

function uploadPhotos() {
  const files = filesToUpload.value.map(file => ({
    name: file.name,
    type: file.type,
    size: file.size,
  }))

  mutate({
    collectionName: collectionName.value,
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
    store.uploading[collectionName.value].queue.forEach((item) => {
      if (files.some(file => file.name === item.fileName))
        item.retryLoading = true
    })

    mutate({
      collectionName: collectionName.value,
      files,
    })
  }
}

function removeFailedUpload(fileName: string) {
  const queueIndex = store.uploading[collectionName.value].queue.findIndex((queueFile) => {
    return queueFile.fileName === fileName
  })

  const fileIndex = filesToUpload.value.findIndex((file) => {
    return file.name === fileName
  })

  store.uploading[collectionName.value].queue.splice(queueIndex, 1)
  filesToUpload.value.splice(fileIndex, 1)
}

function executePhotoActions(photo: string, index: number) {
  if (store.isAddingCover)
    toBeCover.value = `${photo} ${index}`

  if (!store.isAddingCover && !store.isRemoving) {
    setDialog({
      component: 'ShowPhotoDialog',
      props: { photo, photoName: getPhotoName(photo) },
      modalProps: {
        noCard: true,
      },
    })
  }
}

function cancelAddCover() {
  toBeCover.value = undefined
  store.isAddingCover = false
}

function cancelDeletion() {
  toBeRemoved.value = {}
  store.isRemoving = false
}

function getPhotoKey(photo: string) {
  const decodedPhoto = decodeURI(photo)

  return decodedPhoto.split('?')[0].split('.com/')[1]
}

function getPhotoName(photo: string) {
  const key = getPhotoKey(photo)

  return key.split('/').pop()
}

function defineAsCover() {
  const photo = toBeCover.value.substring(0, toBeCover.value.lastIndexOf(' '))

  const coverKey = getPhotoKey(photo)

  updateCover({ coverKey, collectionId: collection?.value?.id })
}

function togglePhotoRemove(photo: string, index: number) {
  const photoKey = getPhotoKey(photo)

  if (toBeRemoved.value[`${photo} ${index}`])
    delete toBeRemoved.value[`${photo} ${index}`]

  else
    toBeRemoved.value[`${photo} ${index}`] = photoKey
}

const isAllPhotosMarkedToBeRemoved = computed(() => {
  const markedPhotos = Object.values(toBeRemoved.value)

  return collection?.value?.photos?.every((photo) => {
    const photoKey = getPhotoKey(photo)

    return markedPhotos.includes(photoKey)
  })
})

function toggleAllToBeRemoved() {
  if (isAllPhotosMarkedToBeRemoved.value) {
    toBeRemoved.value = {}
  }

  else {
    for (const [ index, photo ] of collection?.value?.photos?.entries() || []) {
      const photoKey = getPhotoKey(photo)

      toBeRemoved.value[`${photo} ${index}`] = photoKey
    }
  }
}

async function removePhoto() {
  const photoKeys = Object.values(toBeRemoved.value)

  deletePhotos({ photoKeys, collectionId: collection?.value?.id })
}

function addCoverQuickAction(photo: string) {
  const coverKey = getPhotoKey(photo)

  updateCover({ coverKey, collectionId: collection?.value?.id })
}

function removePhotoQuickAction(photo: string) {
  setDialog({
    component: 'RemovePhotoConfirmDialog',
    props: {
      callback: () => {
        const photoKeys = [ getPhotoKey(photo) ]

        deletePhotos({ photoKeys, collectionId: collection?.value?.id })
      },
      photo,
      isLoadingDeletion,
    },
  })
}
</script>

<template>
  <div>
    <Transition
      name="fade"
      mode="out-in"
    >
      <div v-if="collection?.photos?.length && !inUploading?.isUploading">
        <div
          ref="ImgListingRef"
          un-w-full
          un-flex="~ wrap"
          un-gap-md
          un-pb-4xl
        >
          <div
            un-w-full
            un-mx-auto
            un-bg-dark-secondary
            un-sticky
            un-top-0
            un-z-1
          >
            <QSlideTransition>
              <div
                v-if="store.isAddingCover"
                un-flex="~ col"
                un-items-center
              >
                <span
                  un-text="md center"
                  un-py-md
                  un-font-bold
                >
                  Selecione a imagem que deseja para ser a capa da coleção.
                </span>

                <div
                  un-flex
                  un-gap-sm
                  un-pb-md
                >
                  <QBtn
                    label="Concluir"
                    color="primary"
                    :disabled="!toBeCover"
                    :loading="isLoadingCover"
                    @click="defineAsCover"
                  />

                  <QBtn
                    label="Cancelar"
                    color="cancel"
                    :loading="isLoadingCover"
                    @click="cancelAddCover"
                  />
                </div>
              </div>
            </QSlideTransition>

            <QSlideTransition>
              <div
                v-if="store.isRemoving"
                un-flex="~ col"
                un-items-center
              >
                <span
                  un-text="md center"
                  un-py-md
                  un-font-bold
                >
                  Selecione as imagens que deseja remover da coleção
                </span>

                <div
                  un-flex
                  un-gap-sm
                  un-pb-md
                >
                  <QBtn
                    label="Remover imagens"
                    color="primary"
                    :disabled="!Object.keys(toBeRemoved).length"
                    :loading="isLoadingDeletion"
                    @click="removePhoto"
                  />

                  <QBtn
                    :label="isAllPhotosMarkedToBeRemoved ? 'Desmarcar todas' : 'Selecionar todas'"
                    color="accent"
                    :loading="isLoadingDeletion"
                    @click="toggleAllToBeRemoved"
                  />

                  <QBtn
                    label="Cancelar"
                    color="cancel"
                    :loading="isLoadingDeletion"
                    @click="cancelDeletion"
                  />
                </div>
              </div>
            </QSlideTransition>
          </div>

          <div
            v-for="(photo, index) in collection.photos"
            :key="`photo-${index}`"
          >
            <QImg
              :src="photo"
              ratio="1"
              :style="folderSize"
              :un-opacity="store.isAddingCover && toBeCover !== `${photo} ${index}` ? '30' : ''"
              un-max-w-200px
              un-max-h-200px
              un-min-w-85px
              un-min-h-85px
              un-rounded-2xl
              un-shadow
              :un-hover="store.isRemoving ? '' : 'scale-95'"
              :un-cursor="store.isRemoving ? '' : 'pointer'"
              un-transition
              class="img-listing"
              @click="executePhotoActions(photo, index)"
            >
              <CollectionViewHeaderOptions
                hide-title
                context-menu
                @add-cover-action="addCoverQuickAction(photo)"
                @remove-photo-action="removePhotoQuickAction(photo)"
              />

              <QInnerLoading :showing="isLoadingCover" />

              <Transition
                name="fade"
                mode="out-in"
              >
                <div
                  v-if="store.isRemoving"
                  un-flex
                  un-items-center
                  un-justify-center
                  un-rounded-full
                  un-cursor-pointer
                  un-mb-md
                  :un-bg="toBeRemoved[`${photo} ${index}`] ? '!positive' : '!negative'"
                  un-p="!sm"
                  @click="togglePhotoRemove(photo, index)"
                >
                  <QIcon
                    :name="toBeRemoved[`${photo} ${index}`] ? 'i-mdi-check' : 'i-mdi-delete'"
                    size="sm"
                  />
                </div>
              </Transition>
            </QImg>
          </div>
        </div>
      </div>

      <CollectionViewUploadProcess
        v-else-if="inUploading?.isUploading"
        @retry-failed-uploads="retryFailedUploads"
        @remove-failed-upload="removeFailedUpload"
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
              :loading="isPending"
              @click="uploadPhotos"
            />
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style lang="sass" scoped>
.img-listing
  :deep(> .q-img__content)
    display: flex
    justify-content: center
    align-items: end

    > div
      background: none
</style>

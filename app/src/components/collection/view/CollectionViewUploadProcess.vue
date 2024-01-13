<script setup lang="ts">
const emit = defineEmits<{
  retryFailedUploads: [failed: string[]]
  retryFailedUpload: [failed: string]
  removeFailedUpload: [remove: string]
}>()

const store = useCollectionStore()

const { inUploading } = storeToRefs(store)

const uploadingImgsRef = ref<HTMLDivElement | null>()

const { folderSize } = useListSize(uploadingImgsRef, 16)

function createImgFromFile({ file }: { file: File }) {
  const url = URL.createObjectURL(file)

  return url
}

function retryFailedUploads() {
  emit('retryFailedUploads', inUploading.value.errors)
}

function removeFailedUpload({ fileName }: { fileName: string }) {
  emit('removeFailedUpload', fileName)
}

function cancelUpload() {
  store.cancelUpload()
}

function cancelFailedAndFinish() {
  store.finishUpload()
}

function hasError({ fileName }: { fileName: string }) {
  return inUploading.value.errors.includes(fileName)
}
</script>

<template>
  <div
    un-flex="~ col"
    un-items-center
  >
    <span
      v-if="!inUploading.errors.length && !inUploading.isPersisting"
      un-text="xl gray-text center"
    >
      Aguarde enquanto o upload está sendo realizado...
    </span>

    <span
      v-else-if="inUploading.isPersisting"
      un-text="xl gray-text center"
      un-my-lg
    >
      Finalizando o envio das fotos...
    </span>

    <span
      v-else
      un-text="xl gray-text center"
    >
      Ocorreu um erro ao enviar os arquivos:
    </span>

    <div
      v-if="inUploading.isPersisting"
      un-w-full
      un-flex
      un-justify-center
      un-items-center
      un-mb-lg
    >
      <QLinearProgress
        color="primary"
        un-w-col-5
        indeterminate
      />
    </div>

    <QBtn
      v-if="!inUploading.errors.length && !inUploading.isPersisting"
      label="Cancelar envio"
      color="negative"
      un-my-3xl
      @click="cancelUpload"
    />

    <div
      v-if="inUploading.errors.length && !inUploading.isPersisting"
      un-w-full
      un-flex="~ wrap"
      un-items-center
      un-justify-center
      un-gap-md
      un-my-3xl
    >
      <QBtn
        label="Tentar novamente os arquivos com erro"
        color="cancel"
        @click="retryFailedUploads"
      />

      <QBtn
        label="Ignorar arquivos com erro e finalizar"
        color="primary"
        @click="cancelFailedAndFinish"
      />
    </div>

    <div
      ref="uploadingImgsRef"
      un-w-full
      un-flex="~ wrap"
      un-gap-md
    >
      <div
        v-for="(uploadItem, index) of inUploading.queue"
        :key="`uploading-${index}-${uploadItem.fileName}`"
      >
        <QImg
          :src="createImgFromFile(uploadItem)"
          ratio="1"
          :style="folderSize"
          un-max-w-200px
          un-max-h-200px
          un-min-w-85px
          un-min-h-85px
          un-rounded-2xl
          un-shadow
          class="uploading-img"
          :class="hasError(uploadItem) && 'uploading-img--error'"
        >
          <div
            v-if="hasError(uploadItem)"
            un-flex
            un-items-center
            un-justify-center
            un-rounded-full
            un-cursor-pointer
            un-mb-md
            un-bg="!negative"
            un-p="!sm"
            @click="removeFailedUpload(uploadItem)"
          >
            <QIcon
              name="i-mdi-delete"
              size="sm"
            />
          </div>

          <div
            v-else
            un-relative
            un-flex
            un-items-center
            un-justify-center
            un-rounded-full
            un-w-col-8
            un-py="!sm"
            un-mb-md
            un-overflow-hidden
            un-backdrop-blur-3px
            style="background: rgba(160, 160, 160, 0.24);"
          >
            <span
              v-if="!inUploading.isPersisting"
              un-z-1
              un-text-sm
              un-font-bold
            >
              {{ inUploading.progressPct[uploadItem.fileName] }}%
            </span>

            <span
              v-else
              un-z-1
              un-text-sm
              un-font-bold
            >
              <QIcon name="i-mdi-check" />
            </span>

            <div
              un-absolute
              un-top-0
              un-left-0
              un-h-full
              un-bg="positive/60"
              :style="{ width: `${inUploading.progressPct[uploadItem.fileName]}%` }"
            />
          </div>
        </QImg>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.uploading-img
  :deep(> .q-img__content)
    display: flex
    justify-content: center
    align-items: end

    > div
      background: none

  &--error
    :deep(> .q-img__content)
      background: rgba(245,108,108,0.2) !important
</style>

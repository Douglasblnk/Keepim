<script setup lang="ts">
const emit = defineEmits<{
  retryFailedUploads: [failed: string[]]
  retryFailedUpload: [failed: string]
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

function retryFailedUpload({ fileName }: { fileName: string }) {
  emit('retryFailedUpload', fileName)
}

function cancelUpload() {
  store.cancelUpload()
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
      v-if="!inUploading.errors.length"
      un-text="xl gray-text center"
    >
      Aguarde enquanto o upload está sendo realizado...
    </span>

    <span
      v-else
      un-text="xl gray-text center"
    >
      Ocorreu um erro ao enviar os arquivos:
    </span>

    <QBtn
      v-if="!inUploading.errors.length"
      label="Cancelar envio"
      color="negative"
      un-my-3xl
      @click="cancelUpload"
    />

    <div
      v-else
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
        @click="cancelUpload"
      />
    </div>

    <div
      ref="uploadingImgsRef"
      un-w-full
      un-flex="~ wrap"
      un-gap-md
    >
      <div
        v-for="(uploading, index) of inUploading.queue"
        :key="`uploading-${index}`"
      >
        <QImg
          :src="createImgFromFile(uploading)"
          ratio="1"
          :style="folderSize"
          un-max-w-200px
          un-max-h-200px
          un-min-w-85px
          un-min-h-85px
          un-rounded-2xl
          un-shadow
          class="uploading-img"
          :class="hasError(uploading) && 'uploading-img--error'"
        >
          <div
            v-if="hasError(uploading)"
            un-flex
            un-items-center
            un-justify-center
            un-rounded-full
            un-cursor-pointer
            un-mb-md
            un-bg="!negative"
            un-p="!sm"
            @click="retryFailedUpload(uploading)"
          >
            <QIcon
              name="i-mdi-delete"
              size="sm"
              :class="uploading.retryLoading && 'animate-spin'"
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
              un-z-1
              un-text-sm
              un-font-bold
            >
              {{ inUploading.progressPct[uploading.fileName] }}%
            </span>

            <div
              un-absolute
              un-top-0
              un-left-0
              un-h-full
              un-bg="positive/60"
              :style="{ width: `${inUploading.progressPct[uploading.fileName]}%` }"
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
      background: rgba(245,108,108,0.1) !important
</style>

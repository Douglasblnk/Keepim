<script setup lang="ts">
const { label = 'Selecione um arquivo' } = defineProps<{
  label?: string
}>()

const emit = defineEmits<{
  inserted: [ files: FileList ]
}>()

const modelValue = defineModel<File[]>({ default: [] })

const inputRef = ref<HTMLInputElement>()
const filesUrl = ref<string[]>([])

const reducedImagesBlob = computed(() => {
  const copiedImagesBlob = [ ...filesUrl.value ]

  return copiedImagesBlob.splice(0, 5)
})

function createFilesUrl(files: File[]) {
  filesUrl.value = []

  for (const file of files)
    filesUrl.value.push(URL.createObjectURL(file))
}

function saveFiles(event: any) {
  const files = event.target.files

  if (!files)
    return

  modelValue.value = [ ...files ]

  createFilesUrl(files)

  emit('inserted', files)
}

function clear() {
  modelValue.value = []
  filesUrl.value = []
}

onMounted(() => {
  if (modelValue.value.length)
    createFilesUrl(modelValue.value)
})
</script>

<template>
  <div
    un-relative
    un-border="~ dashed gray-text"
    un-p-2xl
    un-rounded-2xl
    :un-cursor="modelValue.length ? 'auto' : 'pointer'"
    un-flex="~ col"
    un-justify-center
    un-items-center
    @click="inputRef?.click()"
  >
    <template v-if="!modelValue.length">
      <input
        ref="inputRef"
        type="file"
        accept="image/png, image/jpeg"
        multiple
        un-display-none
        @change="saveFiles"
      >

      <QIcon
        name="i-mdi-cloud-upload"
        size="4rem"
      />

      <span
        un-mt-md
        un-text-center
      >
        {{ label }}
      </span>
    </template>

    <div
      v-else
      un-flex
      un-flex-wrap
      un-justify-center
      un-w-full
    >
      <QImg
        v-for="(image, index) in reducedImagesBlob"
        :key="`image-blob-${index}`"
        class="image-blob-preview"
        un-w-50px
        ratio="1"
        un-shadow
        un-rounded-full
        :src="image"
      />

      <div
        v-if="filesUrl.length > 5"
        un-w-50px
        un-h-50px
        un-ml-sm
        un-flex
        un-justify-center
        un-items-center
        un-rounded-full
        un-bg-gray-500
        un-z-marginals
      >
        <p un-text-white>
          + {{ filesUrl.length - 5 }}
        </p>
      </div>
    </div>

    <div
      v-if="modelValue.length"
      un-bg-negative
      un-w-30px
      un-h-30px
      un-m="t--10px r--10px"
      un-flex
      un-justify-center
      un-items-center
      un-rounded-full
      un-cursor-pointer
      un-absolute
      un-top-0
      un-right-0
      @click.stop="clear"
    >
      <QIcon name="i-mdi-close" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.image-blob-preview:not(:first-child)
  margin-left: -16px
</style>

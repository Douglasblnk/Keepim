<script setup lang="ts">
const {
  label = 'Selecione um arquivo',
  icon = 'i-mdi-cloud-upload',
  iconSize = '4rem',
  dense,
} = defineProps<{
  label?: string
  icon?: string
  iconSize?: string
  dense?: boolean
}>()

const emit = defineEmits<{
  inserted: [ files: FileList ]
}>()

const modelValue = defineModel<File[]>({ default: [] })

const inputRef = ref<HTMLInputElement>()
const filesUrl = ref<string[]>([])
const dragEnter = ref(false)

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

function onDropFile(event: DragEvent) {
  event.preventDefault()

  dragEnter.value = false

  const files = {
    target: {
      files: event.dataTransfer?.files,
    },
  }

  saveFiles(files)
}

onMounted(() => {
  if (modelValue.value.length)
    createFilesUrl(modelValue.value)
})
</script>

<template>
  <div
    un-relative
    un-border="~ dashed"
    :un-p="dense ? 'sm' : '2xl'"
    un-rounded-2xl
    :un-cursor="modelValue.length ? 'auto' : 'pointer'"
    un-flex="~ col"
    un-justify-center
    un-items-center
    un-transition
    :class="dragEnter ? 'border-primary bg-primary/20' : 'border-gray-text'"
    @dragover.prevent="dragEnter = true"
    @dragleave.prevent="dragEnter = false"
    @drop.prevent="onDropFile"
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
        :name="icon"
        :size="iconSize"
        un-pointer-events-none
      />

      <span
        un-mt-md
        un-text-center
        un-pointer-events-none
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
        :un-w="dense ? '40px' : '50px'"
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

<script setup lang="ts">
import { notify } from '@/utils'

const props = defineProps<{
  photo: string
  photoName: string
  showCollectionName?: boolean
}>()

const { screen } = useQuasar()
const { close } = useDialog()
const { collection } = storeToRefs(useCollectionStore())

const isMobile = inject<ComputedRef<boolean>>('isMobile')

const imgDimension = ref({
  width: 0,
  height: 0,
})

const { mutate, isPending } = useMutation({
  mutationFn: downloadPhoto,
  onError: (photoName) => {
    notify({
      type: 'negative',
      message: `Não foi possível fazer o download da imagem ${photoName}`,
    })
  },
})

onMounted(() => {
  const img = new Image()

  img.addEventListener('load', (params: { target: any }) => {
    const { width, height } = params.target

    let newWidth, newHeight

    const screenAspectRatio = screen.width / screen.height
    const imageAspectRatio = width / height

    if (imageAspectRatio > screenAspectRatio) {
      newWidth = screen.width * ((width > height) ? 0.8 : 0.7)
      newHeight = newWidth / imageAspectRatio
    }

    else {
      newHeight = screen.height * 0.7
      newWidth = newHeight * imageAspectRatio
    }

    newWidth = Math.min(newWidth, width)
    newHeight = Math.min(newHeight, height)

    imgDimension.value = { width: newWidth, height: newHeight }
  }, false)

  img.setAttribute('src', props.photo)
})
</script>

<template>
  <div
    :un-max-w="isMobile ? '' : '!none'"
    class="show-photo-container"
  >
    <div
      un-font-black
      un-text-center
      un-mb-md
      un-line-clamp-1
      :un-text="isMobile ? 'md' : 'lg'"
    >
      {{ showCollectionName ? collection?.collectionName : photoName }}
    </div>

    <div
      un-grow
      un-flex
      un-items-center
      :style="{
        width: `${imgDimension.width}px`,
        height: `${imgDimension.height}px`,
      }"
    >
      <QImg
        :src="photo"
        un-rounded-lg
      />
    </div>

    <div
      un-flex
      un-items-center
      un-justify-center
      un-gap-sm
      :un-m="isMobile ? 't-md' : 'y-md'"
    >
      <QBtn
        color="download"
        icon="i-mdi-download"
        un-rounded-full
        un-text-md
        un-p-none
        round
        :loading="isPending"
        @click="mutate({ photo, photoName })"
      />

      <QBtn
        color="primary"
        un-rounded-full
        un-p-none
        round
        un-text-md
        icon="i-mdi-close"
        @click="close"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.show-photo-container
  @apply border-none bg-transparent backdrop-filter-none rounded-none backdrop-filter-none
  @apply h-screen flex flex-col items-center
</style>

import { useScreenOrientation } from '@vueuse/core'

const folderSize = reactive({
  width: '',
  height: '',
})

const sizesEnum = {
  xs: 3,
  sm: 3,
  md: 4,
  lg: 4,
  xl: 5,
}

export default (foldersWrapper: Ref<HTMLDivElement | null | undefined>, spaceBetween: number) => {
  const miniState = inject<ComputedRef<boolean>>('miniState')

  const { orientation } = useScreenOrientation()
  const $q = useQuasar()

  function calcFolderSize() {
    if (foldersWrapper.value?.clientWidth) {
      const size = (foldersWrapper.value?.clientWidth / sizesEnum[$q.screen.name]) - spaceBetween

      folderSize.width = `${size}px`
      folderSize.height = `${size}px`
    }
  }

  watch(
    () => [ $q.screen.width, foldersWrapper.value, miniState?.value, orientation.value ],
    calcFolderSize,
  )

  return {
    folderSize,
  }
}

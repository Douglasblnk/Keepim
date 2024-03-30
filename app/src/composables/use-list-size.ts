import { useScreenOrientation } from '@vueuse/core'

const sizesEnum = {
  xs: 3,
  sm: 3,
  md: 4,
  lg: 4,
  xl: 5,
}

const sizesEnumIncreased = {
  xs: 3,
  sm: 4,
  md: 5,
  lg: 5,
  xl: 6,
}

export default (foldersWrapper: Ref<HTMLDivElement | null | undefined>, spaceBetween: number, increase?: boolean) => {
  const folderSize = reactive({
    width: '',
    height: '',
  })

  const folderQtd = ref()

  const miniState = inject<ComputedRef<boolean>>('miniState')

  const { orientation } = useScreenOrientation()

  const $q = useQuasar()

  function calcFolderSize() {
    folderQtd.value = increase ? sizesEnumIncreased[$q.screen.name] : sizesEnum[$q.screen.name]

    if (foldersWrapper.value?.clientWidth) {
      const size = (foldersWrapper.value?.clientWidth / folderQtd.value) - (spaceBetween || 0)

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
    folderQtd,
  }
}

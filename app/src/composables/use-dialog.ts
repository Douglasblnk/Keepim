import { eventHook } from '@/utils/utils'

interface DialogOptions {
  component: string
  modalProps?: Record<string, unknown>
  props?: Record<string, unknown>
}

const isOpen = ref(false)
const componentName = ref('')
const dialogProps = ref({})
const componentProps = ref({})

const onEvent = eventHook()

export default () => {
  const componentInstance = shallowRef()

  const close = () => {
    isOpen.value = false
    componentName.value = ''
    dialogProps.value = {}
    componentProps.value = {}
  }

  const setDialog = ({ component, modalProps, props }: DialogOptions) => {
    isOpen.value = true
    componentName.value = component
    dialogProps.value = modalProps || {}
    componentProps.value = props || {}

    return {
      close,
      emit: onEvent.on,
    }
  }

  const emit = (event: string, values?: any) => {
    onEvent.trigger(event, values)
  }

  watch(
    () => componentName.value,
    (value) => {
      componentInstance.value = defineAsyncComponent(() => import(`@/components/core/dialogs/${value}.vue`))
    },
    { immediate: true },
  )

  watch(
    () => isOpen.value,
    (value) => {
      document.body.style.overflow = value ? 'hidden' : ''
    },
  )

  return {
    setDialog,
    close,
    emit,
    dialogProps,
    componentProps,
    isOpen,
    componentName,
    componentInstance,
  }
}

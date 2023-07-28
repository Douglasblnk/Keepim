import { useStorage } from '@vueuse/core'

type States = 'user-info'

interface StorageState {
  'user-info': {
    username: string
    name: string
    email: string
    avatar: string
  }
}

const storageState: Ref<Record<string, any>> = ref({})

const { length: _, ...items } = localStorage

Object.entries(items).forEach(([ key, value ]) => {
  storageState.value[key] = useStorage(key, value)
})

export default () => {
  const setStorageState = (stateKey: States, content: any) => {
    storageState.value[stateKey] = useStorage(stateKey, content)
  }

  const getStorageState = <T extends keyof StorageState>(stateKey: States): StorageState[T] => {
    const state = storageState.value[stateKey]

    return typeof state === 'string' ? JSON.parse(state) : state
  }

  const deleteStorageState = (stateKey: States) => {
    storageState.value[stateKey] = null
  }

  const userStorage = computed(() => getStorageState('user-info'))

  return {
    setStorageState,
    getStorageState,
    deleteStorageState,
    userStorage,
  }
}

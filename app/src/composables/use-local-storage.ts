import { useStorage } from '@vueuse/core'

interface StorageState {
  'user-info': {
    username: string
    name: string
    email: string
    avatar: string
  }
  'drawer-mini-state': boolean
}

const storageState = ref<Partial<Record<keyof StorageState, any>>>({})

const { length: _, ...items } = localStorage

Object.entries(items).forEach(([ key, value ]) => {
  storageState.value[key as keyof StorageState] = useStorage(key, value)
})

export default () => {
  const setStorageState = (stateKey: keyof StorageState, content: any) => {
    storageState.value[stateKey] = useStorage(stateKey, content)
  }

  const getStorageState = <T extends keyof StorageState>(stateKey: keyof StorageState): StorageState[T] => {
    const state = storageState.value[stateKey]

    return typeof state === 'string' ? JSON.parse(state) : state
  }

  const deleteStorageState = (stateKey: keyof StorageState) => {
    storageState.value[stateKey] = null
  }

  const userStorage = computed(() => getStorageState('user-info') || {})

  return {
    setStorageState,
    getStorageState,
    deleteStorageState,
    userStorage,
    storageState,
  }
}

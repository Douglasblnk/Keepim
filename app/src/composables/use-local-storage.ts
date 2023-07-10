import { useStorage } from '@vueuse/core'

const storageState: Ref<Record<string, any>> = ref({})

const { length: _, ...items } = localStorage

Object.entries(items).forEach(([ key, value ]) => {
  storageState.value[key] = useStorage(key, value)
})

export default () => {
  const setStorageState = (stateKey: string, content: any) => {
    storageState.value[stateKey] = useStorage(stateKey, content)
  }

  const getStorageState = (stateKey: string) => {
    return storageState.value[stateKey]
  }

  const deleteStorageState = (stateKey: string) => {
    storageState.value[stateKey] = null
  }

  return {
    setStorageState,
    getStorageState,
    deleteStorageState,
  }
}

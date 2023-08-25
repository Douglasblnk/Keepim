import { defineStore } from 'pinia'
import type { CollectionResponse } from '../types'

interface State {
  collection?: CollectionResponse
}

export const useCollectionStore = defineStore('collection-store', {
  state: (): State => ({
    collection: undefined,
  }),
  actions: {
    setCollection(collection: CollectionResponse | undefined) {
      this.collection = collection
    },
  },
})

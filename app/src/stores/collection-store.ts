import { defineStore } from 'pinia'

import type { CollectionResponse } from '@/types'

interface State {
  collections: CollectionResponse[]
}

export const useCollectionStore = defineStore('collection-store', {
  state: (): State => ({
    collections: [],
  }),
  actions: {
    addCollection(collection) {
      this.collections.push(collection)
    },
  },
})

import type { CollectionModel } from '@model/collection'

export interface CollectionDTO {
  collectionName: string
  collectionDate: string
}

export const collectionDto = (collection: CollectionModel): CollectionDTO => {
  return {
    collectionName: collection.collectionName,
    collectionDate: collection.collectionDate,
  }
}

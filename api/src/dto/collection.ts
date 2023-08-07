import type { CollectionModel } from '@model/collection'
import type { EvaluatedKeyPagination } from '@model/pagination'

export interface CollectionDTO {
  collectionName: string
  collectionDate: string
}

export const collectionDTO = (collection: CollectionModel): CollectionDTO => {
  return {
    collectionName: collection?.collectionName,
    collectionDate: collection?.collectionDate,
  }
}

export const collectionsListDTO = (collections: EvaluatedKeyPagination<CollectionModel[]>): EvaluatedKeyPagination<CollectionDTO[]> => {
  return {
    ...collections,
    data: collections.data.map(collectionDTO),
  }
}

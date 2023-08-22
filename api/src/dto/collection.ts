import type { CollectionModel } from '@model/collection'
import type { EvaluatedKeyPagination } from '@model/pagination'

export interface CompactCollectionDTO {
  id: string
  collectionName: string
  collectionDate: string
}

export type CollectionDTO = Omit<CollectionModel, 'createdAt' | 'updatedAt' | 'deleted'>

export const compactCollectionDTO = (collection: CollectionModel): CompactCollectionDTO => {
  return {
    id: collection?.id,
    collectionName: collection?.collectionName,
    collectionDate: collection?.collectionDate,
  }
}

export const collectionDTO = (collection: CollectionModel): CollectionDTO => {
  return {
    id: collection?.id,
    collectionName: collection?.collectionName,
    collectionDate: collection?.collectionDate,
    description: collection?.description,
    equipments: collection?.equipments,
    participants: collection?.participants,
    place: collection?.place,
  }
}

export const collectionsListDTO = (collections: EvaluatedKeyPagination<CollectionModel[]>): EvaluatedKeyPagination<CompactCollectionDTO[]> => {
  return {
    ...collections,
    data: collections.data.map(compactCollectionDTO),
  }
}

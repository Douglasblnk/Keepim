import type { CollectionModel } from '@model/collection'
import type { EvaluatedKeyPagination } from '@model/pagination'

export interface CompactCollectionDTO {
  id: string
  collectionName: string
  collectionDate: string
  thumbnail?: string
}

export interface PhotosDTO {
  photos: {
    imgs: string[]
    thumbnails: string[]
  }
}

export type CollectionDTO = Omit<CollectionModel, 'createdAt' | 'updatedAt' | 'deleted' | 'photos'> & PhotosDTO

export const compactCollectionDTO = (collection: CollectionModel): CompactCollectionDTO => {
  return {
    id: collection?.id,
    collectionName: collection?.collectionName,
    collectionDate: collection?.collectionDate,
    thumbnail: collection?.cover,
  }
}

export const collectionDTO = (collection: Omit<CollectionModel, 'photos'> & PhotosDTO): CollectionDTO => {
  return {
    id: collection?.id,
    collectionName: collection?.collectionName,
    collectionDate: collection?.collectionDate,
    photos: collection?.photos,
    cover: collection?.cover,
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

import { v4 as uuid } from 'uuid'
import { getCurrentDate } from '@utils/utils'

export interface CollectionModel {
  id: string
  username: string
  collectionName: string
  collectionDate: string
  createdAt: number
  updatedAt: number
  deleted: boolean
}

export const createCollectionModel = (collection: Omit<CollectionModel, 'id' | 'deleted' | 'createdAt' | 'updatedAt'>): CollectionModel => {
  const currentTimestamp = getCurrentDate()

  return {
    id: uuid(),
    username: collection.username,
    collectionName: collection.collectionName,
    collectionDate: collection.collectionDate,
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
    deleted: false,
  }
}

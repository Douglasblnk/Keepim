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

export const createCollectionModel = (
  collection: Omit<CollectionModel, 'username' | 'id' | 'deleted' | 'createdAt' | 'updatedAt'>,
  username: string,
): CollectionModel => {
  const currentTimestamp = getCurrentDate()

  return {
    id: uuid(),
    username,
    collectionName: collection.collectionName,
    collectionDate: collection.collectionDate,
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
    deleted: false,
  }
}

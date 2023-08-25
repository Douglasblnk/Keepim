import { v4 as uuid } from 'uuid'
import { getCurrentDate } from '@utils/utils'

interface Equipment {
  type: string
  name: string
}

export interface CollectionModel {
  id: string
  username?: string
  collectionDate: string
  collectionName: string
  description?: string
  equipments?: Equipment[]
  participants?: string[]
  place?: string
  createdAt?: number
  updatedAt?: number
  deleted?: boolean
}

export const createCollectionModel = (collection: Omit<CollectionModel, 'id' | 'deleted' | 'createdAt' | 'updatedAt'>): CollectionModel => {
  const currentTimestamp = getCurrentDate()

  return {
    id: uuid(),
    username: collection?.username,
    collectionName: collection.collectionName.trim(),
    collectionDate: collection.collectionDate,
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
    deleted: false,
  }
}

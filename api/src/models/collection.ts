import { v4 as uuid } from 'uuid'
import { getCurrentDate } from '@utils/utils'

export interface Equipment {
  type: string
  name: string
}

export interface CollectionModel {
  id: string
  username: string
  collectionDate: string
  collectionName: string
  searchName: string
  description?: string
  equipments?: Equipment[]
  participants?: string[]
  photos?: string[]
  cover?: string
  place?: string
  favorite?: number
  fixed?: number
  fixedOrder?: string
  favoriteCollectionDate?: string
  createdAt?: number
  updatedAt?: number
  deleted?: boolean
}

export const createCollectionModel = (collection: Omit<CollectionModel, 'id' | 'deleted' | 'createdAt' | 'updatedAt' | 'searchName'>): CollectionModel => {
  const currentTimestamp = getCurrentDate()

  return {
    id: uuid(),
    username: collection.username,
    collectionName: collection.collectionName,
    searchName: collection.collectionName.toLowerCase(),
    collectionDate: collection.collectionDate,
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
    deleted: false,
  }
}

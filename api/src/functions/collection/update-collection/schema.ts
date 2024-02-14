import type { Equipment } from '@model/collection'

export interface UpdateCollectionSchemaPathParams {
  id: string
}

export interface UpdateCollectionSchemaBody {
  collectionName: string
  collectionDate: string
  description?: string
  equipments?: Equipment[]
  participants?: string[]
  place?: string
  username?: string
}

import { collectionDTO } from '@dto/collection'
import type { CollectionSchemaPathParams } from '@functions/collection/get-collection/schema'
import { getCollection } from '@repository/collection'

export default async (username: string, params: CollectionSchemaPathParams) => {
  const collection = await getCollection(username, params.id)

  return collectionDTO(collection)
}

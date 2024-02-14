import type { UpdateCollectionSchemaBody } from '@functions/collection/update-collection/schema'
import type { CollectionModel } from '@model/collection'
import { getCollection, putCollection } from '@repository/collection'

export default async (data: UpdateCollectionSchemaBody, collectionId: string) => {
  const { username, ...newCollectionData } = data

  const collection = await getCollection(username, collectionId)

  const updatedCollection: CollectionModel = {
    ...collection,
    ...newCollectionData,
  }

  await putCollection(updatedCollection)
}

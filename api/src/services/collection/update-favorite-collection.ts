import type { CollectionModel } from '@model/collection'
import { getCollection, putCollection } from '@repository/collection'

export default async (username: string, collectionId: string) => {
  const collection = await getCollection(username, collectionId)

  const updatedCollection: CollectionModel = {
    ...collection,
    favorite: !collection.favorite,
  }

  await putCollection(updatedCollection)

  return true
}

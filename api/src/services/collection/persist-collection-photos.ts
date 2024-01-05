import type { CollectionPhotosBodySchema } from '@functions/collection/put-collection-photos/schema'
import { getCollection, putCollection } from '@repository/collection'

export default async (body: CollectionPhotosBodySchema) => {
  const collection = await getCollection(body.username, body.collectionId)

  const collectionWithPhotos = {
    ...collection,
    photos: [
      ...collection.photos || [],
      ...body.photos || [],
    ],
  }

  await putCollection(collectionWithPhotos)

  return true
}

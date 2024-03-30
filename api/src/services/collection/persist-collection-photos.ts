import type { CollectionPhotosBodySchema } from '@functions/collection/put-collection-photos/schema'
import type { CollectionModel } from '@model/collection'
import { getCollection, putCollection } from '@repository/collection'

export default async (body: CollectionPhotosBodySchema) => {
  const collection = await getCollection(body.username, body.collectionId)

  const cover = (!collection?.photos?.length && body?.photos[0]) || collection.cover

  const collectionWithPhotos: CollectionModel = {
    ...collection,
    cover,
    photos: [
      ...collection.photos || [],
      ...body.photos || [],
    ],
  }

  await putCollection(collectionWithPhotos)

  return true
}

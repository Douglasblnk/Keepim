import { collectionDTO } from '@dto/collection'
import type { CollectionSchemaPathParams } from '@functions/collection/get-collection/schema'
import { getCollection } from '@repository/collection'
import { getSignedUrls } from '@service/photos'

export default async (username: string, params: CollectionSchemaPathParams) => {
  const collection = await getCollection(username, params.id)

  const signedUrls = await getSignedUrls(collection.photos)
  const [signedCover] = await getSignedUrls(collection.cover ? [collection.cover] : undefined)

  return collectionDTO({
    ...collection,
    photos: signedUrls,
    cover: signedCover,
  })
}

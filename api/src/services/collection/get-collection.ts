import { env } from 'node:process'
import { collectionDTO } from '@dto/collection'
import type { CollectionSchemaPathParams } from '@functions/collection/get-collection/schema'
import { getCollection } from '@repository/collection'
import { getSignedUrls } from '@service/photos'

async function getSignedPhotosUrl(photos: string[]) {
  return {
    imgs: await getSignedUrls(photos, env.COLLECTION_BUCKET_NAME),
    thumbnails: await getSignedUrls(photos, env.COLLECTION_THUMBNAIL_BUCKET_NAME),
  }
}

export default async (username: string, params: CollectionSchemaPathParams) => {
  const collection = await getCollection(username, params.id)

  const signedUrls = await getSignedPhotosUrl(collection.photos)

  const [signedCover] = await getSignedUrls(collection.cover ? [collection.cover] : undefined, env.COLLECTION_THUMBNAIL_BUCKET_NAME)

  return collectionDTO({
    ...collection,
    photos: signedUrls,
    cover: signedCover,
  })
}

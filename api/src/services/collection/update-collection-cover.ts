import type { CollectionCoverBodySchema } from '@functions/collection/update-collection-cover/schema'
import { updateCollectionCover } from '@repository/collection'

export default async (body: CollectionCoverBodySchema) => {
  const {
    collectionId,
    coverKey,
    username,
  } = body

  await updateCollectionCover(username, collectionId, coverKey)

  return true
}

import { deleteCollection, getCollection } from '@repository/collection'
import { deletePhotos } from '@service/photos'

export default async (username: string, collectionId: string) => {
  const { photos } = await getCollection(username, collectionId)

  await deletePhotos(photos)

  return deleteCollection(username, collectionId)
}

import type { CollectionModel } from '@model/collection'
import { getCollection, putCollection } from '@repository/collection'
import deletePhotos from '@service/photos/delete-photos'

export default async (username: string, collectionId: string, photoKeys: string[]) => {
  await deletePhotos(photoKeys)

  const collection = await getCollection(username, collectionId)

  const isCoverBeingRemoved = photoKeys.includes(collection.cover)

  const updatedCollection: CollectionModel = {
    ...collection,
    photos: collection.photos.filter(photo => !photoKeys.includes(photo)),
    cover: isCoverBeingRemoved ? '' : collection.cover,
  }

  await putCollection(updatedCollection)

  return true
}

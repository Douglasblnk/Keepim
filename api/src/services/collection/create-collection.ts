import { createCollectionModel } from '@model/collection'
import type { CollectionSchemaBody } from '@functions/collection/create-collection/schema'
import { putCollection } from '@repository/collection'
import { collectionDto } from '@dto/collection'

export default async (body: CollectionSchemaBody, username: string) => {
  const collectionModel = createCollectionModel(body, username)

  await putCollection(collectionModel)

  return collectionDto(collectionModel)
}

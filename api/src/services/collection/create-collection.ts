import { createCollectionModel } from '@model/collection'
import type { CollectionSchemaBody } from '@functions/collection/create-collection/schema'
import { putCollection } from '@repository/collection'
import { collectionDTO } from '@dto/collection'

export default async (body: CollectionSchemaBody) => {
  const collectionModel = createCollectionModel(body)

  await putCollection(collectionModel)

  return collectionDTO(collectionModel)
}

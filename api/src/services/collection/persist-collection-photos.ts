import type { CollectionPhotosBodySchema } from '@functions/collection/put-collection-photos/schema'

export default async (body: CollectionPhotosBodySchema) => {
  console.log('body :>> ', body)
}

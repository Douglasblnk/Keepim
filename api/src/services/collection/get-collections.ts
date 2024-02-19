import { env } from 'node:process'
import { collectionsListDTO } from '@dto/collection'
import { getCollection, queryCollections } from '@repository/collection'
import type { CollectionSchemaQueryString } from '@functions/collection/get-collections/schema'
import type { AttributeValue } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { getSignedUrls } from '@service/photos'

export async function getLastEvaluatedCollection(username: string, params: CollectionSchemaQueryString): Promise<Record<string, AttributeValue>> {
  const collection = await getCollection(username, params.startKey)

  if (params.search) {
    return marshall({
      id: collection.id,
      username: collection.username,
    })
  }

  else if (params.sortBy === 'collectionName') {
    return marshall({
      id: collection.id,
      username: collection.username,
      searchName: collection.searchName,
    })
  }

  else if (params.sortBy === 'favorite') {
    return marshall({
      id: collection.id,
      username: collection.username,
      favoriteCollectionDate: collection.favoriteCollectionDate,
    })
  }

  else {
    return marshall({
      id: collection.id,
      username: collection.username,
      collectionDate: collection.collectionDate,
    })
  }
}

export default async (username: string, params: CollectionSchemaQueryString) => {
  const startKey = params.startKey ? await getLastEvaluatedCollection(username, params) : undefined

  const collections = await queryCollections(username, params, startKey)

  const collectionDTO = collectionsListDTO(collections)

  for (const collection of collectionDTO.data) {
    const [thumbnail] = await getSignedUrls(
      collection.thumbnail ? [collection.thumbnail] : undefined,
      env.COLLECTION_THUMBNAIL_BUCKET_NAME,
    )

    collection.thumbnail = thumbnail
  }

  return collectionDTO
}

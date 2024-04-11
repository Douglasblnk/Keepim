import { env } from 'node:process'
import type { CompactCollectionDTO } from '@dto/collection'
import { collectionsListDTO } from '@dto/collection'
import { getCollection, queryCollections, queryFixedCollections } from '@repository/collection'
import type { CollectionSchemaQueryString } from '@functions/collection/get-collections/schema'
import type { AttributeValue } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { getSignedUrls } from '@service/photos'
import { findConfigByUsername } from '@repository/config'
import type { ConfigModel } from '@model/config'

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

async function generateSignedThumbnail(collections: CompactCollectionDTO[]) {
  const collectionsCopy = [...collections]

  for (const collection of collectionsCopy) {
    const [thumbnail] = await getSignedUrls(
      collection.thumbnail ? [collection.thumbnail] : undefined,
      env.COLLECTION_THUMBNAIL_BUCKET_NAME,
    )

    collection.thumbnail = thumbnail
  }

  return collectionsCopy
}

interface FixedCollectionsWithOrder extends CompactCollectionDTO {
  order?: number
}

function orderFixedCollection(fixedCollections: CompactCollectionDTO[], userConfig: ConfigModel) {
  return fixedCollections
    .map<FixedCollectionsWithOrder>((fixedCollection) => {
      const config = userConfig.collectionConfig.fixedCollections.find(collectionConfig => collectionConfig.id === fixedCollection.id)

      return config ? { ...fixedCollection, order: config.order } : { ...fixedCollection }
    })
    .sort((a, b) => a?.order - b?.order)
}

export default async (username: string, params: CollectionSchemaQueryString) => {
  const startKey = params.startKey ? await getLastEvaluatedCollection(username, params) : undefined

  const collections = await queryCollections(username, params, startKey)

  const fixedCollections = await queryFixedCollections(username)

  const userConfig = await findConfigByUsername(username)

  const collectionDTO = collectionsListDTO(collections, fixedCollections)

  return {
    ...collectionDTO,
    data: await generateSignedThumbnail(collectionDTO.data),
    fixedCollections: orderFixedCollection(
      await generateSignedThumbnail(collectionDTO.fixedCollections),
      userConfig,
    ),
  }
}

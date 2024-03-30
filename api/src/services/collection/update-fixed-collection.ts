import { errMaxFixedCollection } from '@exceptions/collection-exceptions'
import type { CollectionModel } from '@model/collection'
import type { ConfigModel } from '@model/config'
import { getCollection, putCollection } from '@repository/collection'
import { findConfigByUsername, putConfig } from '@repository/config'

type FixedCollections = ConfigModel['collectionConfig']['fixedCollections']

async function updateFixedCollectionsConfig(updatedCollection: CollectionModel, userConfig: ConfigModel): Promise<FixedCollections> {
  const fixedCollections = [...userConfig.collectionConfig.fixedCollections]

  if (updatedCollection.fixed) {
    return [
      ...fixedCollections,
      {
        id: updatedCollection.id,
        order: fixedCollections.length + 1,
      },
    ].sort((a, b) => a.order - b.order)
  }

  else {
    const index = fixedCollections.findIndex(fixedCollection => fixedCollection.id === updatedCollection.id)

    fixedCollections.splice(index, 1)

    return fixedCollections
      .sort((a, b) => a.order - b.order)
      .map((fixedCollection, index) => ({ ...fixedCollection, order: index + 1 }))
  }
}

export default async (username: string, collectionId: string) => {
  const collection = await getCollection(username, collectionId)

  const userConfig = await findConfigByUsername(username)

  if (!collection.fixed && userConfig.collectionConfig.fixedCollections.length >= 12)
    throw errMaxFixedCollection()

  const isFixing = !collection.fixed ? 1 : undefined

  const updatedCollection: CollectionModel = {
    ...collection,
    fixed: isFixing,
  }

  const updatedFixedCollectionsConfig = await updateFixedCollectionsConfig(updatedCollection, userConfig)

  const updatedConfig: ConfigModel = {
    ...userConfig,
    collectionConfig: {
      fixedCollections: updatedFixedCollectionsConfig,
    },
  }

  await putConfig(updatedConfig)

  await putCollection(updatedCollection)

  return updatedCollection.fixed ? 'Coleção fixada' : 'Coleção desafixada'
}

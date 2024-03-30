export interface ConfigModel {
  username: string
  collectionConfig?: {
    fixedCollections: {
      id: string
      order: number
    }[]
  }
}

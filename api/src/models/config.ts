export interface ConfigModel {
  id: string
  username: string
  collectionConfig?: {
    fixedCollection: number
  }
}

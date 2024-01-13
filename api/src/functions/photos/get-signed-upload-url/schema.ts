export interface PhotosBodySchema {
  username?: string
  collectionName: string
  files: {
    name: string
    type: string
    size: number
  }[]
}

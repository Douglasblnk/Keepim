export interface PhotosBody {
  collectionName?: string
  files: {
    name: string
    type: string
    size: number
  }[]
}

export interface SignedUrlsResponse {
  url: string
  fileName: string
}

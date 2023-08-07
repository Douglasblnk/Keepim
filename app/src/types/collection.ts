export interface CollectionBody {
  collectionName: string
  collectionDate: string
}

export interface CollectionsResponse {
  collectionName: string
  collectionDate: string
}

export interface CollectionsParams {
  search: string
  orderBy: 'ASC' | 'DESC'
  sortBy: 'collectionName' | 'collectionDate'
}

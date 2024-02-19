export interface CollectionSchemaQueryString {
  search?: string
  orderBy?: 'ASC' | 'DESC'
  sortBy?: 'collectionDate' | 'collectionName' | 'favorite'
  startKey?: string
}

export interface CollectionSchemaQueryString {
  search?: string
  orderBy?: 'ASC' | 'DESC'
  sortBy?: 'collectionDate' | 'collectionName'
  startKey?: string
}

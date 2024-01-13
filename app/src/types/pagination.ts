export interface EvaluatedKeyPagination<TData = any> {
  lastEvaluatedKey?: Record<string, unknown>
  data: TData[]
}

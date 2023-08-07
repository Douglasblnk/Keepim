export interface EvaluatedKeyPagination<TData> {
  lastEvaluatedKey?: Record<string, unknown>
  data: TData
}

import type { AttributeValue } from '@aws-sdk/client-dynamodb'

export interface EvaluatedKeyPagination<TData> {
  lastEvaluatedKey?: Record<string, AttributeValue>
  data: TData
}

import type { AttributeValue } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

export const mountCommandInput = <TOperation>(object: TOperation) => {
  return object
}

export const unmarshallArray = (items: Record<string, AttributeValue>[]) => {
  return items?.map((item) => {
    return unmarshall(item)
  }) ?? []
}

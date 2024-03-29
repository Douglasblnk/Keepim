import { env } from 'node:process'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

export default function dynamoDBClient(): DynamoDBClient {
  if (env.IS_OFFLINE) {
    return new DynamoDBClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    })
  }

  return new DynamoDBClient({ region: 'sa-east-1' })
}

import { env } from 'node:process'
import dynamoDBClient from '@database/index'
import { PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import type { PutItemCommandInput, QueryCommandInput } from '@aws-sdk/client-dynamodb'
import type { CollectionModel } from '@model/collection'

const TABLE_NAME = env.COLLECTION_DB_TABLE

export const putCollection = async (collection: CollectionModel) => {
  const db = dynamoDBClient()

  const putCommandInput: PutItemCommandInput = {
    TableName: TABLE_NAME,
    Item: marshall(collection),
  }

  const putItemCommand = new PutItemCommand(putCommandInput)

  return db.send(putItemCommand)
}

export const queryCollectionsCount = async (username: string) => {
  const db = dynamoDBClient()

  const queryCommandInput: QueryCommandInput = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: marshall({
      ':username': username,
    }),
    Select: 'COUNT',
  }

  const queryCommand = new QueryCommand(queryCommandInput)

  const { Count } = await db.send(queryCommand)

  return Count
}

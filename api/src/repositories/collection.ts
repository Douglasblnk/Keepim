import dynamoDBClient from '@database/index'
import { PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import type { PutItemCommandInput } from '@aws-sdk/client-dynamodb'
import type { CollectionModel } from '@model/collection'

const TABLE_NAME = process.env.COLLECTION_DB_TABLE

export const putCollection = async (collection: CollectionModel) => {
  const db = dynamoDBClient()

  const putCommandInput: PutItemCommandInput = {
    TableName: TABLE_NAME,
    Item: marshall(collection),
  }

  const putItemCommand = new PutItemCommand(putCommandInput)

  return db.send(putItemCommand)
}

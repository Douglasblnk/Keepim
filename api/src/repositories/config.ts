import { env } from 'node:process'
import dynamoDBClient from '@database/index'
import { GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import type { GetItemCommandInput, PutItemCommandInput } from '@aws-sdk/client-dynamodb'
import type { ConfigModel } from '@model/config'

const TABLE_NAME = env.CONFIG_DB_TABLE

export async function findConfigByUsername(username: string) {
  const db = dynamoDBClient()

  const getItemCommandInput: GetItemCommandInput = {
    TableName: TABLE_NAME,
    Key: marshall({ username }),
  }

  const getItemCommand = new GetItemCommand(getItemCommandInput)

  const { Item } = await db.send(getItemCommand)

  return unmarshall(Item || {}) as ConfigModel
}

export async function putConfig(config: ConfigModel) {
  const db = dynamoDBClient()

  const putItemCommandInput: PutItemCommandInput = {
    TableName: TABLE_NAME,
    Item: marshall(config),
  }

  const putItemCommand = new PutItemCommand(putItemCommandInput)

  return db.send(putItemCommand)
}

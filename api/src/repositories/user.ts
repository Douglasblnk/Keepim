import dynamoDBClient from '@database/index'
import { GetItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import type { GetItemCommandInput, QueryCommandInput } from '@aws-sdk/client-dynamodb'
import type { UserModel } from '@model/user'

const TABLE_NAME = process.env.USER_DB_TABLE

export const findUserByUsername = async (username: string) => {
  const db = dynamoDBClient()

  const getItemCommandInput: GetItemCommandInput = {
    TableName: TABLE_NAME,
    Key: marshall({ username }),
  }

  const getItemCommand = new GetItemCommand(getItemCommandInput)

  const { Item } = await db.send(getItemCommand)

  return unmarshall(Item || {}) as UserModel
}

export const findUserByEmail = async (email: string) => {
  const db = dynamoDBClient()

  const queryCommandInput: QueryCommandInput = {
    TableName: TABLE_NAME,
    IndexName: 'email-index',
    ExpressionAttributeValues: marshall({
      ':email': email,
    }),
    KeyConditionExpression: 'email = :email',
  }

  const queryCommand = new QueryCommand(queryCommandInput)

  const { Items } = await db.send(queryCommand)

  return unmarshall(Items[0] || {}) as UserModel
}

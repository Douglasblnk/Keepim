import { env } from 'node:process'
import dynamoDBClient from '@database/index'
import { DeleteItemCommand, GetItemCommand, PutItemCommand, QueryCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import type { DeleteItemCommandInput, GetItemCommandInput, PutItemCommandInput, QueryCommandInput, UpdateItemInput } from '@aws-sdk/client-dynamodb'
import type { SessionModel } from '@model/session'

const TABLE_NAME = env.SESSION_DB_TABLE

export const putSession = async (session: SessionModel) => {
  const db = dynamoDBClient()

  const putCommandInput: PutItemCommandInput = {
    TableName: TABLE_NAME,
    Item: marshall(session),
  }

  const putItemCommand = new PutItemCommand(putCommandInput)

  return db.send(putItemCommand)
}

export const findSessionByRefreshToken = async (refreshToken: string) => {
  const db = dynamoDBClient()

  const queryCommandInput: QueryCommandInput = {
    TableName: TABLE_NAME,
    IndexName: 'session-refresh-token-index',
    ExpressionAttributeValues: marshall({
      ':refreshToken': refreshToken,
    }),
    KeyConditionExpression: 'refreshToken = :refreshToken',
  }

  const queryCommand = new QueryCommand(queryCommandInput)

  const { Items } = await db.send(queryCommand)

  return unmarshall(Items[0] || {}) as SessionModel
}

export const findSessionByID = async (id: string) => {
  const db = dynamoDBClient()

  const getItemInput: GetItemCommandInput = {
    TableName: TABLE_NAME,
    Key: marshall({ id }),
  }

  const getItemCommand = new GetItemCommand(getItemInput)

  const { Item } = await db.send(getItemCommand)

  return unmarshall(Item || {}) as SessionModel
}

export const updateSession = async (id: string, newRefreshToken: string, expiredAt: number) => {
  const db = dynamoDBClient()

  const updateCommandInput: UpdateItemInput = {
    TableName: TABLE_NAME,
    Key: marshall({ id }),
    UpdateExpression: 'set refreshToken = :refreshToken, expiredAt = :expiredAt',
    ExpressionAttributeValues: marshall({
      ':refreshToken': newRefreshToken,
      ':expiredAt': expiredAt,
    }),
  }

  const putItemCommand = new UpdateItemCommand(updateCommandInput)

  return db.send(putItemCommand)
}

export const deleteSession = async (id: string) => {
  const db = dynamoDBClient()

  const deleteCommandInput: DeleteItemCommandInput = {
    TableName: TABLE_NAME,
    Key: marshall({ id }),
  }

  const deleteItemCommand = new DeleteItemCommand(deleteCommandInput)

  return db.send(deleteItemCommand)
}

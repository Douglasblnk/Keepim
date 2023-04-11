import dynamoDBClient from '@database/index'
import { mountCommandInput } from '@utils/dynamodb'
import { GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import type { GetItemCommandInput, PutItemCommandInput } from '@aws-sdk/client-dynamodb'
import type { SessionModel } from '@model/session'

const TABLE_NAME = process.env.SESSION_DB_TABLE

export const putSession = async (session: SessionModel) => {
  const db = dynamoDBClient()

  const putCommandInput = mountCommandInput<PutItemCommandInput>({
    TableName: TABLE_NAME,
    Item: marshall(session),
  })

  const putItemCommand = new PutItemCommand(putCommandInput)

  return db.send(putItemCommand)
}

export const findSessionByRefreshToken = async (refreshToken: string) => {
  const db = dynamoDBClient()

  const getItemCommandInput = mountCommandInput<GetItemCommandInput>({
    TableName: TABLE_NAME,
    Key: marshall({ refreshToken }),
  })

  const getItemCommand = new GetItemCommand(getItemCommandInput)

  const { Item } = await db.send(getItemCommand)

  return unmarshall(Item || {}) as SessionModel
}

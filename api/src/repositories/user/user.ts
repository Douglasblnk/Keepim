import dynamoDBClient from '@database/index'
import { GetItemCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'
import type { UserModel } from '@model/user'

export const getUser = async (id: string): Promise<UserModel> => {
  const db = dynamoDBClient()

  const { Item } = await db.send(new GetItemCommand({
    TableName: 'Keepim.User',
    Key: {
      id: { S: id },
    },
  }))

  return unmarshall(Item || {}) as UserModel
}

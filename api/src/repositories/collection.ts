import { env } from 'node:process'

import type {
  AttributeValue,
  DeleteItemCommandInput,
  GetItemCommandInput,
  PutItemCommandInput,
  QueryCommandInput,
  UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb'

import dynamoDBClient from '@database/index'
import { DeleteItemCommand, GetItemCommand, PutItemCommand, QueryCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { unmarshallArray } from '@utils/dynamodb'

import type { CollectionModel } from '@model/collection'
import type { EvaluatedKeyPagination } from '@model/pagination'
import type { CollectionSchemaQueryString } from '@functions/collection/get-collections/schema'

const TABLE_NAME = env.COLLECTION_DB_TABLE

export async function putCollection(collection: CollectionModel) {
  const db = dynamoDBClient()

  const putCommandInput: PutItemCommandInput = {
    TableName: TABLE_NAME,
    Item: marshall(collection, { removeUndefinedValues: true }),
  }

  const putItemCommand = new PutItemCommand(putCommandInput)

  return db.send(putItemCommand)
}

export async function updateCollectionCover(username: string, id: string, coverKey: string) {
  const db = dynamoDBClient()

  const updateItemInput: UpdateItemCommandInput = {
    TableName: TABLE_NAME,
    Key: marshall({ id, username }),
    UpdateExpression: 'SET cover = :cover',
    ExpressionAttributeValues: marshall({
      ':cover': coverKey,
    }),
    ReturnValues: 'UPDATED_NEW',
  }

  const putItemCommand = new UpdateItemCommand(updateItemInput)

  return db.send(putItemCommand)
}

export async function queryCollectionsCount(username: string) {
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

export async function getCollection(username: string, id: string) {
  const db = dynamoDBClient()

  const getItemInput: GetItemCommandInput = {
    TableName: TABLE_NAME,
    Key: marshall({ id, username }),
  }

  const queryCommand = new GetItemCommand(getItemInput)

  const { Item } = await db.send(queryCommand)

  return unmarshall(Item || {}) as CollectionModel
}

export async function deleteCollection(username: string, id: string) {
  const db = dynamoDBClient()

  const deleteItemInput: DeleteItemCommandInput = {
    TableName: TABLE_NAME,
    Key: marshall({ id, username }),
  }

  const queryCommand = new DeleteItemCommand(deleteItemInput)

  return await db.send(queryCommand)
}

export async function queryFixedCollections(username: string) {
  const db = dynamoDBClient()

  const queryCommandInput: QueryCommandInput = {
    TableName: TABLE_NAME,
    IndexName: 'collection-fixed-index',
    ScanIndexForward: true,
    KeyConditionExpression: 'username = :username AND #fixed = :fixedStatus',
    ExpressionAttributeValues: marshall({
      ':username': username,
      ':fixedStatus': 1,
    }),
    ExpressionAttributeNames: {
      '#fixed': 'fixed',
    },
  }

  const queryCommand = new QueryCommand(queryCommandInput)

  const { Items } = await db.send(queryCommand)

  return unmarshallArray(Items) as CollectionModel[]
}

function getCollectionsQueryCommand(username: string, params: CollectionSchemaQueryString, startKey?: Record<string, AttributeValue>) {
  const indexNameParams = {
    collectionDate: 'collection-date-index',
    collectionName: 'collection-name-index',
  }

  const commonQueryCommandInput: QueryCommandInput = {
    TableName: TABLE_NAME,
    Limit: 25,
    ScanIndexForward: params?.orderBy === 'ASC',
    ExclusiveStartKey: startKey,
  }

  if (params.search) {
    return {
      ...commonQueryCommandInput,
      FilterExpression: 'contains(#searchName, :searchName)',
      ExpressionAttributeNames: { '#searchName': 'searchName' },
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: marshall({
        ':username': username,
        ':searchName': params?.search.toLowerCase(),
      }),
    }
  }

  if (params?.sortBy === 'favorite') {
    return {
      ...commonQueryCommandInput,
      IndexName: 'collection-favorite-index',
      KeyConditionExpression: 'username = :username AND begins_with(favoriteCollectionDate, :favStatus)',
      ExpressionAttributeValues: marshall({
        ':username': username,
        ':favStatus': '1#',
      }),
    }
  }

  return {
    ...commonQueryCommandInput,
    IndexName: indexNameParams[params?.sortBy],
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: marshall({
      ':username': username,
    }),
  }
}

export async function queryCollections(username: string, params: CollectionSchemaQueryString, startKey?: Record<string, AttributeValue>) {
  const db = dynamoDBClient()

  const queryCommandInput = getCollectionsQueryCommand(username, params, startKey)

  const queryCommand = new QueryCommand(queryCommandInput)

  const { Items, LastEvaluatedKey } = await db.send(queryCommand)

  const collections = unmarshallArray(Items)

  return {
    lastEvaluatedKey: (LastEvaluatedKey !== undefined && collections.length) ? unmarshall(LastEvaluatedKey) : undefined,
    data: collections,
  } as EvaluatedKeyPagination<CollectionModel[]>
}

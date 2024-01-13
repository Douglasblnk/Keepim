import { env } from 'node:process'

import type {
  AttributeValue,
  GetItemCommandInput,
  PutItemCommandInput,
  QueryCommandInput,
  UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb'

import dynamoDBClient from '@database/index'
import { GetItemCommand, PutItemCommand, QueryCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { unmarshallArray } from '@utils/dynamodb'

import type { CollectionModel } from '@model/collection'
import type { EvaluatedKeyPagination } from '@model/pagination'
import type { CollectionSchemaQueryString } from '@functions/collection/get-collections/schema'

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

export const updateCollectionCover = async (username: string, id: string, coverKey: string) => {
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

export const getCollection = async (username: string, id: string) => {
  const db = dynamoDBClient()

  const getItemInput: GetItemCommandInput = {
    TableName: TABLE_NAME,
    Key: marshall({ id, username }),
  }

  const queryCommand = new GetItemCommand(getItemInput)

  const { Item } = await db.send(queryCommand)

  return unmarshall(Item || {}) as CollectionModel
}

export const queryCollections = async (username: string, params: CollectionSchemaQueryString, startKey?: Record<string, AttributeValue>) => {
  const db = dynamoDBClient()

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

  const searchQueryCommandInput: QueryCommandInput = {
    ...commonQueryCommandInput,
    FilterExpression: 'contains(#collectionName, :collectionName)',
    ExpressionAttributeNames: { '#collectionName': 'collectionName' },
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: marshall({
      ':username': username,
      ':collectionName': params?.search,
    }),
  }

  const queryCommandInput: QueryCommandInput = {
    ...commonQueryCommandInput,
    IndexName: indexNameParams[params?.sortBy],
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: marshall({
      ':username': username,
    }),
  }

  const queryCommand = new QueryCommand(params.search ? searchQueryCommandInput : queryCommandInput)

  const { Items, LastEvaluatedKey } = await db.send(queryCommand)

  const collections = unmarshallArray(Items)

  return {
    lastEvaluatedKey: (LastEvaluatedKey !== undefined && collections.length) ? unmarshall(LastEvaluatedKey) : undefined,
    data: collections,
  } as EvaluatedKeyPagination<CollectionModel[]>
}

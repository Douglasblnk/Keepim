import type { APIGatewayProxyEvent } from 'aws-lambda'

export interface CustomAPIGatewayProxyEvent<TBody = any, TPathParams = any, TQueryString = any> extends Omit<APIGatewayProxyEvent, 'body' | 'pathParameters' | 'queryStringParameters'> {
  body?: TBody
  pathParameters?: TPathParams
  queryStringParameters?: TQueryString
}

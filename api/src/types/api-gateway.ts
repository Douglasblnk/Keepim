import type { APIGatewayProxyEvent } from 'aws-lambda'

export interface CustomAPIGatewayProxyEvent<TBody = any, TPathParameters = any> extends Omit<APIGatewayProxyEvent, 'body' | 'pathParameters'> {
  body: TBody
  pathParameters: TPathParameters
}

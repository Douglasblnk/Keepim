import cors from '@middy/http-cors'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import middy from '@middy/core'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

interface CustomMiddleware {
  before: middy.MiddlewareFn<CustomAPIGatewayProxyEvent<any, any>, APIGatewayProxyResult>
  onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult>
}

interface HandlerFn<T> {
  (event: CustomAPIGatewayProxyEvent<any, T>): Promise<{ statusCode: unknown; headers: { 'Access-Control-Allow-Headers': string; 'Access-Control-Allow-Origin': string } & object; body: string }>
}

export const middyfy = <T>(handler: HandlerFn<T>, custom?: CustomMiddleware) => {
  const middlewareChain = middy(handler)
    .use(middyJsonBodyParser())

  if (custom)
    middlewareChain.use(custom)

  middlewareChain.use(cors({
    credentials: true,
    origin: 'https://keepim.douglasblnk.com',
  }))

  return middlewareChain
}

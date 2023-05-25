import middy from '@middy/core'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import cors from '@middy/http-cors'

export const middyfy = (handler) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(cors({
      credentials: true,
      origin: 'https://keepim.douglasblnk.com',
    }))
}

export const lambdaOKResponse = <TRes, THeaders = {}>(response: TRes, headers?: THeaders) => {
  return {
    statusCode: 200,
    ...(headers ? { headers } : {}),
    body: JSON.stringify(response),
  }
}

export const lambdaErrorResponse = (error: Record<string, unknown>) => {
  return {
    statusCode: error.statusCode || 400,
    body: JSON.stringify(error),
  }
}

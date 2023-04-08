import middy from '@middy/core'
import middyJsonBodyParser from '@middy/http-json-body-parser'

export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser())
}

export const lambdaOKResponse = <T>(response: T) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}

export const lambdaErrorResponse = (error: Record<string, unknown>) => {
  return {
    statusCode: error.statusCode || 400,
    body: JSON.stringify(error),
  }
}

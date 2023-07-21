import { errMissingParams } from '@exceptions/auth-exceptions'

export const lambdaOKResponse = <TRes, THeaders = {}>(response: TRes, headers?: THeaders) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': 'https://keepim.douglasblnk.com',
      ...headers,
    },
    body: JSON.stringify(response),
  }
}

export const lambdaErrorResponse = <THeaders = {}>(error: Record<string, unknown>, headers?: THeaders) => {
  return {
    statusCode: error.statusCode || 400,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': 'https://keepim.douglasblnk.com',
      ...headers,
    },
    body: JSON.stringify(error),
  }
}

export const getLambdaBody = <T = any>(body: T, properties: string[]) => {
  for (const property of properties) {
    if (!body[property])
      throw errMissingParams()
  }

  return body
}

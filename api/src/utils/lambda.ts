import { errMissingParams } from '@exceptions/auth-exceptions'

export const lambdaOKResponse = <TRes, THeaders = object>(response: TRes, headers?: THeaders) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': 'https://keepim.douglasblnk.com',
      ...headers,
    },
    body: JSON.stringify(response),
  }
}

export const lambdaErrorResponse = <THeaders = object>(error: Record<string, unknown>, headers?: THeaders) => {
  return {
    statusCode: error.statusCode || 400,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': 'https://keepim.douglasblnk.com',
      ...headers,
    },
    body: JSON.stringify(error),
  }
}

export const checkLambdaEvent = <T = any>(body: T, properties: (keyof T)[]) => {
  for (const property of properties) {
    if (!body[property])
      throw errMissingParams(property)
  }

  return body
}

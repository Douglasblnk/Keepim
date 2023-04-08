import { lambdaOKResponse, middyfy } from '@utils/lambda'

const handler = async () => {
  return lambdaOKResponse({ message: 'OK' })
}

export const main = middyfy(handler)

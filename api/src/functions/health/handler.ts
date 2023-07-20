import { middyfy } from '@middleware/middyfy'
import { lambdaOKResponse } from '@utils/lambda'

const handler = async () => {
  return lambdaOKResponse({ message: 'OK' })
}

export const main = middyfy(handler)
